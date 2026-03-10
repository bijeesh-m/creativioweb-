const express = require('express');
const router = express.Router();
const {
    getServices,
    getService,
    getServicesAdmin,
    createService,
    updateService,
    deleteService,
} = require('../controllers/serviceController');
const { protect } = require('../middleware/auth');
const { getUploader, setUploadFolder } = require('../middleware/upload');

const upload = getUploader();

// Public routes
router.get('/', getServices);
router.get('/:slug', getService);

// Admin routes
router.get('/admin/all', protect, getServicesAdmin);
router.post(
    '/admin',
    protect,
    setUploadFolder('services'),
    upload.fields([
        { name: 'image', maxCount: 1 },
        { name: 'heroImage', maxCount: 1 },
    ]),
    createService
);
router.put(
    '/admin/:id',
    protect,
    setUploadFolder('services'),
    upload.fields([
        { name: 'image', maxCount: 1 },
        { name: 'heroImage', maxCount: 1 },
    ]),
    updateService
);
router.delete('/admin/:id', protect, deleteService);

module.exports = router;
