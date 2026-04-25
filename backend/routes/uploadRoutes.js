const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'vansugandh_products',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 1000, height: 1250, crop: 'limit' }] // Optional: limit size
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 1024 * 1024 } // 1MB limit
});

// @desc    Upload multiple images to Cloudinary
// @route   POST /api/upload
// @access  Admin
router.post('/', upload.array('images', 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'No files uploaded' });
  }

  // Cloudinary returns the full secure URL in path or secure_url
  const filePaths = req.files.map(file => file.path);
  res.json({
    message: 'Images uploaded successfully to Cloudinary',
    filePaths: filePaths
  });
});

module.exports = router;
