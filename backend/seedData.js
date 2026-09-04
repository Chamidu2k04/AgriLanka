require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Listing = require('./models/Listing');

/**
 * ===============================================================
 * SEED SCRIPT (Assigned to: Member D - Post Form & Data)
 * ===============================================================
 * Purpose: Populate the MongoDB database with realistic Sri Lankan sample data
 * (Nuwara Eliya, Dambulla, Jaffna, Badulla, Welimada) to satisfy
 * Rubric Requirement 9 ("Relevant sample data").
 * 
 * Run with:
 *   cd backend
 *   npm run seed
 * ===============================================================
 */

const sampleUsers = [
  {
    fullName: 'Bandara Senanayake',
    phone: '0771234567',
    password: 'password123', // Remember to hash or let seed handle it
    role: 'Farmer',
    district: 'Dambulla',
  },
  {
    fullName: 'Kuganathan Nadarajah',
    phone: '0719876543',
    password: 'password123',
    role: 'Farmer',
    district: 'Jaffna',
  },
  {
    fullName: 'Sunil Perera',
    phone: '0751122334',
    password: 'password123',
    role: 'Buyer',
    district: 'Colombo',
  },
];

const sampleListings = [
  {
    cropName: 'Dambulla Red Tomatoes',
    category: 'Vegetables',
    quantityKg: 350,
    unitPriceLkr: 220,
    district: 'Dambulla',
    farmerName: 'Bandara Senanayake',
    farmerPhone: '0771234567',
    status: 'Available',
  },
  {
    cropName: 'Nuwara Eliya Leeks',
    category: 'Vegetables',
    quantityKg: 500,
    unitPriceLkr: 180,
    district: 'Nuwara Eliya',
    farmerName: 'Bandara Senanayake',
    farmerPhone: '0771234567',
    status: 'Available',
  },
  {
    cropName: 'Jaffna Red Onions',
    category: 'Vegetables',
    quantityKg: 400,
    unitPriceLkr: 450,
    district: 'Jaffna',
    farmerName: 'Kuganathan Nadarajah',
    farmerPhone: '0719876543',
    status: 'Available',
  },
  {
    cropName: 'Karthacolomban Mangoes',
    category: 'Fruits',
    quantityKg: 200,
    unitPriceLkr: 350,
    district: 'Jaffna',
    farmerName: 'Kuganathan Nadarajah',
    farmerPhone: '0719876543',
    status: 'Available',
  },
  {
    cropName: 'Matale Ceylon Black Pepper',
    category: 'Spices',
    quantityKg: 75,
    unitPriceLkr: 2400,
    district: 'Matale',
    farmerName: 'Bandara Senanayake',
    farmerPhone: '0771234567',
    status: 'Available',
  },
  {
    cropName: 'Polonnaruwa Samba Rice',
    category: 'Grains',
    quantityKg: 1200,
    unitPriceLkr: 230,
    district: 'Polonnaruwa',
    farmerName: 'Bandara Senanayake',
    farmerPhone: '0771234567',
    status: 'Sold',
  },
];

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/agrilanka';
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB for seeding');

    // TODO: Member D - Insert sampleUsers and sampleListings
    console.log('Sample data ready to be inserted.');
    console.log('TODO (Member D): Clear old data and insert sample users and listings linked with ObjectId.');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error.message);
    process.exit(1);
  }
};

// Uncomment to run directly:
// seedDatabase();

module.exports = { sampleUsers, sampleListings, seedDatabase };
