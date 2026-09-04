const mongoose = require('mongoose');

/**
 * ===============================================================
 * LISTING MODEL (Used by: Member B, C, D)
 * ===============================================================
 * Data Model Requirements (from README Section 6):
 * - cropName: String, Required, trimmed
 * - category: Enum: ['Vegetables', 'Fruits', 'Grains', 'Spices'], required
 * - quantityKg: Number, Required, min: 1
 * - unitPriceLkr: Number, Required, min: 1
 * - farmerId: ObjectId reference to User model, required
 * - farmerName: String (denormalized for display performance)
 * - farmerPhone: String (denormalized for direct buyer contact)
 * - district: String, Required
 * - status: Enum: ['Available', 'Sold'], default: 'Available'
 * - harvestDate: Date, Default: Date.now
 * ===============================================================
 */

const listingSchema = new mongoose.Schema(
  {
    cropName: {
      type: String,
      required: [true, 'Crop name is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: {
        values: ['Vegetables', 'Fruits', 'Grains', 'Spices'],
        message: 'Category must be Vegetables, Fruits, Grains, or Spices',
      },
    },
    quantityKg: {
      type: Number,
      required: [true, 'Quantity in kg is required'],
      min: [1, 'Quantity must be at least 1 kg'],
    },
    unitPriceLkr: {
      type: Number,
      required: [true, 'Unit price in LKR is required'],
      min: [1, 'Unit price must be at least 1 LKR'],
    },
    farmerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Farmer ID is required'],
    },
    farmerName: {
      type: String,
      required: [true, 'Farmer name is required'],
      trim: true,
    },
    farmerPhone: {
      type: String,
      required: [true, 'Farmer phone is required'],
      trim: true,
    },
    district: {
      type: String,
      required: [true, 'District is required'],
      trim: true,
    },
    status: {
      type: String,
      enum: {
        values: ['Available', 'Sold'],
        message: 'Status must be either Available or Sold',
      },
      default: 'Available',
    },
    harvestDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Listing', listingSchema);
