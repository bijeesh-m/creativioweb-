const Client = require('../models/Client');
const UploadService = require('../services/uploadService');

// @desc    Get all clients (public)
// @route   GET /api/clients
// @access  Public
const getClients = async (req, res, next) => {
    try {
        const { featured } = req.query;
        const query = { isActive: true };
        if (featured === 'true') query.featured = true;

        const clients = await Client.find(query).sort({ order: 1, createdAt: -1 });

        res.status(200).json({
            success: true,
            count: clients.length,
            data: clients,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all clients (admin)
// @route   GET /api/admin/clients
// @access  Private
const getClientsAdmin = async (req, res, next) => {
    try {
        const clients = await Client.find().sort({ order: 1, createdAt: -1 });
        res.status(200).json({
            success: true,
            count: clients.length,
            data: clients,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Create client
// @route   POST /api/admin/clients
// @access  Private
const createClient = async (req, res, next) => {
    try {
        const clientData = { ...req.body };

        if (req.file) {
            const result = await UploadService.smartProcess(req.file, 'clients');
            clientData.logo = {
                url: result.url,
                key: result.key,
                publicId: result.publicId,
            };
        }

        const client = await Client.create(clientData);

        res.status(201).json({
            success: true,
            data: client,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update client
// @route   PUT /api/admin/clients/:id
// @access  Private
const updateClient = async (req, res, next) => {
    try {
        let client = await Client.findById(req.params.id);

        if (!client) {
            return res.status(404).json({
                success: false,
                message: 'Client not found',
            });
        }

        const updateData = { ...req.body };

        if (req.file) {
            if (client.logo) {
                await UploadService.deleteFile(client.logo);
            }
            const result = await UploadService.smartProcess(req.file, 'clients');
            updateData.logo = {
                url: result.url,
                key: result.key,
                publicId: result.publicId,
            };
        }

        client = await Client.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            success: true,
            data: client,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete client
// @route   DELETE /api/admin/clients/:id
// @access  Private
const deleteClient = async (req, res, next) => {
    try {
        const client = await Client.findById(req.params.id);

        if (!client) {
            return res.status(404).json({
                success: false,
                message: 'Client not found',
            });
        }

        if (client.logo) {
            await UploadService.deleteFile(client.logo);
        }

        await Client.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Client deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getClients,
    getClientsAdmin,
    createClient,
    updateClient,
    deleteClient,
};
