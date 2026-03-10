const express = require('express');
const router = express.Router();
const {
    getSettings,
    getSettingsAdmin,
    upsertSetting,
    batchUpsertSettings,
    deleteSetting,
} = require('../controllers/settingController');
const { protect } = require('../middleware/auth');

// Public routes
router.get('/', getSettings);

// Admin routes
router.get('/admin/all', protect, getSettingsAdmin);
router.put('/admin', protect, upsertSetting);
router.put('/admin/batch', protect, batchUpsertSettings);
router.delete('/admin/:key', protect, deleteSetting);

module.exports = router;
