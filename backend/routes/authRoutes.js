const express = require('express');
const passport = require('passport');
const router = express.Router();
const { logoutUser, getMe, googleCallback } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// Google Auth Route
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false, prompt: 'select_account' }));

// Google Auth Callback
router.get('/google/callback', passport.authenticate('google', { session: false, failureRedirect: `${process.env.FRONTEND_URL}/login` }), googleCallback);

// Logout
router.get('/logout', logoutUser);

// Get current user
router.get('/me', protect, getMe);

module.exports = router;
