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
    const { cropName, category, quantityKg, unitPriceLkr, district } = req.body;

    /**
     * TODO: Member D Tasks:
     * 1. Validate required fields: cropName, category, quantityKg, unitPriceLkr, district
     * 2. Extract authenticated farmer data from req.user (set by Member A's authMiddleware):
     *    const farmerId = req.user._id;
     *    const farmerName = req.user.fullName;
     *    const farmerPhone = req.user.phone;
     * 3. (Optional rule): Ensure req.user.role === 'Farmer'
     * 4. Create new listing document in MongoDB:
     *    const listing = await Listing.create({ cropName, category, quantityKg, unitPriceLkr, district, farmerId, farmerName, farmerPhone });
     * 5. Return res.status(201).json({ success: true, data: listing });
     */

    console.log('Member D - createListing called with body:', req.body);

    return res.status(501).json({
      success: false,
      message: 'TODO (Member D): Implement createListing in controllers/listingController.js',
      receivedData: req.body,
    });
  } catch (error) {
    console.error('createListing error:', error.message);
    return res.status(500).json({ success: false, message: error.message });
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
