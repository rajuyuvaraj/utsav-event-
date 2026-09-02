const express = require('express');
const router = express.Router();
const requestsController = require('../controllers/requestsController');
const authMiddleware = require('../middleware/authMiddleware');

// Public: Submit enquiry
router.post('/', requestsController.createRequest);

// Admin protected
router.get('/', authMiddleware, requestsController.getAllRequests);
router.get('/:id', authMiddleware, requestsController.getRequestById);
router.patch('/:id', authMiddleware, requestsController.updateRequest);
router.delete('/:id', authMiddleware, requestsController.deleteRequest);

module.exports = router;
