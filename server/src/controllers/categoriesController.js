const prisma = require('../config/db');

// GET all categories (public)
exports.getAllCategories = async (req, res) => {
  try {
    const { includeInactive } = req.query;
    const where = includeInactive === 'true' ? {} : { active: true };

    const categories = await prisma.eventCategory.findMany({
      where,
      orderBy: { displayOrder: 'asc' },
      include: {
        _count: {
          select: { themes: true },
        },
      },
    });

    return res.json({ success: true, data: categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch categories' });
  }
};

// GET single category by slug or id (public)
exports.getCategoryBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const category = await prisma.eventCategory.findFirst({
      where: {
        OR: [{ slug: slug }, { id: slug }],
      },
      include: {
        themes: {
          where: { active: true },
          orderBy: { displayOrder: 'asc' },
        },
      },
    });

    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    // Parse JSON strings in themes
    const formattedCategory = {
      ...category,
      themes: category.themes.map((theme) => ({
        ...theme,
        features: JSON.parse(theme.features || '[]'),
        images: JSON.parse(theme.images || '[]'),
      })),
    };

    return res.json({ success: true, data: formattedCategory });
  } catch (error) {
    console.error('Error fetching category:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch category' });
  }
};

// CREATE category (admin)
exports.createCategory = async (req, res) => {
  try {
    const { name, slug, description, coverImage, icon, displayOrder, active } = req.body;

    if (!name || !description || !coverImage) {
      return res.status(400).json({ success: false, message: 'Name, description, and cover image are required.' });
    }

    const generatedSlug = slug
      ? slug.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      : name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    const existing = await prisma.eventCategory.findUnique({ where: { slug: generatedSlug } });
    if (existing) {
      return res.status(400).json({ success: false, message: 'A category with this slug already exists.' });
    }

    const category = await prisma.eventCategory.create({
      data: {
        name,
        slug: generatedSlug,
        description,
        coverImage,
        icon: icon || 'Sparkles',
        displayOrder: Number(displayOrder) || 0,
        active: active !== undefined ? Boolean(active) : true,
      },
    });

    return res.status(201).json({ success: true, data: category, message: 'Category created successfully' });
  } catch (error) {
    console.error('Error creating category:', error);
    return res.status(500).json({ success: false, message: 'Failed to create category' });
  }
};

// UPDATE category (admin)
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, description, coverImage, icon, displayOrder, active } = req.body;

    const existing = await prisma.eventCategory.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    let updatedSlug = existing.slug;
    if (slug && slug !== existing.slug) {
      updatedSlug = slug.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      const slugConflict = await prisma.eventCategory.findFirst({
        where: { slug: updatedSlug, id: { not: id } },
      });
      if (slugConflict) {
        return res.status(400).json({ success: false, message: 'A category with this slug already exists.' });
      }
    }

    const category = await prisma.eventCategory.update({
      where: { id },
      data: {
        name: name !== undefined ? name : existing.name,
        slug: updatedSlug,
        description: description !== undefined ? description : existing.description,
        coverImage: coverImage !== undefined ? coverImage : existing.coverImage,
        icon: icon !== undefined ? icon : existing.icon,
        displayOrder: displayOrder !== undefined ? Number(displayOrder) : existing.displayOrder,
        active: active !== undefined ? Boolean(active) : existing.active,
      },
    });

    return res.json({ success: true, data: category, message: 'Category updated successfully' });
  } catch (error) {
    console.error('Error updating category:', error);
    return res.status(500).json({ success: false, message: 'Failed to update category' });
  }
};

// DELETE category (admin)
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await prisma.eventCategory.findUnique({
      where: { id },
      include: { _count: { select: { themes: true } } },
    });

    if (!existing) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    await prisma.eventCategory.delete({ where: { id } });

    return res.json({ success: true, message: 'Category and associated themes deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    return res.status(500).json({ success: false, message: 'Failed to delete category' });
  }
};
