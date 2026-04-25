const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orderItems: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      image: { type: String, required: true },
      price: { type: Number, required: true },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      }
    }
  ],
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  status: {
    type: String,
    required: true,
    default: 'pending' // 'pending', 'shipped', 'delivered'
  },
  isPaid: {
    type: Boolean,
    default: false
  },
  paidAt: {
    type: Date
  },
  // Delivery Partner System Fields
  orderId: {
    type: String,
    unique: true,
    required: true
  },
  shipmentId: {
    type: String
  },
  courierName: {
    type: String
  },
  paymentMode: {
    type: String,
    enum: ['COD', 'Prepaid'],
    default: 'COD'
  },
  deliveryAddress: {
    type: String,
    required: true
  },
  deliveryPhones: {
    type: String,
    required: true
  },
  physicalWeight: {
    type: Number,
    default: 1.0 // default 1kg
  },
  dimensions: {
    type: String,
    default: '10x10x10'
  },
  trackingEvents: [{
    status: String,
    location: String,
    timestamp: Date,
    message: String
  }],
  estimatedDelivery: {
    type: Date
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
