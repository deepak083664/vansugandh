const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Google auth callback & token generation
// @route   GET /api/auth/google/callback
// @access  Public
const googleCallback = (req, res) => {
  // Successful authentication, generate token
  const token = generateToken(req.user._id);

  // Set HTTP-only cookie
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
  });

  // Redirect to frontend
  res.redirect(process.env.FRONTEND_URL || 'http://localhost:5173');
};

// @desc    Logout user / clear cookie
// @route   GET /api/auth/logout
// @access  Public
const logoutUser = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Get logged in user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

module.exports = {
  googleCallback,
  logoutUser,
  getMe,
};
