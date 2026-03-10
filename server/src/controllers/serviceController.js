const Service = require('../models/Service');
const UploadService = require('../services/uploadService');

// @desc    Get all services (public)
// @route   GET /api/services
// @access  Public
const getServices = async (req, res, next) => {
    try {
        const services = await Service.find({ isPublished: true }).sort({
            order: 1,
            createdAt: -1,
        });

        res.status(200).json({
            success: true,
            count: services.length,
            data: services,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single service by slug
// @route   GET /api/services/:slug
// @access  Public
const getService = async (req, res, next) => {
    try {
        const service = await Service.findOne({
            slug: req.params.slug,
            isPublished: true,
        });

        if (!service) {
            return res.status(404).json({
                success: false,
                message: 'Service not found',
            });
        }

        res.status(200).json({
            success: true,
            data: service,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all services (admin)
// @route   GET /api/admin/services
// @access  Private
const getServicesAdmin = async (req, res, next) => {
    try {
        const services = await Service.find().sort({ order: 1, createdAt: -1 });
        res.status(200).json({
            success: true,
            count: services.length,
            data: services,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Create service
// @route   POST /api/admin/services
// @access  Private
const createService = async (req, res, next) => {
    try {
        const serviceData = { ...req.body };

        // Parse JSON strings from FormData
        if (typeof serviceData.features === 'string') {
            serviceData.features = JSON.parse(serviceData.features);
        }
        if (typeof serviceData.benefits === 'string') {
            serviceData.benefits = JSON.parse(serviceData.benefits);
        }
        if (typeof serviceData.packages === 'string') {
            serviceData.packages = JSON.parse(serviceData.packages);
        }

        // Handle image uploads
        if (req.files) {
            if (req.files.image) {
                const result = await UploadService.smartProcess(
                    req.files.image[0],
                    'services'
                );
                serviceData.image = {
                    url: result.url,
                    key: result.key,
                    publicId: result.publicId,
                };
            }
            if (req.files.heroImage) {
                const result = await UploadService.smartProcess(
                    req.files.heroImage[0],
                    'services'
                );
                serviceData.heroImage = {
                    url: result.url,
                    key: result.key,
                    publicId: result.publicId,
                };
            }
        }

        const service = await Service.create(serviceData);

        res.status(201).json({
            success: true,
            data: service,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update service
// @route   PUT /api/admin/services/:id
// @access  Private
const updateService = async (req, res, next) => {
    try {
        let service = await Service.findById(req.params.id);

        if (!service) {
            return res.status(404).json({
                success: false,
                message: 'Service not found',
            });
        }

        const updateData = { ...req.body };

        // Parse JSON strings
        if (typeof updateData.features === 'string') {
            updateData.features = JSON.parse(updateData.features);
        }
        if (typeof updateData.benefits === 'string') {
            updateData.benefits = JSON.parse(updateData.benefits);
        }
        if (typeof updateData.packages === 'string') {
            updateData.packages = JSON.parse(updateData.packages);
        }

        // Handle image uploads
        if (req.files) {
            if (req.files.image) {
                if (service.image) await UploadService.deleteFile(service.image);
                const result = await UploadService.smartProcess(
                    req.files.image[0],
                    'services'
                );
                updateData.image = {
                    url: result.url,
                    key: result.key,
                    publicId: result.publicId,
                };
            }
            if (req.files.heroImage) {
                if (service.heroImage) await UploadService.deleteFile(service.heroImage);
                const result = await UploadService.smartProcess(
                    req.files.heroImage[0],
                    'services'
                );
                updateData.heroImage = {
                    url: result.url,
                    key: result.key,
                    publicId: result.publicId,
                };
            }
        }

        service = await Service.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            success: true,
            data: service,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete service
// @route   DELETE /api/admin/services/:id
// @access  Private
const deleteService = async (req, res, next) => {
    try {
        const service = await Service.findById(req.params.id);

        if (!service) {
            return res.status(404).json({
                success: false,
                message: 'Service not found',
            });
        }

        if (service.image) await UploadService.deleteFile(service.image);
        if (service.heroImage) await UploadService.deleteFile(service.heroImage);

        await Service.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Service deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getServices,
    getService,
    getServicesAdmin,
    createService,
    updateService,
    deleteService,
};
