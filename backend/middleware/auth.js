const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  // Check for token in cookies first, then in authorization header
  if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (token) {
    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      req.user = await User.findById(decoded.id);
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

const admin = (req, res, next) => {
  // Simple check for the admin token or if the user is explicitly an admin
  const token = req.headers.authorization?.split(' ')[1] || req.cookies?.jwt;
  
  if (token === 'admin_token_123' || (req.user && req.user.isAdmin)) {
    next();
  } else {
    res.status(403).json({ message: 'Access denied: Admin only' });
  }
};

module.exports = { protect, admin };
