const prisma = require('../config/db');

// Helper to format request objects with parsed JSON
const formatRequest = (reqItem) => ({
  ...reqItem,
  selectedAddons: typeof reqItem.selectedAddons === 'string' ? JSON.parse(reqItem.selectedAddons || '[]') : reqItem.selectedAddons,
  adminNotes: typeof reqItem.adminNotes === 'string' ? JSON.parse(reqItem.adminNotes || '[]') : reqItem.adminNotes,
});

// PUBLIC: Submit a new consultation/booking request
exports.createRequest = async (req, res) => {
  try {
    const {
      customerName,
      phone,
      email,
      eventDate,
      eventTimeSlot,
      location,
      venueType,
      guestCount,
      notes,
      selectedThemeId,
      selectedThemeName,
      selectedAddons,
    } = req.body;

    // Validation
    if (!customerName || !customerName.trim()) {
      return res.status(400).json({ success: false, message: 'Please provide your full name.' });
    }
    if (!phone || !phone.trim()) {
      return res.status(400).json({ success: false, message: 'Please provide a valid contact phone number.' });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ success: false, message: 'Please provide an email address.' });
    }
    if (!eventDate) {
      return res.status(400).json({ success: false, message: 'Please select your celebration/event date.' });
    }

    // Generate unique friendly reference number: UTSAV-YYYY-XXXX
    const currentYear = new Date().getFullYear();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const requestNumber = `UTSAV-${currentYear}-${randomSuffix}`;

    const addonsArray = Array.isArray(selectedAddons) ? selectedAddons : [];

    const newRequest = await prisma.request.create({
      data: {
        requestNumber,
        customerName: customerName.trim(),
        phone: phone.trim(),
        email: email.trim().toLowerCase(),
        eventDate,
        eventTimeSlot: eventTimeSlot || 'Evening',
        location: location ? location.trim() : 'To be confirmed',
        venueType: venueType || 'Banquet Hall',
        guestCount: guestCount ? Number(guestCount) : null,
        notes: notes ? notes.trim() : null,
        selectedThemeId: selectedThemeId || null,
        selectedThemeName: selectedThemeName || null,
        selectedAddons: JSON.stringify(addonsArray),
        status: 'NEW',
        adminNotes: JSON.stringify([
          {
            text: 'Enquiry received via Utsav Decor web portal.',
            date: new Date().toISOString(),
            author: 'System',
          },
        ]),
      },
    });

    return res.status(201).json({
      success: true,
      data: formatRequest(newRequest),
      message: 'Thank you! Your event decor enquiry has been received. Our team will contact you within 24 hours.',
    });
  } catch (error) {
    console.error('Error submitting request:', error);
    return res.status(500).json({ success: false, message: 'Failed to submit enquiry. Please try again or call us.' });
  }
};

// ADMIN: Get all requests with filter, pagination & search
exports.getAllRequests = async (req, res) => {
  try {
    const { status, search, limit = 50, page = 1 } = req.query;

    const where = {};
    if (status && status !== 'ALL') {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { customerName: { contains: search } },
        { phone: { contains: search } },
        { email: { contains: search } },
        { requestNumber: { contains: search } },
        { location: { contains: search } },
        { selectedThemeName: { contains: search } },
      ];
    }

    const take = Number(limit);
    const skip = (Number(page) - 1) * take;

    const [total, requests] = await Promise.all([
      prisma.request.count({ where }),
      prisma.request.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take,
        skip,
      }),
    ]);

    return res.json({
      success: true,
      data: requests.map(formatRequest),
      meta: {
        total,
        page: Number(page),
        totalPages: Math.ceil(total / take) || 1,
      },
    });
  } catch (error) {
    console.error('Error fetching requests:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch customer requests' });
  }
};

// ADMIN: Get single request details by ID
exports.getRequestById = async (req, res) => {
  try {
    const { id } = req.params;

    const requestItem = await prisma.request.findUnique({
      where: { id },
    });

    if (!requestItem) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }

    // Also fetch the full theme object if selectedThemeId is set
    let themeDetails = null;
    if (requestItem.selectedThemeId) {
      const theme = await prisma.theme.findUnique({
        where: { id: requestItem.selectedThemeId },
        include: { category: true },
      });
      if (theme) {
        themeDetails = {
          ...theme,
          features: JSON.parse(theme.features || '[]'),
          images: JSON.parse(theme.images || '[]'),
        };
      }
    }

    return res.json({
      success: true,
      data: {
        ...formatRequest(requestItem),
        themeDetails,
      },
    });
  } catch (error) {
    console.error('Error fetching request details:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch request details' });
  }
};

// ADMIN: Update request status and/or add internal notes
exports.updateRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, noteText, updatedGuestCount, updatedLocation } = req.body;

    const existing = await prisma.request.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }

    const updateData = {};
    if (status) {
      const validStatuses = ['NEW', 'CONTACTED', 'CONFIRMED', 'CLOSED'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ success: false, message: 'Invalid status value' });
      }
      updateData.status = status;
    }

    if (updatedGuestCount !== undefined) {
      updateData.guestCount = Number(updatedGuestCount) || null;
    }
    if (updatedLocation !== undefined) {
      updateData.location = updatedLocation;
    }

    let currentNotes = JSON.parse(existing.adminNotes || '[]');
    if (noteText && noteText.trim()) {
      currentNotes.unshift({
        text: noteText.trim(),
        date: new Date().toISOString(),
        author: req.admin ? req.admin.name : 'Admin',
      });
      updateData.adminNotes = JSON.stringify(currentNotes);
    }

    const updated = await prisma.request.update({
      where: { id },
      data: updateData,
    });

    return res.json({
      success: true,
      data: formatRequest(updated),
      message: 'Request updated successfully',
    });
  } catch (error) {
    console.error('Error updating request:', error);
    return res.status(500).json({ success: false, message: 'Failed to update request' });
  }
};

// ADMIN: Delete request
exports.deleteRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await prisma.request.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }

    await prisma.request.delete({ where: { id } });

    return res.json({ success: true, message: 'Request record deleted successfully' });
  } catch (error) {
    console.error('Error deleting request:', error);
    return res.status(500).json({ success: false, message: 'Failed to delete request' });
  }
};
