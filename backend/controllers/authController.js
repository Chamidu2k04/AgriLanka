const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * ===============================================================
 * AUTH CONTROLLER (Assigned to: Member A - Auth & Role Management)
 * ===============================================================
 * 
 * Member A Tasks:
 * 1. registerUser:
 *    - Extract { fullName, phone, password, role, district } from req.body
 *    - Validate inputs (10-digit phone regex, password length >= 6)
 *    - Check if user with phone already exists (400 if exists)
 *    - Hash password with bcrypt.hash(password, 10)
 *    - Create and save new User document
 *    - Generate JWT token (jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' }))
 *    - Return 201 with { token, user: { _id, fullName, phone, role, district } }
 * 
 * 2. loginUser:
 *    - Extract { phone, password } from req.body
 *    - Validate phone and password provided
 *    - Find user by phone number
 *    - Check password match using bcrypt.compare(password, user.password)
 *    - If mismatch or user not found, return 401 ({ message: 'Invalid phone or password' })
 *    - Generate JWT token
 *    - Return 200 with { token, user: { _id, fullName, phone, role, district } }
 * ===============================================================
 */

// @desc    Register a new user (Farmer or Buyer)
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
  try {
    const { fullName, phone, password, role, district } = req.body;

    // TODO: Member A - Implement user registration logic here
    console.log('Registration request received:', { fullName, phone, role, district });

    return res.status(501).json({
      success: false,
      message: 'TODO (Member A): Implement user registration in controllers/authController.js',
      receivedData: { fullName, phone, role, district },
    });
  } catch (error) {
    console.error('Register error:', error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { phone, password } = req.body;

    // TODO: Member A - Implement user login logic here
    console.log('Login request received for phone:', phone);

    return res.status(501).json({
      success: false,
      message: 'TODO (Member A): Implement user login in controllers/authController.js',
      receivedPhone: phone,
    });
  } catch (error) {
    console.error('Login error:', error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get current logged in user profile (Optional Helper)
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    // req.user is set by authMiddleware
    return res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  register,
  login,
  getMe,
};
