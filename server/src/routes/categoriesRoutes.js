const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');
const authMiddleware = require('../middleware/authMiddleware');

// Public
router.get('/', categoriesController.getAllCategories);
router.get('/:slug', categoriesController.getCategoryBySlug);

// Admin protected
router.post('/', authMiddleware, categoriesController.createCategory);
router.put('/:id', authMiddleware, categoriesController.updateCategory);
router.delete('/:id', authMiddleware, categoriesController.deleteCategory);

module.exports = router;
