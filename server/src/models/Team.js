const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            maxlength: [200, 'Name cannot exceed 200 characters'],
        },
        role: {
            type: String,
            required: [true, 'Role is required'],
            trim: true,
            maxlength: [200, 'Role cannot exceed 200 characters'],
        },
        bio: {
            type: String,
            trim: true,
            maxlength: [1000, 'Bio cannot exceed 1000 characters'],
        },
        image: {
            url: String,
            key: String,
            publicId: String,
        },
        socialLinks: {
            linkedin: String,
            twitter: String,
            instagram: String,
        },
        order: {
            type: Number,
            default: 0,
        },
        isPublished: {
            type: Boolean,
            default: true,
            index: true,
        },
    },
    {
        timestamps: true,
    }
);

teamSchema.index({ order: 1, createdAt: -1 });

module.exports = mongoose.model('Team', teamSchema);
