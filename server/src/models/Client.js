const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Client name is required'],
            trim: true,
            maxlength: [200, 'Name cannot exceed 200 characters'],
        },
        logo: {
            url: { type: String, required: [true, 'Logo is required'] },
            key: String,
            publicId: String,
        },
        website: {
            type: String,
            trim: true,
        },
        industry: {
            type: String,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
            maxlength: [500, 'Description cannot exceed 500 characters'],
        },
        featured: {
            type: Boolean,
            default: false,
            index: true,
        },
        order: {
            type: Number,
            default: 0,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

clientSchema.index({ order: 1, createdAt: -1 });

module.exports = mongoose.model('Client', clientSchema);
