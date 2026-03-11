const Work = require('../models/Work');
const UploadService = require('../services/uploadService');

// @desc    Get all works (public)
// @route   GET /api/works
// @access  Public
const getWorks = async (req, res, next) => {
    try {
        const {
            category,
            featured,
            page = 1,
            limit = 20,
            sort = 'order',
        } = req.query;

        const query = { isPublished: true };

        if (category && category !== 'All Projects') {
            query.categories = category;
        }
        if (featured === 'true') query.featured = true;

        const total = await Work.countDocuments(query);
        const works = await Work.find(query)
            .sort(sort === 'latest' ? { createdAt: -1 } : { order: 1, createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .populate('services', 'title slug');

        res.status(200).json({
            success: true,
            count: works.length,
            total,
            pages: Math.ceil(total / limit),
            currentPage: parseInt(page),
            data: works,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single work
// @route   GET /api/works/:slug
// @access  Public
const getWork = async (req, res, next) => {
    try {
        const work = await Work.findOne({
            slug: req.params.slug,
            isPublished: true,
        }).populate('services', 'title slug');

        if (!work) {
            return res.status(404).json({
                success: false,
                message: 'Work not found',
            });
        }

        res.status(200).json({
            success: true,
            data: work,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all works (admin - includes unpublished)
// @route   GET /api/admin/works
// @access  Private
const getWorksAdmin = async (req, res, next) => {
    try {
        const { category, featured, isPublished, page = 1, limit = 50 } = req.query;

        const query = {};
        if (category) query.categories = category;
        if (featured !== undefined) query.featured = featured === 'true';
        if (isPublished !== undefined) query.isPublished = isPublished === 'true';

        const total = await Work.countDocuments(query);
        const works = await Work.find(query)
            .sort({ order: 1, createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        res.status(200).json({
            success: true,
            count: works.length,
            total,
            pages: Math.ceil(total / limit),
            data: works,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Create work
// @route   POST /api/admin/works
// @access  Private
const createWork = async (req, res, next) => {
    try {
        const workData = { ...req.body };

        // Parse JSON strings from FormData
        if (typeof workData.categories === 'string') {
            workData.categories = JSON.parse(workData.categories);
        }
        if (typeof workData.gallery === 'string') {
            workData.gallery = JSON.parse(workData.gallery);
        }
        if (typeof workData.services === 'string') {
            workData.services = JSON.parse(workData.services);
        }

        // Process main image/video upload
        if (req.files && req.files.image) {
            const file = req.files.image[0];
            const imageResult = await UploadService.smartProcess(file, 'works');
            workData.image = {
                url: imageResult.url,
                key: imageResult.key,
                publicId: imageResult.publicId,
                mediaType: file.mimetype.startsWith('video/') ? 'video' : 'image',
            };
        } else if (req.file) {
            const file = req.file;
            const imageResult = await UploadService.smartProcess(file, 'works');
            workData.image = {
                url: imageResult.url,
                key: imageResult.key,
                publicId: imageResult.publicId,
                mediaType: file.mimetype.startsWith('video/') ? 'video' : 'image',
            };
        }

        // Process gallery images
        if (req.files && req.files.gallery) {
            workData.gallery = await Promise.all(
                req.files.gallery.map(async (file) => {
                    const result = await UploadService.smartProcess(file, 'works/gallery');
                    return {
                        url: result.url,
                        key: result.key,
                        publicId: result.publicId,
                    };
                })
            );
        }

        const work = await Work.create(workData);

        res.status(201).json({
            success: true,
            data: work,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update work
// @route   PUT /api/admin/works/:id
// @access  Private
const updateWork = async (req, res, next) => {
    try {
        let work = await Work.findById(req.params.id);

        if (!work) {
            return res.status(404).json({
                success: false,
                message: 'Work not found',
            });
        }

        const updateData = { ...req.body };

        // Parse JSON strings
        if (typeof updateData.categories === 'string') {
            updateData.categories = JSON.parse(updateData.categories);
        }
        if (typeof updateData.services === 'string') {
            updateData.services = JSON.parse(updateData.services);
        }

        // Handle media update
        if (req.files && req.files.image) {
            const file = req.files.image[0];
            // Delete old image
            if (work.image) {
                await UploadService.deleteFile(work.image);
            }
            const imageResult = await UploadService.smartProcess(file, 'works');
            updateData.image = {
                url: imageResult.url,
                key: imageResult.key,
                publicId: imageResult.publicId,
                mediaType: file.mimetype.startsWith('video/') ? 'video' : 'image',
            };
        } else if (req.file) {
            const file = req.file;
            if (work.image) {
                await UploadService.deleteFile(work.image);
            }
            const imageResult = await UploadService.smartProcess(file, 'works');
            updateData.image = {
                url: imageResult.url,
                key: imageResult.key,
                publicId: imageResult.publicId,
                mediaType: file.mimetype.startsWith('video/') ? 'video' : 'image',
            };
        }

        work = await Work.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            success: true,
            data: work,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete work
// @route   DELETE /api/admin/works/:id
// @access  Private
const deleteWork = async (req, res, next) => {
    try {
        const work = await Work.findById(req.params.id);

        if (!work) {
            return res.status(404).json({
                success: false,
                message: 'Work not found',
            });
        }

        // Delete associated files
        if (work.image) {
            await UploadService.deleteFile(work.image);
        }
        if (work.gallery && work.gallery.length > 0) {
            await Promise.all(
                work.gallery.map((img) => UploadService.deleteFile(img))
            );
        }

        await Work.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Work deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Reorder works
// @route   PUT /api/admin/works/reorder
// @access  Private
const reorderWorks = async (req, res, next) => {
    try {
        const { items } = req.body; // [{ id, order }]

        if (!items || !Array.isArray(items)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide items array with id and order',
            });
        }

        const bulkOps = items.map((item) => ({
            updateOne: {
                filter: { _id: item.id },
                update: { order: item.order },
            },
        }));

        await Work.bulkWrite(bulkOps);

        res.status(200).json({
            success: true,
            message: 'Works reordered successfully',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getWorks,
    getWork,
    getWorksAdmin,
    createWork,
    updateWork,
    deleteWork,
    reorderWorks,
};
