const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const {
    login,
    refreshAccessToken,
    logout,
    getMe,
    updateMe,
    changePassword,
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// Rate limiting for auth endpoints
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // 10 attempts per window
    message: {
        success: false,
        message: 'Too many login attempts. Please try again after 15 minutes.',
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// Public routes
router.post('/login', authLimiter, login);
router.post('/refresh', refreshAccessToken);

// Protected routes
router.post('/logout', protect, logout);
router.get('/me', protect, getMe);
router.put('/me', protect, updateMe);
router.put('/change-password', protect, changePassword);

module.exports = router;
