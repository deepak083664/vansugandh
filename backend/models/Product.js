const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  oldPrice: { type: Number },
  discount: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  image: { type: String },
  images: [{ type: String }],
  tag: { type: String },
  category: { type: String, required: true },
  description: { type: String },
  weight: { type: String },
  origin: { type: String },
  variants: [{
    weight: { type: String, required: true },
    price: { type: Number, required: true },
    oldPrice: { type: Number }
  }],
  isWholesale: { type: Boolean, default: false },
  wholesalePrice: { type: Number },
  minWholesaleQty: { type: Number }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
