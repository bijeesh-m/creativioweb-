const Work = require('../models/Work');
const Client = require('../models/Client');
const Testimonial = require('../models/Testimonial');
const Service = require('../models/Service');

// @desc    Get dashboard stats
// @route   GET /api/admin/dashboard
// @access  Private
const getDashboardStats = async (req, res, next) => {
    try {
        const [
            totalWorks,
            publishedWorks,
            featuredWorks,
            totalClients,
            totalTestimonials,
            totalServices,
            recentWorks,
            recentTestimonials,
        ] = await Promise.all([
            Work.countDocuments(),
            Work.countDocuments({ isPublished: true }),
            Work.countDocuments({ featured: true }),
            Client.countDocuments({ isActive: true }),
            Testimonial.countDocuments({ isPublished: true }),
            Service.countDocuments({ isPublished: true }),
            Work.find().sort({ createdAt: -1 }).limit(5).select('title slug image createdAt'),
            Testimonial.find()
                .sort({ createdAt: -1 })
                .limit(5)
                .select('clientName company rating createdAt'),
        ]);

        res.status(200).json({
            success: true,
            data: {
                stats: {
                    totalWorks,
                    publishedWorks,
                    featuredWorks,
                    totalClients,
                    totalTestimonials,
                    totalServices,
                },
                recentWorks,
                recentTestimonials,
            },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getDashboardStats,
};
