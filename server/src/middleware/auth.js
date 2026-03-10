const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// Verify JWT access token
const protect = async (req, res, next) => {
    try {
        let token;

        // Check Authorization header
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized - No token provided',
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

        // Get admin from token
        const admin = await Admin.findById(decoded.id).select('-refreshTokens');

        if (!admin) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized - Admin not found',
            });
        }

        if (!admin.isActive) {
            return res.status(403).json({
                success: false,
                message: 'Account has been deactivated',
            });
        }

        req.admin = admin;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token expired',
                code: 'TOKEN_EXPIRED',
            });
        }
        return res.status(401).json({
            success: false,
            message: 'Not authorized - Invalid token',
        });
    }
};

// Role-based access
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.admin.role)) {
            return res.status(403).json({
                success: false,
                message: `Role '${req.admin.role}' is not authorized for this action`,
            });
        }
        next();
    };
};

module.exports = { protect, authorize };
