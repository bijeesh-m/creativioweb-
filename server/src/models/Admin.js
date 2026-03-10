const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            maxlength: [100, 'Name cannot exceed 100 characters'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            trim: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [8, 'Password must be at least 8 characters'],
            select: false, // Don't include password in queries by default
        },
        role: {
            type: String,
            enum: ['superadmin', 'admin', 'editor'],
            default: 'admin',
        },
        avatar: {
            url: String,
            key: String, // S3 key for deletion
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        refreshTokens: [
            {
                token: String,
                expiresAt: Date,
                createdAt: { type: Date, default: Date.now },
            },
        ],
        lastLogin: Date,
    },
    {
        timestamps: true,
    }
);

// Hash password before saving
adminSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
adminSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

// Clean expired refresh tokens
adminSchema.methods.cleanExpiredTokens = function () {
    this.refreshTokens = this.refreshTokens.filter(
        (rt) => rt.expiresAt > new Date()
    );
};

// Remove sensitive data when converting to JSON
adminSchema.methods.toJSON = function () {
    const admin = this.toObject();
    delete admin.password;
    delete admin.refreshTokens;
    delete admin.__v;
    return admin;
};

module.exports = mongoose.model('Admin', adminSchema);
