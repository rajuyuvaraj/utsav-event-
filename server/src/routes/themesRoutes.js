const express = require('express');
const router = express.Router();
const themesController = require('../controllers/themesController');
const authMiddleware = require('../middleware/authMiddleware');

// Public
router.get('/', themesController.getAllThemes);
router.get('/:idOrSlug', themesController.getThemeByIdOrSlug);

// Admin protected
router.post('/', authMiddleware, themesController.createTheme);
router.put('/:id', authMiddleware, themesController.updateTheme);
router.delete('/:id', authMiddleware, themesController.deleteTheme);

module.exports = router;
