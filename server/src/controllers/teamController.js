const Team = require('../models/Team');
const UploadService = require('../services/uploadService');

// @desc    Get all team members (public)
// @route   GET /api/team
// @access  Public
const getTeamMembers = async (req, res, next) => {
    try {
        const teamMembers = await Team.find({ isPublished: true }).sort({
            order: 1,
            createdAt: -1,
        });

        res.status(200).json({
            success: true,
            count: teamMembers.length,
            data: teamMembers,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all team members (admin)
// @route   GET /api/admin/team
// @access  Private
const getTeamMembersAdmin = async (req, res, next) => {
    try {
        const teamMembers = await Team.find().sort({
            order: 1,
            createdAt: -1,
        });
        res.status(200).json({
            success: true,
            count: teamMembers.length,
            data: teamMembers,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Create team member
// @route   POST /api/admin/team
// @access  Private
const createTeamMember = async (req, res, next) => {
    try {
        const teamData = { ...req.body };

        if (req.file) {
            const result = await UploadService.smartProcess(req.file, 'team');
            teamData.image = {
                url: result.url,
                key: result.key,
                publicId: result.publicId,
            };
        }

        const teamMember = await Team.create(teamData);

        res.status(201).json({
            success: true,
            data: teamMember,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update team member
// @route   PUT /api/admin/team/:id
// @access  Private
const updateTeamMember = async (req, res, next) => {
    try {
        let teamMember = await Team.findById(req.params.id);

        if (!teamMember) {
            return res.status(404).json({
                success: false,
                message: 'Team member not found',
            });
        }

        const updateData = { ...req.body };

        if (req.file) {
            if (teamMember.image && teamMember.image.key) {
                await UploadService.deleteFile(teamMember.image);
            }
            const result = await UploadService.smartProcess(req.file, 'team');
            updateData.image = {
                url: result.url,
                key: result.key,
                publicId: result.publicId,
            };
        }

        teamMember = await Team.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            data: teamMember,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete team member
// @route   DELETE /api/admin/team/:id
// @access  Private
const deleteTeamMember = async (req, res, next) => {
    try {
        const teamMember = await Team.findById(req.params.id);

        if (!teamMember) {
            return res.status(404).json({
                success: false,
                message: 'Team member not found',
            });
        }

        if (teamMember.image && teamMember.image.key) {
            await UploadService.deleteFile(teamMember.image);
        }

        await Team.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Team member deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getTeamMembers,
    getTeamMembersAdmin,
    createTeamMember,
    updateTeamMember,
    deleteTeamMember,
};
