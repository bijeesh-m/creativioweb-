const Testimonial = require('../models/Testimonial');
const UploadService = require('../services/uploadService');

// @desc    Get all testimonials (public)
// @route   GET /api/testimonials
// @access  Public
const getTestimonials = async (req, res, next) => {
    try {
        const { featured } = req.query;
        const query = { isPublished: true };
        if (featured === 'true') query.featured = true;

        const testimonials = await Testimonial.find(query).sort({
            order: 1,
            createdAt: -1,
        });

        res.status(200).json({
            success: true,
            count: testimonials.length,
            data: testimonials,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all testimonials (admin)
// @route   GET /api/admin/testimonials
// @access  Private
const getTestimonialsAdmin = async (req, res, next) => {
    try {
        const testimonials = await Testimonial.find().sort({
            order: 1,
            createdAt: -1,
        });
        res.status(200).json({
            success: true,
            count: testimonials.length,
            data: testimonials,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Create testimonial
// @route   POST /api/admin/testimonials
// @access  Private
const createTestimonial = async (req, res, next) => {
    try {
        const testimonialData = { ...req.body };

        if (req.file) {
            const result = await UploadService.smartProcess(req.file, 'testimonials');
            testimonialData.avatar = {
                url: result.url,
                key: result.key,
                publicId: result.publicId,
            };
        }

        const testimonial = await Testimonial.create(testimonialData);

        res.status(201).json({
            success: true,
            data: testimonial,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update testimonial
// @route   PUT /api/admin/testimonials/:id
// @access  Private
const updateTestimonial = async (req, res, next) => {
    try {
        let testimonial = await Testimonial.findById(req.params.id);

        if (!testimonial) {
            return res.status(404).json({
                success: false,
                message: 'Testimonial not found',
            });
        }

        const updateData = { ...req.body };

        if (req.file) {
            if (testimonial.avatar) {
                await UploadService.deleteFile(testimonial.avatar);
            }
            const result = await UploadService.smartProcess(req.file, 'testimonials');
            updateData.avatar = {
                url: result.url,
                key: result.key,
                publicId: result.publicId,
            };
        }

        testimonial = await Testimonial.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            data: testimonial,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete testimonial
// @route   DELETE /api/admin/testimonials/:id
// @access  Private
const deleteTestimonial = async (req, res, next) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id);

        if (!testimonial) {
            return res.status(404).json({
                success: false,
                message: 'Testimonial not found',
            });
        }

        if (testimonial.avatar) {
            await UploadService.deleteFile(testimonial.avatar);
        }

        await Testimonial.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Testimonial deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getTestimonials,
    getTestimonialsAdmin,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
};
