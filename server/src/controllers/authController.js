const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// Generate tokens
const generateAccessToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_ACCESS_SECRET, {
        expiresIn: process.env.JWT_ACCESS_EXPIRY || '15m',
    });
};

const generateRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: process.env.JWT_REFRESH_EXPIRY || '7d',
    });
};

// @desc    Login admin
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password',
            });
        }

        // Find admin with password
        const admin = await Admin.findOne({ email }).select('+password +refreshTokens');

        if (!admin) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            });
        }

        if (!admin.isActive) {
            return res.status(403).json({
                success: false,
                message: 'Account has been deactivated',
            });
        }

        // Check password
        const isMatch = await admin.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            });
        }

        // Generate tokens
        const accessToken = generateAccessToken(admin._id);
        const refreshToken = generateRefreshToken(admin._id);

        // Clean expired tokens and add new one
        admin.cleanExpiredTokens();
        admin.refreshTokens.push({
            token: refreshToken,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        });
        admin.lastLogin = new Date();
        await admin.save();

        // Set refresh token as httpOnly cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            path: '/',
        });

        res.status(200).json({
            success: true,
            data: {
                admin: admin.toJSON(),
                accessToken,
            },
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Refresh access token
// @route   POST /api/auth/refresh
// @access  Public (with refresh token cookie)
const refreshAccessToken = async (req, res, next) => {
    try {
        const { refreshToken } = req.cookies;

        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                message: 'No refresh token provided',
            });
        }

        // Verify refresh token
        let decoded;
        try {
            decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        } catch (err) {
            return res.status(401).json({
                success: false,
                message: 'Invalid or expired refresh token',
            });
        }

        // Find admin and verify token exists in DB
        const admin = await Admin.findById(decoded.id).select('+refreshTokens');
        if (!admin) {
            return res.status(401).json({
                success: false,
                message: 'Admin not found',
            });
        }

        const tokenExists = admin.refreshTokens.some(
            (rt) => rt.token === refreshToken && rt.expiresAt > new Date()
        );

        if (!tokenExists) {
            // Token reuse detected - clear all tokens (potential theft)
            admin.refreshTokens = [];
            await admin.save();
            return res.status(401).json({
                success: false,
                message: 'Refresh token reuse detected. All sessions invalidated.',
            });
        }

        // Rotate refresh token
        const newAccessToken = generateAccessToken(admin._id);
        const newRefreshToken = generateRefreshToken(admin._id);

        // Remove old token and add new one
        admin.refreshTokens = admin.refreshTokens.filter(
            (rt) => rt.token !== refreshToken
        );
        admin.cleanExpiredTokens();
        admin.refreshTokens.push({
            token: newRefreshToken,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
        await admin.save();

        // Set new refresh token cookie
        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: '/',
        });

        res.status(200).json({
            success: true,
            data: {
                accessToken: newAccessToken,
            },
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Logout admin
// @route   POST /api/auth/logout
// @access  Private
const logout = async (req, res, next) => {
    try {
        const { refreshToken } = req.cookies;

        if (refreshToken) {
            // Remove the specific refresh token
            const admin = await Admin.findById(req.admin._id).select('+refreshTokens');
            if (admin) {
                admin.refreshTokens = admin.refreshTokens.filter(
                    (rt) => rt.token !== refreshToken
                );
                await admin.save();
            }
        }

        // Clear cookie
        res.cookie('refreshToken', '', {
            httpOnly: true,
            expires: new Date(0),
            path: '/',
        });

        res.status(200).json({
            success: true,
            message: 'Logged out successfully',
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get current admin profile
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res, next) => {
    try {
        const admin = await Admin.findById(req.admin._id);
        res.status(200).json({
            success: true,
            data: admin,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update admin profile
// @route   PUT /api/auth/me
// @access  Private
const updateMe = async (req, res, next) => {
    try {
        const { name, email } = req.body;
        const updateData = {};
        if (name) updateData.name = name;
        if (email) updateData.email = email;

        const admin = await Admin.findByIdAndUpdate(req.admin._id, updateData, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            success: true,
            data: admin,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
const changePassword = async (req, res, next) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: 'Please provide current and new password',
            });
        }

        if (newPassword.length < 8) {
            return res.status(400).json({
                success: false,
                message: 'New password must be at least 8 characters',
            });
        }

        const admin = await Admin.findById(req.admin._id).select('+password');

        const isMatch = await admin.comparePassword(currentPassword);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Current password is incorrect',
            });
        }

        admin.password = newPassword;
        // Invalidate all refresh tokens on password change
        admin.refreshTokens = [];
        await admin.save();

        // Generate new tokens
        const accessToken = generateAccessToken(admin._id);
        const refreshToken = generateRefreshToken(admin._id);

        admin.refreshTokens.push({
            token: refreshToken,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
        await admin.save();

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: '/',
        });

        res.status(200).json({
            success: true,
            message: 'Password changed successfully',
            data: { accessToken },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    login,
    refreshAccessToken,
    logout,
    getMe,
    updateMe,
    changePassword,
};
