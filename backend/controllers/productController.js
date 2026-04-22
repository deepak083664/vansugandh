const Product = require('../models/Product');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error fetching products' });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error fetching product' });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Admin
const createProduct = async (req, res) => {
  try {
    const { 
      name, price, oldPrice, rating, image, images, tag, category, 
      description, weight, origin, isWholesale, wholesalePrice, minWholesaleQty 
    } = req.body;
    
    const product = new Product({
      name, price, oldPrice, rating, image, images, tag, category, 
      description, weight, origin, isWholesale, wholesalePrice, minWholesaleQty
    });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server Error creating product' });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Admin
const updateProduct = async (req, res) => {
  try {
    const { 
      name, price, oldPrice, rating, image, images, tag, category, 
      description, weight, origin, isWholesale, wholesalePrice, minWholesaleQty 
    } = req.body;
    
    const product = await Product.findById(req.params.id);
    
    if (product) {
      if (name !== undefined) product.name = name;
      if (price !== undefined) product.price = price;
      if (oldPrice !== undefined) product.oldPrice = oldPrice;
      if (rating !== undefined) product.rating = rating;
      if (image !== undefined) product.image = image;
      if (images !== undefined) product.images = images;
      if (tag !== undefined) product.tag = tag;
      if (category !== undefined) product.category = category;
      if (description !== undefined) product.description = description;
      if (weight !== undefined) product.weight = weight;
      if (origin !== undefined) product.origin = origin;
      if (isWholesale !== undefined) product.isWholesale = isWholesale;
      if (wholesalePrice !== undefined) product.wholesalePrice = wholesalePrice;
      if (minWholesaleQty !== undefined) product.minWholesaleQty = minWholesaleQty;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error updating product' });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Admin
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.deleteOne();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error deleting product' });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
