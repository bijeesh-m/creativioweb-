require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const mongoose = require('mongoose');

// Configure DNS for reliable SRV resolution
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const Admin = require('../models/Admin');
const Category = require('../models/Category');
const SiteSetting = require('../models/SiteSetting');

const seedDatabase = async () => {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Seed Admin
        console.log('🔍 Checking Admin user...');
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@creativio.in';
        const existingAdmin = await Admin.findOne({ email: adminEmail });

        if (!existingAdmin) {
            console.log('📝 Creating new admin user...');
            await Admin.create({
                name: process.env.ADMIN_NAME || 'Super Admin',
                email: adminEmail,
                password: process.env.ADMIN_PASSWORD || 'Admin@123456',
                role: 'superadmin',
            });
            console.log('✅ Admin user created');
        } else {
            console.log('ℹ️  Admin user already exists');
        }

        // Seed Categories
        console.log('🔍 Seeding categories...');
        const defaultCategories = [
            { name: 'All Projects', order: 0 },
            { name: 'Digital Marketing', order: 1 },
            { name: 'Performance Marketing', order: 2 },
            { name: 'Branding', order: 3 },
            { name: 'Video Production', order: 4 },
            { name: 'CGI and 3D Animation', order: 5 },
            { name: 'Web Development', order: 6 },
        ];

        for (const cat of defaultCategories) {
            console.log('   - Processing:', cat.name);
            await Category.findOneAndUpdate(
                { name: cat.name },
                cat,
                { upsert: true, new: true }
            );
        }
        console.log('✅ Categories seeded');

        // Seed Default Settings
        console.log('🔍 Seeding site settings...');
        const defaultSettings = [
            { key: 'site_name', value: 'Creativio', type: 'text', group: 'general', label: 'Site Name' },
            { key: 'site_tagline', value: 'Creative Digital Agency', type: 'text', group: 'general', label: 'Tagline' },
            { key: 'contact_email', value: 'hello@creativio.in', type: 'text', group: 'contact', label: 'Contact Email' },
            { key: 'contact_phone', value: '+91 9876543210', type: 'text', group: 'contact', label: 'Contact Phone' },
            { key: 'address', value: 'Calicut, Kerala, India', type: 'textarea', group: 'contact', label: 'Address' },
            { key: 'social_instagram', value: 'https://instagram.com/creativio', type: 'url', group: 'social', label: 'Instagram' },
            { key: 'social_linkedin', value: 'https://linkedin.com/company/creativio', type: 'url', group: 'social', label: 'LinkedIn' },
            { key: 'social_twitter', value: 'https://twitter.com/creativio', type: 'url', group: 'social', label: 'Twitter/X' },
            { key: 'social_behance', value: 'https://behance.net/creativio', type: 'url', group: 'social', label: 'Behance' },
            { key: 'hero_title', value: 'We Craft Digital Experiences', type: 'text', group: 'hero', label: 'Hero Title' },
            { key: 'hero_subtitle', value: 'Where Creativity Meets Strategy', type: 'text', group: 'hero', label: 'Hero Subtitle' },
            { key: 'seo_title', value: 'Creativio - Best Digital Marketing Agency in Calicut & Malappuram', type: 'text', group: 'seo', label: 'SEO Title' },
            { key: 'seo_description', value: 'Creativio is a premium digital marketing agency in Calicut and Malappuram offering branding, web development, performance marketing, video production, and CGI services.', type: 'textarea', group: 'seo', label: 'SEO Description' }
        ];

        for (const setting of defaultSettings) {
            await SiteSetting.findOneAndUpdate(
                { key: setting.key },
                setting,
                { upsert: true, new: true }
            );
        }
        console.log('✅ Site settings seeded');

        console.log('\n🎉 Database seeded successfully!');
        console.log(`   Admin: ${adminEmail}`);
        console.log('   Password: [as defined in .env]');

        process.exit(0);
    } catch (error) {
        console.error('❌ SEED ERROR:', error.message);
        console.error(error.stack);
        process.exit(1);
    }
};

seedDatabase();
