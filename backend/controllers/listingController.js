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

    /**
     * TODO: Member B Tasks:
     * 1. Build a filter object: const filter = {};
     * 2. If `category` provided (and not 'All'): filter.category = category;
     * 3. If `district` provided (and not 'All'): filter.district = district;
     * 4. If `search` provided: use regex search on cropName (e.g. { cropName: { $regex: search, $options: 'i' } })
     * 5. Fetch listings from DB sorted by newest: await Listing.find(filter).sort({ createdAt: -1 });
     * 6. Return res.status(200).json({ success: true, count: listings.length, data: listings });
     */

    console.log('Member B - getListings called with query:', { search, category, district });

    return res.status(501).json({
      success: false,
      message: 'TODO (Member B): Implement getListings with filters in controllers/listingController.js',
      filtersReceived: { search, category, district },
    });
  } catch (error) {
    console.error('getListings error:', error.message);
    return res.status(500).json({ success: false, message: error.message });
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

    /**
     * TODO: Member C Tasks:
     * 1. Find the listing: const listing = await Listing.findById(id);
     * 2. If not found, return 404
     * 3. Check ownership: if (listing.farmerId.toString() !== req.user._id.toString()) return 403 Forbidden
     * 4. Validate status is 'Available' or 'Sold'
     * 5. Update listing.status = status; await listing.save();
     * 6. Return res.status(200).json({ success: true, data: listing });
     */

    console.log('Member C - updateListingStatus called for ID:', id, 'status:', status);

    return res.status(501).json({
      success: false,
      message: 'TODO (Member C): Implement updateListingStatus in controllers/listingController.js',
      listingId: id,
      newStatus: status,
    });
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

    /**
     * TODO: Member C Tasks:
     * 1. Find listing: const listing = await Listing.findById(id);
     * 2. If not found, return 404
     * 3. Check ownership: if (listing.farmerId.toString() !== req.user._id.toString()) return 403 Forbidden
     * 4. Delete: await Listing.findByIdAndDelete(id);
     * 5. Return res.status(200).json({ success: true, message: 'Listing removed successfully' });
     */

    console.log('Member C - deleteListing called for ID:', id);

    return res.status(501).json({
      success: false,
      message: 'TODO (Member C): Implement deleteListing in controllers/listingController.js',
      listingId: id,
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
