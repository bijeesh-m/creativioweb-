const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const path = require('path');

// Import routes
const authRoutes = require('./routes/authRoutes');
const workRoutes = require('./routes/workRoutes');
const clientRoutes = require('./routes/clientRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const settingRoutes = require('./routes/settingRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const teamRoutes = require('./routes/teamRoutes');

// Import middleware
const errorHandler = require('./middleware/errorHandler');

const app = express();

// ===================== Security Middleware =====================

// Helmet - secure HTTP headers
app.use(
    helmet({
        crossOriginResourcePolicy: { policy: 'cross-origin' },
        contentSecurityPolicy: false, // Allow CDN resources
    })
);

// CORS configuration
app.use(
    cors({
        origin: [
            process.env.CLIENT_URL || 'http://localhost:3000',
            process.env.ADMIN_URL || 'http://localhost:3000',
        ],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);

// Global rate limiter
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200, // 200 requests per window
    message: {
        success: false,
        message: 'Too many requests. Please try again later.',
    },
    standardHeaders: true,
    legacyHeaders: false,
});
app.use('/api/', globalLimiter);

// ===================== Body Parsers =====================
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));
app.use(cookieParser());

// ===================== Logging =====================
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('combined'));
}

// ===================== Static Files =====================
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// ===================== API Routes =====================
app.use('/api/auth', authRoutes);
app.use('/api/works', workRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/admin/dashboard', dashboardRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/team', teamRoutes);

// ===================== Health Check =====================
app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Creativio API is running',
        environment: process.env.NODE_ENV,
        timestamp: new Date().toISOString(),
    });
});

// ===================== 404 Handler =====================
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`,
    });
});

// ===================== Error Handler =====================
app.use(errorHandler);

module.exports = app;
