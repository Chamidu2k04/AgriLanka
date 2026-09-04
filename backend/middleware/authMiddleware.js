const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * ===============================================================
 * AUTH MIDDLEWARE (Assigned to: Member A - Auth & Role Management)
 * ===============================================================
 * Purpose: Protect routes by verifying JWT in the Authorization header.
 * 
 * Member A Tasks:
 * 1. Extract Bearer token from req.headers.authorization
 *    (e.g., const token = req.headers.authorization?.split(' ')[1])
 * 2. If no token, return 401 Unauthorized ({ message: 'Not authorized, no token provided' })
 * 3. Verify token with jwt.verify(token, process.env.JWT_SECRET)
 * 4. Fetch the user from DB (excluding password: .select('-password')) and attach to req.user
 * 5. Call next() if valid, or catch error and return 401 ({ message: 'Not authorized, token invalid' })
 * ===============================================================
 */
const protect = async (req, res, next) => {
  try {
    let token;

    // Check Authorization header for Bearer token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // If no token was found in the header
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, please log in',
      });
    }

    // Verify token using JWT secret
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'agrilanka_jwt_secret_key_2026'
    );

    // Fetch user from database excluding password field
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User no longer exists or session expired',
      });
    }

    // Attach authenticated user to request object
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error.message);
    return res.status(401).json({
      success: false,
      message: 'Not authorized, token verification failed',
    });
  }
};

module.exports = { protect };
