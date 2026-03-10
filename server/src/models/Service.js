const mongoose = require('mongoose');
const slugify = require('slugify');

const packageSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    price: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    features: [String],
});

const serviceSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Service title is required'],
            trim: true,
            maxlength: [200, 'Title cannot exceed 200 characters'],
        },
        slug: {
            type: String,
            unique: true,
            index: true,
        },
        shortDescription: {
            type: String,
            required: [true, 'Short description is required'],
            trim: true,
            maxlength: [500, 'Short description cannot exceed 500 characters'],
        },
        fullDescription: {
            type: String,
            trim: true,
            maxlength: [5000, 'Full description cannot exceed 5000 characters'],
        },
        features: {
            type: [String],
            default: [],
        },
        benefits: {
            type: [String],
            default: [],
        },
        image: {
            url: String,
            key: String,
            publicId: String,
        },
        heroImage: {
            url: String,
            key: String,
            publicId: String,
        },
        imageLeft: {
            type: Boolean,
            default: true,
        },
        packages: [packageSchema],
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

serviceSchema.pre('save', function (next) {
    if (this.isModified('title')) {
        this.slug = slugify(this.title, { lower: true, strict: true });
    }
    next();
});

serviceSchema.index({ order: 1, createdAt: -1 });

module.exports = mongoose.model('Service', serviceSchema);
