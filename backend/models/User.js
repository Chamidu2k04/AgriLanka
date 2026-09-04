const mongoose = require('mongoose');

/**
 * ===============================================================
 * USER MODEL (Assigned to: Member A - Auth & Role Management)
 * Student ID: IT24101966
 * ===============================================================
 * Data Model Requirements:
 * - fullName: String, Required, trimmed
 * - phone: String, Required, unique, regex: /^[0-9]{10}$/ (10-digit Sri Lankan phone)
 * - password: String, Required, hashed using bcryptjs (min length: 6)
 * - role: String, Enum: ['Farmer', 'Buyer'], default: 'Farmer'
 * - district: String, Required, trimmed
 * ===============================================================
 */

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      unique: true,
      trim: true,
      match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit Sri Lankan phone number (e.g. 0771234567)'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
    },
    role: {
      type: String,
      enum: {
        values: ['Farmer', 'Buyer'],
        message: 'Role must be either Farmer or Buyer',
      },
      default: 'Farmer',
    },
    district: {
      type: String,
      required: [true, 'District is required'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
