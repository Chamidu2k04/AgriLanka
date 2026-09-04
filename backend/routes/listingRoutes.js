const express = require('express');
const router = express.Router();
const {
  getListings,
  getListingById,
  createListing,
  updateListingStatus,
  deleteListing,
} = require('../controllers/listingController');
const { protect } = require('../middleware/authMiddleware');

/**
 * ===============================================================
 * LISTING ROUTES (Shared across Members B, C, D)
 * Base URL: /api/listings
 * ===============================================================
 */

// GET /api/listings - Browse & filter listings (Member B)
router.get('/', getListings);

// GET /api/listings/:id - Get single listing details
router.get('/:id', getListingById);

// POST /api/listings - Create new harvest batch (Member D, Requires Login)
router.post('/', protect, createListing);

// PATCH /api/listings/:id/status - Update Available/Sold status (Member C, Requires Login)
router.patch('/:id/status', protect, updateListingStatus);

// DELETE /api/listings/:id - Delete a listing (Member C, Requires Login)
router.delete('/:id', protect, deleteListing);

module.exports = router;
