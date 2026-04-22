const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const path = require('path');
const cookieParser = require('cookie-parser');
const passport = require('passport');
require('./config/passport');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes'); // New admin routes
const uploadRoutes = require('./routes/uploadRoutes'); // New upload routes
const categoryRoutes = require('./routes/categoryRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes); // Mount admin routes
app.use('/api/upload', uploadRoutes); // Mount upload routes
app.use('/api/categories', categoryRoutes);

app.get('/', (req, res) => {
  res.send('VANSUGANDH API is running...');
});

// Database Connection & Server Start
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Database connection failed', err);
    process.exit(1);
  });
