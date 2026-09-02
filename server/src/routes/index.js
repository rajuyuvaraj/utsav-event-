const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const categoriesRoutes = require('./categoriesRoutes');
const themesRoutes = require('./themesRoutes');
const addonsRoutes = require('./addonsRoutes');
const requestsRoutes = require('./requestsRoutes');
const statsRoutes = require('./statsRoutes');

router.use('/auth', authRoutes);
router.use('/categories', categoriesRoutes);
router.use('/themes', themesRoutes);
router.use('/addons', addonsRoutes);
router.use('/requests', requestsRoutes);
router.use('/stats', statsRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'Utsav Decor API',
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
