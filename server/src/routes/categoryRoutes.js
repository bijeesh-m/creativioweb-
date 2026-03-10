const express = require('express');
const router = express.Router();
const {
    getCategories,
    getCategoriesAdmin,
    createCategory,
    updateCategory,
    deleteCategory,
} = require('../controllers/categoryController');
const { protect } = require('../middleware/auth');

// Public routes
router.get('/', getCategories);

// Admin routes
router.get('/admin/all', protect, getCategoriesAdmin);
router.post('/admin', protect, createCategory);
router.put('/admin/:id', protect, updateCategory);
router.delete('/admin/:id', protect, deleteCategory);

module.exports = router;
