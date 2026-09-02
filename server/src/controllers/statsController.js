const prisma = require('../config/db');

exports.getDashboardStats = async (req, res) => {
  try {
    const totalRequests = await prisma.request.count();
    const newRequests = await prisma.request.count({ where: { status: 'NEW' } });
    const contactedRequests = await prisma.request.count({ where: { status: 'CONTACTED' } });
    const confirmedRequests = await prisma.request.count({ where: { status: 'CONFIRMED' } });
    const closedRequests = await prisma.request.count({ where: { status: 'CLOSED' } });

    // Requests received in the last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentWeekRequests = await prisma.request.count({
      where: {
        createdAt: { gte: sevenDaysAgo },
      },
    });

    // Counts of active catalog items
    const totalCategories = await prisma.eventCategory.count({ where: { active: true } });
    const totalThemes = await prisma.theme.count({ where: { active: true } });
    const totalAddons = await prisma.addonItem.count({ where: { active: true } });

    // Breakdown of requests by Category / Theme
    const allRequests = await prisma.request.findMany({
      select: {
        id: true,
        selectedThemeId: true,
        selectedThemeName: true,
        status: true,
        createdAt: true,
      },
    });

    // Fetch themes to map category
    const themes = await prisma.theme.findMany({
      select: {
        id: true,
        name: true,
        category: { select: { id: true, name: true, slug: true } },
      },
    });

    const themeMap = {};
    themes.forEach((t) => {
      themeMap[t.id] = t.category ? t.category.name : 'Custom / Unassigned';
    });

    const categoryBreakdown = {};
    allRequests.forEach((reqItem) => {
      let catName = 'Custom / General';
      if (reqItem.selectedThemeId && themeMap[reqItem.selectedThemeId]) {
        catName = themeMap[reqItem.selectedThemeId];
      }
      categoryBreakdown[catName] = (categoryBreakdown[catName] || 0) + 1;
    });

    const categoryBreakdownArray = Object.keys(categoryBreakdown).map((category) => ({
      category,
      count: categoryBreakdown[category],
    }));

    // Recent 5 requests for dashboard quick table
    const recentInquiries = await prisma.request.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        requestNumber: true,
        customerName: true,
        phone: true,
        email: true,
        eventDate: true,
        selectedThemeName: true,
        status: true,
        createdAt: true,
      },
    });

    return res.json({
      success: true,
      data: {
        summary: {
          totalRequests,
          newRequests,
          contactedRequests,
          confirmedRequests,
          closedRequests,
          recentWeekRequests,
          totalCategories,
          totalThemes,
          totalAddons,
        },
        categoryBreakdown: categoryBreakdownArray,
        recentInquiries,
      },
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch dashboard statistics' });
  }
};
