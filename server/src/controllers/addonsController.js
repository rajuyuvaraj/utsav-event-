const prisma = require('../config/db');

// GET all addon items (public & admin)
exports.getAllAddons = async (req, res) => {
  try {
    const { category, includeInactive } = req.query;

    const where = {};
    if (includeInactive !== 'true') {
      where.active = true;
    }
    if (category) {
      where.itemCategory = category;
    }

    const addons = await prisma.addonItem.findMany({
      where,
      orderBy: [{ itemCategory: 'asc' }, { name: 'asc' }],
    });

    return res.json({ success: true, data: addons });
  } catch (error) {
    console.error('Error fetching addons:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch add-on items' });
  }
};

// CREATE addon item (admin)
exports.createAddon = async (req, res) => {
  try {
    const { name, description, image, itemCategory, unitType, active } = req.body;

    if (!name || !description || !image) {
      return res.status(400).json({ success: false, message: 'Name, description, and image are required.' });
    }

    const addon = await prisma.addonItem.create({
      data: {
        name,
        description,
        image,
        itemCategory: itemCategory || 'Floral',
        unitType: unitType || 'Per Unit',
        active: active !== undefined ? Boolean(active) : true,
      },
    });

    return res.status(201).json({ success: true, data: addon, message: 'Add-on item created successfully' });
  } catch (error) {
    console.error('Error creating addon:', error);
    return res.status(500).json({ success: false, message: 'Failed to create add-on item' });
  }
};

// UPDATE addon item (admin)
exports.updateAddon = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, image, itemCategory, unitType, active } = req.body;

    const existing = await prisma.addonItem.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Add-on item not found' });
    }

    const addon = await prisma.addonItem.update({
      where: { id },
      data: {
        name: name !== undefined ? name : existing.name,
        description: description !== undefined ? description : existing.description,
        image: image !== undefined ? image : existing.image,
        itemCategory: itemCategory !== undefined ? itemCategory : existing.itemCategory,
        unitType: unitType !== undefined ? unitType : existing.unitType,
        active: active !== undefined ? Boolean(active) : existing.active,
      },
    });

    return res.json({ success: true, data: addon, message: 'Add-on item updated successfully' });
  } catch (error) {
    console.error('Error updating addon:', error);
    return res.status(500).json({ success: false, message: 'Failed to update add-on item' });
  }
};

// DELETE addon item (admin)
exports.deleteAddon = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await prisma.addonItem.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Add-on item not found' });
    }

    await prisma.addonItem.delete({ where: { id } });

    return res.json({ success: true, message: 'Add-on item deleted successfully' });
  } catch (error) {
    console.error('Error deleting addon:', error);
    return res.status(500).json({ success: false, message: 'Failed to delete add-on item' });
  }
};
