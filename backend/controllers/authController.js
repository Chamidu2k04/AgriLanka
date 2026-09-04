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

// Helper function to generate JWT Token
const generateToken = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET || 'agrilanka_jwt_secret_key_2026',
    { expiresIn: '7d' }
  );
};

// @desc    Register a new user (Farmer or Buyer)
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
  try {
    const { fullName, phone, password, role, district } = req.body;

    // 1. Validate required fields
    if (!fullName || !phone || !password || !district) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields (full name, phone, password, and district)',
      });
    }

    // 2. Validate Sri Lankan 10-digit phone format (e.g., 0771234567)
    const phoneRegex = /^[0-9]{10}$/;
    const trimmedPhone = phone.trim();
    if (!phoneRegex.test(trimmedPhone)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid 10-digit Sri Lankan phone number (e.g. 0771234567)',
      });
    }

    // 3. Validate password length (min 6 characters)
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long',
      });
    }

    // 4. Validate user role ('Farmer' or 'Buyer')
    const assignedRole = role === 'Buyer' ? 'Buyer' : 'Farmer';

    // 5. Check if phone number is already registered
    const existingUser = await User.findOne({ phone: trimmedPhone });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Phone number is already registered. Please sign in instead.',
      });
    }

    // 6. Hash password with bcryptjs (salt rounds: 10)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 7. Create new user document in MongoDB
    const user = await User.create({
      fullName: fullName.trim(),
      phone: trimmedPhone,
      password: hashedPassword,
      role: assignedRole,
      district: district.trim(),
    });

    // 8. Generate JWT token
    const token = generateToken(user._id, user.role);

    // 9. Send success response (excluding password hash)
    return res.status(201).json({
      success: true,
      token,
      user: {
        _id: user._id,
        fullName: user.fullName,
        phone: user.phone,
        role: user.role,
        district: user.district,
      },
    });
  } catch (error) {
    console.error('Register error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server error during registration. Please try again.',
      error: error.message,
    });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { phone, password } = req.body;

    // 1. Check if both phone and password are provided
    if (!phone || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both phone number and password',
      });
    }

    const trimmedPhone = phone.trim();

    // 2. Find user by phone number
    const user = await User.findOne({ phone: trimmedPhone });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid phone number or password',
      });
    }

    // 3. Compare input password with hashed password in database
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid phone number or password',
      });
    }

    // 4. Generate JWT token
    const token = generateToken(user._id, user.role);

    // 5. Send success response
    return res.status(200).json({
      success: true,
      token,
      user: {
        _id: user._id,
        fullName: user.fullName,
        phone: user.phone,
        role: user.role,
        district: user.district,
      },
    });
  } catch (error) {
    console.error('Login error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server error during login. Please try again.',
      error: error.message,
    });
  }
};

// @desc    Get current logged in user profile (Helper)
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
