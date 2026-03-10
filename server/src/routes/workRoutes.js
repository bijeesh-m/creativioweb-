const express = require('express');
const router = express.Router();
const {
    getWorks,
    getWork,
    getWorksAdmin,
    createWork,
    updateWork,
    deleteWork,
    reorderWorks,
} = require('../controllers/workController');
const { protect } = require('../middleware/auth');
const { getUploader, setUploadFolder } = require('../middleware/upload');

const upload = getUploader();

// Public routes
router.get('/', getWorks);
router.get('/:slug', getWork);

// Admin routes
router.get('/admin/all', protect, getWorksAdmin);
router.post(
    '/admin',
    protect,
    setUploadFolder('works'),
    upload.fields([
        { name: 'image', maxCount: 1 },
        { name: 'gallery', maxCount: 10 },
    ]),
    createWork
);
router.put(
    '/admin/:id',
    protect,
    setUploadFolder('works'),
    upload.fields([
        { name: 'image', maxCount: 1 },
        { name: 'gallery', maxCount: 10 },
    ]),
    updateWork
);
router.delete('/admin/:id', protect, deleteWork);
router.put('/admin/reorder/bulk', protect, reorderWorks);

module.exports = router;
