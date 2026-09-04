const mongoose = require('mongoose');

/**
 * Connect to MongoDB database
 * Student Tip: Ensure your MONGO_URI in .env is set properly before starting the server.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/agrilanka');
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    // Do not exit process in development if Mongo is not running yet,
    // so students can still run the server and test health check routes.
    console.warn('⚠️  Continuing without active DB connection. Set MONGO_URI in .env to connect to your database.');
  }
};

module.exports = connectDB;
