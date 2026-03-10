const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getUploader, setUploadFolder } = require('../middleware/upload');
const UploadService = require('../services/uploadService');

const upload = getUploader();

// @desc    Upload a single file
// @route   POST /api/upload
// @access  Private
router.post(
    '/',
    protect,
    setUploadFolder('general'),
    upload.single('file'),
    async (req, res, next) => {
        try {
            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    message: 'No file uploaded',
                });
            }

            const folder = req.body.folder || 'general';
            const result = await UploadService.smartProcess(req.file, folder);

            res.status(200).json({
                success: true,
                data: result,
            });
        } catch (error) {
            next(error);
        }
    }
);

// @desc    Upload multiple files
// @route   POST /api/upload/multiple
// @access  Private
router.post(
    '/multiple',
    protect,
    setUploadFolder('general'),
    upload.array('files', 10),
    async (req, res, next) => {
        try {
            if (!req.files || req.files.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'No files uploaded',
                });
            }

            const folder = req.body.folder || 'general';
            const results = await Promise.all(
                req.files.map((file) => UploadService.smartProcess(file, folder))
            );

            res.status(200).json({
                success: true,
                count: results.length,
                data: results,
            });
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
