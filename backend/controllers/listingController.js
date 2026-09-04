const Listing = require('../models/Listing');

/**
 * ===============================================================
 * LISTING CONTROLLER (Shared controller with slice ownership)
 * ===============================================================
 * Member B: getListings (GET /api/listings)
 * Member C: updateListingStatus (PATCH /api/listings/:id/status), deleteListing (DELETE /api/listings/:id)
 * Member D: createListing (POST /api/listings)
 * ===============================================================
 */

// ===============================================================
// SLICE: Member B (Browse & Filter Slice)
// ===============================================================
// @desc    Get all listings with optional search & filter
// @route   GET /api/listings?search=&category=&district=
// @access  Public
const getListings = async (req, res) => {
  try {
    const { search, category, district } = req.query;

    const filter = {};

    // Filter by Category
    if (category && category !== 'All') {
      filter.category = category;
    }

    // Filter by District
    if (district && district !== 'All' && district !== 'All Districts') {
      filter.district = district;
    }

    // Search by Crop Name (case-insensitive regex search)
    if (search && search.trim() !== '') {
      filter.cropName = { $regex: search.trim(), $options: 'i' };
    }

    // Fetch listings from MongoDB sorted by newest first
    let listings = await Listing.find(filter).sort({ createdAt: -1 });

    // Auto-seed sample Sri Lankan data if database is empty on initial query
    if (listings.length === 0 && !search && (!category || category === 'All') && (!district || district === 'All Districts')) {
      const count = await Listing.countDocuments();
      if (count === 0) {
        try {
          const { sampleListings, sampleUsers } = require('../seedData');
          const User = require('../models/User');
          const bcrypt = require('bcryptjs');

          let farmer = await User.findOne({ phone: '0771234567' });
          if (!farmer) {
            const password = await bcrypt.hash('password123', 10);
            farmer = await User.create({
              fullName: 'Bandara Senanayake',
              phone: '0771234567',
              password,
              role: 'Farmer',
              district: 'Dambulla',
            });
          }

          const seededData = sampleListings.map((item) => ({
            ...item,
            farmerId: farmer._id,
            farmerName: farmer.fullName,
            farmerPhone: farmer.phone,
          }));

          await Listing.insertMany(seededData);
          listings = await Listing.find(filter).sort({ createdAt: -1 });
        } catch (seedErr) {
          console.warn('Auto-seed check warning:', seedErr.message);
        }
      }
    }

    return res.status(200).json({
      success: true,
      count: listings.length,
      data: listings,
    });

  } catch (error) {
    console.error('getListings error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch harvest listings',
      error: error.message,
    });
  }
};

// @desc    Get single listing by ID
// @route   GET /api/listings/:id
// @access  Public
const getListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ success: false, message: 'Listing not found' });
    }
    return res.status(200).json({ success: true, data: listing });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ===============================================================
// SLICE: Member D (Post Form & Creation Slice)
// ===============================================================
// @desc    Create a new harvest listing
// @route   POST /api/listings
// @access  Private (Farmer only)
const createListing = async (req, res) => {
  try {
    // 1. Verify authenticated user is present (attached by auth middleware)
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: You must be logged in to post a harvest batch',
      });
    }

    const { cropName, category, quantityKg, unitPriceLkr, district } = req.body;

    // 2. Validate required fields with student-friendly error messages (Rubric #5)
    if (!cropName || typeof cropName !== 'string' || !cropName.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid crop name (e.g. Nuwara Eliya Carrots)',
      });
    }

    const validCategories = ['Vegetables', 'Fruits', 'Grains', 'Spices'];
    if (!category || !validCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        message: 'Please select a valid category (Vegetables, Fruits, Grains, or Spices)',
      });
    }

    const parsedQty = Number(quantityKg);
    if (quantityKg === undefined || quantityKg === null || isNaN(parsedQty) || parsedQty < 1) {
      return res.status(400).json({
        success: false,
        message: 'Available quantity must be at least 1 kg',
      });
    }

    const parsedPrice = Number(unitPriceLkr);
    if (unitPriceLkr === undefined || unitPriceLkr === null || isNaN(parsedPrice) || parsedPrice < 1) {
      return res.status(400).json({
        success: false,
        message: 'Wholesale unit price must be at least 1 LKR per kg',
      });
    }

    if (!district || typeof district !== 'string' || !district.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Please specify the production district or region',
      });
    }

    // 3. Extract farmer details from authenticated user session
    const farmerId = req.user._id;
    const farmerName = req.user.fullName || 'Registered Farmer';
    const farmerPhone = req.user.phone || '0770000000';

    // 4. Create new harvest batch document in MongoDB
    const listing = await Listing.create({
      cropName: cropName.trim(),
      category,
      quantityKg: parsedQty,
      unitPriceLkr: parsedPrice,
      district: district.trim(),
      farmerId,
      farmerName,
      farmerPhone,
      status: 'Available',
    });

    return res.status(201).json({
      success: true,
      message: 'Harvest batch published successfully to Agri Lanka marketplace',
      data: listing,
    });
  } catch (error) {
    console.error('createListing error:', error.message);
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Failed to create harvest listing. Please try again later.',
      error: error.message,
    });
  }
};

// ===============================================================
// SLICE: Member C (Card Actions & Status Updates Slice)
// ===============================================================
// @desc    Update listing status (Available <-> Sold)
// @route   PATCH /api/listings/:id/status
// @access  Private (Owner Farmer only)
const updateListingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }

    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).json({ success: false, message: 'Listing not found' });
    }

    if (listing.farmerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You are only authorized to update your own listings',
      });
    }

    if (!['Available', 'Sold'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be either 'Available' or 'Sold'",
      });
    }

    listing.status = status;
    await listing.save();

    return res.status(200).json({ success: true, data: listing });
  } catch (error) {
    console.error('updateListingStatus error:', error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a listing
// @route   DELETE /api/listings/:id
// @access  Private (Owner Farmer only)
const deleteListing = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }

    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).json({ success: false, message: 'Listing not found' });
    }

    if (listing.farmerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You are only authorized to delete your own listings',
      });
    }

    await Listing.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: 'Listing removed successfully',
    });
  } catch (error) {
    console.error('deleteListing error:', error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getListings,
  getListingById,
  createListing,
  updateListingStatus,
  deleteListing,
};
