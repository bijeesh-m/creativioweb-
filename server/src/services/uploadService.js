const { DeleteObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const s3Client = require('../config/s3');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');
const path = require('path');

class UploadService {
    /**
     * Process uploaded file - upload to Cloudinary via S3 URL or local path
     * Returns optimized Cloudinary URL for CDN delivery
     */
    static async processUpload(file, folder = 'general') {
        try {
            // If using S3 (file.location exists from multer-s3)
            if (file.location) {
                return await this.uploadToCloudinaryFromUrl(file.location, folder, file.key);
            }

            // If using local storage (file.path exists)
            if (file.path) {
                return await this.uploadToCloudinaryFromLocal(file.path, folder);
            }

            throw new Error('No file source found');
        } catch (error) {
            console.error('Upload processing error:', error);
            throw error;
        }
    }

    /**
     * Upload to Cloudinary from S3 URL
     */
    static async uploadToCloudinaryFromUrl(s3Url, folder, s3Key) {
        try {
            const result = await cloudinary.uploader.upload(s3Url, {
                folder: `creativio/${folder}`,
                resource_type: 'auto',
                quality: 'auto:best',
                fetch_format: 'auto',
                flags: 'progressive',
            });

            return {
                url: result.secure_url,
                publicId: result.public_id,
                key: s3Key,
                width: result.width,
                height: result.height,
                format: result.format,
                size: result.bytes,
            };
        } catch (error) {
            console.error('Cloudinary upload from URL error:', error);
            throw error;
        }
    }

    /**
     * Upload to Cloudinary from local file path
     */
    static async uploadToCloudinaryFromLocal(filePath, folder) {
        try {
            const result = await cloudinary.uploader.upload(filePath, {
                folder: `creativio/${folder}`,
                resource_type: 'auto',
                quality: 'auto:best',
                fetch_format: 'auto',
                flags: 'progressive',
            });

            // Clean up local file after upload
            fs.unlink(filePath, (err) => {
                if (err) console.error('Error deleting local file:', err);
            });

            return {
                url: result.secure_url,
                publicId: result.public_id,
                key: null,
                width: result.width,
                height: result.height,
                format: result.format,
                size: result.bytes,
            };
        } catch (error) {
            console.error('Cloudinary upload from local error:', error);
            throw error;
        }
    }

    /**
     * Delete file from both S3 and Cloudinary
     */
    static async deleteFile(fileData) {
        const promises = [];

        // Delete from Cloudinary
        if (fileData.publicId) {
            promises.push(
                cloudinary.uploader.destroy(fileData.publicId).catch((err) => {
                    console.error('Cloudinary delete error:', err);
                })
            );
        }

        // Delete from S3
        if (fileData.key) {
            promises.push(
                s3Client
                    .send(
                        new DeleteObjectCommand({
                            Bucket: process.env.AWS_S3_BUCKET,
                            Key: fileData.key,
                        })
                    )
                    .catch((err) => {
                        console.error('S3 delete error:', err);
                    })
            );
        }

        await Promise.allSettled(promises);
    }

    /**
     * Generate optimized Cloudinary URL with transformations
     */
    static getOptimizedUrl(publicId, options = {}) {
        const {
            width,
            height,
            crop = 'fill',
            quality = 'auto',
            format = 'auto',
        } = options;

        const transformations = [
            { quality, fetch_format: format },
        ];

        if (width || height) {
            transformations.push({
                width,
                height,
                crop,
            });
        }

        return cloudinary.url(publicId, {
            transformation: transformations,
            secure: true,
        });
    }

    /**
     * Get a presigned S3 URL (for direct browser uploads)
     */
    static async getPresignedUrl(key, expiresIn = 3600) {
        const command = new GetObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET,
            Key: key,
        });

        return getSignedUrl(s3Client, command, { expiresIn });
    }

    /**
     * Handle file when S3/Cloudinary are not configured (dev mode)
     * Returns a local URL
     */
    static getLocalUrl(file) {
        if (file.location) return file.location;
        if (file.path) {
            // Convert to relative URL
            const relativePath = file.path
                .replace(/\\/g, '/')
                .split('/uploads/')
                .pop();
            return `/uploads/${relativePath}`;
        }
        return null;
    }

    /**
     * Smart process - handles both configured and unconfigured environments
     */
    static async smartProcess(file, folder = 'general') {
        const isCloudinaryConfigured =
            process.env.CLOUDINARY_CLOUD_NAME &&
            process.env.CLOUDINARY_CLOUD_NAME !== 'your_cloud_name';

        if (isCloudinaryConfigured) {
            return await this.processUpload(file, folder);
        }

        // Fallback: return local/S3 URL directly
        const url = this.getLocalUrl(file);
        return {
            url,
            publicId: null,
            key: file.key || null,
            width: null,
            height: null,
            format: path.extname(file.originalname).slice(1),
            size: file.size,
        };
    }
}

module.exports = UploadService;
