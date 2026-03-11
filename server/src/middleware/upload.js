const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

// Allowed file types
const ALLOWED_IMAGE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/svg+xml',
    'image/gif',
];

const ALLOWED_VIDEO_TYPES = [
    'video/mp4',
    'video/webm',
    'video/quicktime',
];

// File filter
const fileFilter = (req, file, cb) => {
    const allowedTypes = [...ALLOWED_IMAGE_TYPES, ...ALLOWED_VIDEO_TYPES];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(
            new Error(
                `Invalid file type: ${file.mimetype}. Allowed: ${allowedTypes.join(', ')}`
            ),
            false
        );
    }
};

// Generate unique filename
const generateFileName = (file) => {
    const uniqueSuffix = crypto.randomBytes(16).toString('hex');
    const ext = path.extname(file.originalname);
    return `${Date.now()}-${uniqueSuffix}${ext}`;
};

// Local upload fallback (for development without S3)
const localStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folder = req.uploadFolder || 'uploads';
        const uploadPath = path.join(__dirname, '../../uploads', folder);
        const fs = require('fs');
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, generateFileName(file));
    },
});

const uploadLocal = multer({
    storage: localStorage,
    fileFilter,
    limits: {
        fileSize: 100 * 1024 * 1024, // 100MB
    },
});

// Set upload folder middleware
const setUploadFolder = (folder) => (req, res, next) => {
    req.uploadFolder = folder;
    next();
};

// Lazily create S3 uploader (only when actually needed)
let _uploadToS3 = null;
const getS3Uploader = () => {
    if (!_uploadToS3) {
        const multerS3 = require('multer-s3');
        const s3Client = require('../config/s3');
        _uploadToS3 = multer({
            storage: multerS3({
                s3: s3Client,
                bucket: process.env.AWS_S3_BUCKET,
                contentType: multerS3.AUTO_CONTENT_TYPE,
                key: (req, file, cb) => {
                    const folder = req.uploadFolder || 'uploads';
                    const fileName = generateFileName(file);
                    cb(null, `${folder}/${fileName}`);
                },
            }),
            fileFilter,
            limits: {
                fileSize: 100 * 1024 * 1024,
            },
        });
    }
    return _uploadToS3;
};

// Choose upload strategy based on environment
const getUploader = () => {
    if (
        process.env.AWS_ACCESS_KEY_ID &&
        process.env.AWS_ACCESS_KEY_ID !== 'your_aws_access_key' &&
        process.env.AWS_S3_BUCKET &&
        process.env.AWS_S3_BUCKET !== 'creativio-uploads'
    ) {
        return getS3Uploader();
    }
    return uploadLocal;
};

module.exports = {
    uploadLocal,
    setUploadFolder,
    getUploader,
    ALLOWED_IMAGE_TYPES,
};
