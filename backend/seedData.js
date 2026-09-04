require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Listing = require('./models/Listing');

/**
 * ===============================================================
 * SEED SCRIPT (Assigned to: Member D - Post Form & Data)
 * ===============================================================
 * Purpose: Populate MongoDB with realistic Sri Lankan harvest listings
 * and test accounts across Dambulla, Nuwara Eliya, Jaffna, Matale,
 * and Polonnaruwa to satisfy Rubric #9 ("Relevant sample data").
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
    password: 'password123',
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
    console.log('Connecting to MongoDB at:', mongoUri.includes('@') ? mongoUri.split('@')[1] : mongoUri);
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB for seeding');

    // 1. Clear existing database collections
    console.log('🧹 Clearing existing Users and Listings...');
    await User.deleteMany({});
    await Listing.deleteMany({});

    // 2. Hash passwords with bcryptjs for seamless authentication login (Member A)
    console.log('🔐 Hashing user credentials and inserting sample users...');
    const hashedUsers = await Promise.all(
      sampleUsers.map(async (u) => {
        const hashedPassword = await bcrypt.hash(u.password, 10);
        return {
          ...u,
          password: hashedPassword,
        };
      })
    );
    const createdUsers = await User.insertMany(hashedUsers);
    console.log(`✅ Created ${createdUsers.length} test user accounts (2 Farmers, 1 Buyer)`);

    // 3. Map farmer MongoDB ObjectIDs to sample harvest listings
    const bandara = createdUsers.find((u) => u.phone === '0771234567');
    const kugan = createdUsers.find((u) => u.phone === '0719876543');

    const listingsWithFarmerIds = sampleListings.map((item) => {
      const assignedFarmer = item.farmerPhone === '0719876543' ? kugan : bandara;
      return {
        ...item,
        farmerId: assignedFarmer._id,
        farmerName: assignedFarmer.fullName,
        farmerPhone: assignedFarmer.phone,
      };
    });

    // 4. Insert realistic Sri Lankan harvest batches
    console.log('🌾 Inserting Sri Lankan harvest surplus batches...');
    const createdListings = await Listing.insertMany(listingsWithFarmerIds);
    console.log(`✅ Successfully seeded ${createdListings.length} harvest listings across Sri Lanka:`);
    createdListings.forEach((item, index) => {
      console.log(`   ${index + 1}. [${item.category}] ${item.cropName} - ${item.quantityKg}kg @ Rs.${item.unitPriceLkr}/kg (${item.district}) [${item.status}]`);
    });

    console.log('\n🎉 Database seeding completed successfully! Ready for demo evaluation.');
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error.message);
    try {
      await mongoose.connection.close();
    } catch (_) {}
    process.exit(1);
  }
};

// Run directly when executed via node seedData.js / npm run seed
if (require.main === module) {
  seedDatabase();
}

module.exports = { sampleUsers, sampleListings, seedDatabase };
