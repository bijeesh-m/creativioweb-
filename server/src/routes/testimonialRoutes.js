const express = require('express');
const router = express.Router();
const {
    getTestimonials,
    getTestimonialsAdmin,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
} = require('../controllers/testimonialController');
const { protect } = require('../middleware/auth');
const { getUploader, setUploadFolder } = require('../middleware/upload');

const upload = getUploader();

// Public routes
router.get('/', getTestimonials);

// Admin routes
router.get('/admin/all', protect, getTestimonialsAdmin);
router.post(
    '/admin',
    protect,
    setUploadFolder('testimonials'),
    upload.single('avatar'),
    createTestimonial
);
router.put(
    '/admin/:id',
    protect,
    setUploadFolder('testimonials'),
    upload.single('avatar'),
    updateTestimonial
);
router.delete('/admin/:id', protect, deleteTestimonial);

module.exports = router;
