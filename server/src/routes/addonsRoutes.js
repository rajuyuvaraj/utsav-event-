const express = require('express');
const router = express.Router();
const addonsController = require('../controllers/addonsController');
const authMiddleware = require('../middleware/authMiddleware');

// Public
router.get('/', addonsController.getAllAddons);

// Admin protected
router.post('/', authMiddleware, addonsController.createAddon);
router.put('/:id', authMiddleware, addonsController.updateAddon);
router.delete('/:id', authMiddleware, addonsController.deleteAddon);

module.exports = router;
