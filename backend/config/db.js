const mongoose = require('mongoose');

/**
 * Connect to MongoDB database
 * Reuses existing active connection for serverless / Vercel execution.
 */
const connectDB = async () => {
  // If connection is already open, skip reconnect
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }

  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/agrilanka';
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.warn('⚠️  Continuing without active DB connection. Verify MONGO_URI in environment variables.');
  }
};

module.exports = connectDB;

