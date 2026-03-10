const SiteSetting = require('../models/SiteSetting');

// @desc    Get all settings (public - grouped)
// @route   GET /api/settings
// @access  Public
const getSettings = async (req, res, next) => {
    try {
        const { group } = req.query;
        const query = group ? { group } : {};

        const settings = await SiteSetting.find(query).sort({ group: 1, key: 1 });

        // Transform to key-value map for easy frontend consumption
        const settingsMap = {};
        settings.forEach((s) => {
            if (!settingsMap[s.group]) settingsMap[s.group] = {};
            settingsMap[s.group][s.key] = s.value;
        });

        res.status(200).json({
            success: true,
            data: settingsMap,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all settings (admin - full objects)
// @route   GET /api/admin/settings
// @access  Private
const getSettingsAdmin = async (req, res, next) => {
    try {
        const settings = await SiteSetting.find().sort({ group: 1, key: 1 });
        res.status(200).json({
            success: true,
            count: settings.length,
            data: settings,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Upsert setting (create or update)
// @route   PUT /api/admin/settings
// @access  Private
const upsertSetting = async (req, res, next) => {
    try {
        const { key, value, type, group, label, description } = req.body;

        if (!key || value === undefined) {
            return res.status(400).json({
                success: false,
                message: 'Key and value are required',
            });
        }

        const setting = await SiteSetting.findOneAndUpdate(
            { key },
            { value, type, group, label, description },
            { new: true, upsert: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            data: setting,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Batch upsert settings
// @route   PUT /api/admin/settings/batch
// @access  Private
const batchUpsertSettings = async (req, res, next) => {
    try {
        const { settings } = req.body;

        if (!settings || !Array.isArray(settings)) {
            return res.status(400).json({
                success: false,
                message: 'Settings array is required',
            });
        }

        const bulkOps = settings.map((s) => ({
            updateOne: {
                filter: { key: s.key },
                update: {
                    value: s.value,
                    type: s.type,
                    group: s.group,
                    label: s.label,
                    description: s.description,
                },
                upsert: true,
            },
        }));

        await SiteSetting.bulkWrite(bulkOps);

        const updatedSettings = await SiteSetting.find().sort({ group: 1, key: 1 });

        res.status(200).json({
            success: true,
            message: 'Settings updated successfully',
            data: updatedSettings,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete setting
// @route   DELETE /api/admin/settings/:key
// @access  Private
const deleteSetting = async (req, res, next) => {
    try {
        const setting = await SiteSetting.findOneAndDelete({ key: req.params.key });

        if (!setting) {
            return res.status(404).json({
                success: false,
                message: 'Setting not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Setting deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getSettings,
    getSettingsAdmin,
    upsertSetting,
    batchUpsertSettings,
    deleteSetting,
};
