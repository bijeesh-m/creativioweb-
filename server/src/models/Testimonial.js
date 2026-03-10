const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema(
    {
        clientName: {
            type: String,
            required: [true, 'Client name is required'],
            trim: true,
            maxlength: [200, 'Name cannot exceed 200 characters'],
        },
        company: {
            type: String,
            trim: true,
        },
        role: {
            type: String,
            trim: true,
        },
        content: {
            type: String,
            required: [true, 'Testimonial content is required'],
            trim: true,
            maxlength: [2000, 'Content cannot exceed 2000 characters'],
        },
        avatar: {
            url: String,
            key: String,
            publicId: String,
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
            default: 5,
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

testimonialSchema.index({ order: 1, createdAt: -1 });

module.exports = mongoose.model('Testimonial', testimonialSchema);
