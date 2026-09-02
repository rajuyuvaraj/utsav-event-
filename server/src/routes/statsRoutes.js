const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/dashboard', authMiddleware, statsController.getDashboardStats);

module.exports = router;
