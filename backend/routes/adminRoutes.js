const express = require('express');
const router = express.Router();
const { getStats, getRevenueAnalytics, getOrders, getUsers } = require('../controllers/adminController');

// @desc    Admin login (Existing)
router.post('/login', (req, res) => {
  const { password } = req.body;
  if (password === 'Vansugandh9955171746') {
    res.json({ success: true, token: 'admin_token_123', message: 'Admin logged in successfully' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid Admin Credentials' });
  }
});

// @desc    Advanced Dashboard Analytics
router.get('/stats', getStats);
router.get('/analytics/revenue', getRevenueAnalytics);

// @desc    User & Order Management
router.get('/orders', getOrders);
router.get('/users', getUsers);

module.exports = router;
