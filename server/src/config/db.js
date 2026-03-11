const mongoose = require('mongoose');

// Configure DNS to use Google DNS – some ISPs/local networks block SRV records needed for MongoDB Atlas
const dns = require('dns');
try {
    dns.setServers(['8.8.8.8', '8.8.4.4']);
    console.log(process.env.MONGODB_URI);
    console.log('🌐 Using Google DNS for reliable SRV resolution');
} catch (e) {
    console.log('⚠️ Could not set Google DNS, using system default');
}

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000, // Timeout after 5s
            connectTimeoutMS: 10000,
        });
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        console.error('');
        console.error('🔧 Make sure MongoDB is running. Options:');
        console.error('   1. Install MongoDB locally: https://www.mongodb.com/try/download/community');
        console.error('   2. Use MongoDB Atlas (cloud): https://www.mongodb.com/atlas');
        console.error('   3. Update MONGODB_URI in .env with your connection string');
        console.error('');
        process.exit(1);
    }
};

// Handle connection events
mongoose.connection.on('disconnected', () => {
    console.log('⚠️  MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
    console.error(`❌ MongoDB error: ${err.message}`);
});

module.exports = connectDB;
