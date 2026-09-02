const prisma = require('../config/db');

// Helper to format theme objects with parsed JSON fields
const formatTheme = (theme) => ({
  ...theme,
  features: typeof theme.features === 'string' ? JSON.parse(theme.features || '[]') : theme.features,
  images: typeof theme.images === 'string' ? JSON.parse(theme.images || '[]') : theme.images,
});

// GET all themes with optional filters
exports.getAllThemes = async (req, res) => {
  try {
    const { categoryId, categorySlug, popularOnly, includeInactive, search } = req.query;

    const where = {};

    if (includeInactive !== 'true') {
      where.active = true;
    }

    if (popularOnly === 'true') {
      where.isPopular = true;
    }

    if (categoryId) {
      where.categoryId = categoryId;
    } else if (categorySlug) {
      const category = await prisma.eventCategory.findUnique({ where: { slug: categorySlug } });
      if (category) {
        where.categoryId = category.id;
      }
    }

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
      ];
    }

    const themes = await prisma.theme.findMany({
      where,
      include: {
        category: {
          select: { id: true, name: true, slug: true },
        },
      },
      orderBy: [{ isPopular: 'desc' }, { displayOrder: 'asc' }],
    });

    return res.json({
      success: true,
      data: themes.map(formatTheme),
    });
  } catch (error) {
    console.error('Error fetching themes:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch themes' });
  }
};

// GET single theme by id or slug
exports.getThemeByIdOrSlug = async (req, res) => {
  try {
    const { idOrSlug } = req.params;

    const theme = await prisma.theme.findFirst({
      where: {
        OR: [{ id: idOrSlug }, { slug: idOrSlug }],
      },
      include: {
        category: true,
      },
    });

    if (!theme) {
      return res.status(404).json({ success: false, message: 'Theme not found' });
    }

    return res.json({
      success: true,
      data: formatTheme(theme),
    });
  } catch (error) {
    console.error('Error fetching theme details:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch theme details' });
  }
};

// CREATE theme (admin)
exports.createTheme = async (req, res) => {
  try {
    const {
      categoryId,
      name,
      slug,
      description,
      shortDesc,
      features,
      images,
      isPopular,
      displayOrder,
      active,
    } = req.body;

    if (!categoryId || !name || !description) {
      return res.status(400).json({ success: false, message: 'Category, name, and description are required.' });
    }

    const category = await prisma.eventCategory.findUnique({ where: { id: categoryId } });
    if (!category) {
      return res.status(404).json({ success: false, message: 'Selected category does not exist.' });
    }

    const generatedSlug = slug
      ? slug.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      : name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') + '-' + Date.now().toString().slice(-4);

    const imagesArray = Array.isArray(images) ? images : (typeof images === 'string' && images ? [images] : []);
    const featuresArray = Array.isArray(features) ? features : (typeof features === 'string' && features ? features.split('\n').filter(Boolean) : []);

    const theme = await prisma.theme.create({
      data: {
        categoryId,
        name,
        slug: generatedSlug,
        description,
        shortDesc: shortDesc || (description.length > 120 ? description.substring(0, 117) + '...' : description),
        features: JSON.stringify(featuresArray),
        images: JSON.stringify(imagesArray),
        isPopular: Boolean(isPopular),
        displayOrder: Number(displayOrder) || 0,
        active: active !== undefined ? Boolean(active) : true,
      },
      include: {
        category: true,
      },
    });

    return res.status(201).json({
      success: true,
      data: formatTheme(theme),
      message: 'Theme created successfully',
    });
  } catch (error) {
    console.error('Error creating theme:', error);
    return res.status(500).json({ success: false, message: 'Failed to create theme' });
  }
};

// UPDATE theme (admin)
exports.updateTheme = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      categoryId,
      name,
      slug,
      description,
      shortDesc,
      features,
      images,
      isPopular,
      displayOrder,
      active,
    } = req.body;

    const existing = await prisma.theme.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Theme not found' });
    }

    let updatedSlug = existing.slug;
    if (slug && slug !== existing.slug) {
      updatedSlug = slug.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    }

    const updateData = {};
    if (categoryId !== undefined) updateData.categoryId = categoryId;
    if (name !== undefined) updateData.name = name;
    if (slug !== undefined) updateData.slug = updatedSlug;
    if (description !== undefined) updateData.description = description;
    if (shortDesc !== undefined) updateData.shortDesc = shortDesc;
    if (features !== undefined) {
      updateData.features = JSON.stringify(Array.isArray(features) ? features : (typeof features === 'string' ? features.split('\n').filter(Boolean) : []));
    }
    if (images !== undefined) {
      updateData.images = JSON.stringify(Array.isArray(images) ? images : (typeof images === 'string' && images ? [images] : []));
    }
    if (isPopular !== undefined) updateData.isPopular = Boolean(isPopular);
    if (displayOrder !== undefined) updateData.displayOrder = Number(displayOrder);
    if (active !== undefined) updateData.active = Boolean(active);

    const theme = await prisma.theme.update({
      where: { id },
      data: updateData,
      include: {
        category: true,
      },
    });

    return res.json({
      success: true,
      data: formatTheme(theme),
      message: 'Theme updated successfully',
    });
  } catch (error) {
    console.error('Error updating theme:', error);
    return res.status(500).json({ success: false, message: 'Failed to update theme' });
  }
};

// DELETE theme (admin)
exports.deleteTheme = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await prisma.theme.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Theme not found' });
    }

    await prisma.theme.delete({ where: { id } });

    return res.json({ success: true, message: 'Theme deleted successfully' });
  } catch (error) {
    console.error('Error deleting theme:', error);
    return res.status(500).json({ success: false, message: 'Failed to delete theme' });
  }
};
