const mongoose = require('mongoose');

const siteSettingSchema = new mongoose.Schema(
    {
        key: {
            type: String,
            required: [true, 'Setting key is required'],
            unique: true,
            trim: true,
            index: true,
        },
        value: {
            type: mongoose.Schema.Types.Mixed,
            required: [true, 'Setting value is required'],
        },
        type: {
            type: String,
            enum: ['text', 'textarea', 'image', 'url', 'json', 'boolean', 'number'],
            default: 'text',
        },
        group: {
            type: String,
            enum: ['general', 'hero', 'about', 'footer', 'social', 'seo', 'contact'],
            default: 'general',
        },
        label: {
            type: String,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

siteSettingSchema.index({ group: 1 });

module.exports = mongoose.model('SiteSetting', siteSettingSchema);
