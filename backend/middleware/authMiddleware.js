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

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, no token provided',
      });
    }

    // TODO: Member A - Verify JWT token and attach user to req.user
    // Example:
    // const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_super_secret_jwt_key_agrilanka_2026');
    // req.user = await User.findById(decoded.id).select('-password');
    // next();

    // TEMPORARY STUB (so routes don't crash before Member A finishes):
    return res.status(501).json({
      success: false,
      message: 'TODO (Member A): Implement JWT verification in middleware/authMiddleware.js',
    });
  } catch (error) {
    console.error('Auth middleware error:', error.message);
    return res.status(401).json({
      success: false,
      message: 'Not authorized, token verification failed',
    });
  }
};

module.exports = { protect };
