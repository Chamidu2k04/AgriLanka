const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

/**
 * ===============================================================
 * AUTH ROUTES (Assigned to: Member A)
 * Base URL: /api/auth
 * ===============================================================
 */

// POST /api/auth/register - Register a new Farmer or Buyer
router.post('/register', register);

// POST /api/auth/login - Authenticate existing user
router.post('/login', login);

// GET /api/auth/me - Get current user profile (requires valid JWT)
router.get('/me', protect, getMe);

module.exports = router;
