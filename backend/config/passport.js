const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if user exists by email
      const email = profile.emails[0].value;
      let user = await User.findOne({ email });

      if (user) {
        // Update Google ID and Avatar if they login via Google but were created differently
        if (!user.googleId) {
          user.googleId = profile.id;
          user.avatar = profile.photos[0]?.value;
          await user.save();
        }
        return done(null, user);
      }

      // If user doesn't exist, create new user
      user = await User.create({
        name: profile.displayName,
        email: email,
        googleId: profile.id,
        avatar: profile.photos[0]?.value || ''
      });

      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }
));

module.exports = passport;
