const mongoose = require('mongoose');
const slugify = require('slugify');

const workSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Work title is required'],
            trim: true,
            maxlength: [200, 'Title cannot exceed 200 characters'],
        },
        slug: {
            type: String,
            unique: true,
            index: true,
        },
        categories: {
            type: [String],
            required: [true, 'At least one category is required'],
            validate: {
                validator: (v) => v.length > 0,
                message: 'At least one category is required',
            },
        },
        tags: {
            type: String,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
            maxlength: [2000, 'Description cannot exceed 2000 characters'],
        },
        client: {
            type: String,
            trim: true,
        },
        image: {
            url: { type: String, required: [true, 'Image is required'] },
            key: String, // S3 key
            publicId: String, // Cloudinary public ID
        },
        gallery: [
            {
                url: String,
                key: String,
                publicId: String,
                caption: String,
            },
        ],
        tall: {
            type: Boolean,
            default: false,
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
        services: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Service',
            },
        ],
    },
    {
        timestamps: true,
    }
);

// Auto-generate slug from title
workSchema.pre('save', function (next) {
    if (this.isModified('title')) {
        this.slug = slugify(this.title, { lower: true, strict: true });
    }
    next();
});

// Ensure "All Projects" is always in categories
workSchema.pre('save', function (next) {
    if (!this.categories.includes('All Projects')) {
        this.categories.unshift('All Projects');
    }
    next();
});

// Index for efficient querying
workSchema.index({ order: 1, createdAt: -1 });
workSchema.index({ categories: 1 });

module.exports = mongoose.model('Work', workSchema);
