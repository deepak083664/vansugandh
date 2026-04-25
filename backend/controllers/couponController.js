const Coupon = require('../models/Coupon');

// Create Coupon
exports.createCoupon = async (req, res) => {
  try {
    const { code, discountType, discountValue, minPurchase, expiryDate } = req.body;
    
    const existing = await Coupon.findOne({ code: code.toUpperCase() });
    if (existing) return res.status(400).json({ message: 'Coupon already exists' });

    const coupon = new Coupon({
      code,
      discountType,
      discountValue,
      minPurchase,
      expiryDate
    });

    await coupon.save();
    res.status(201).json(coupon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all coupons (Admin)
exports.getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.json(coupons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete coupon
exports.deleteCoupon = async (req, res) => {
  try {
    await Coupon.findByIdAndDelete(req.params.id);
    res.json({ message: 'Coupon deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Validate coupon (User)
exports.validateCoupon = async (req, res) => {
  try {
    const { code, totalAmount } = req.body;
    const coupon = await Coupon.findOne({ code: code.toUpperCase(), isActive: true });

    if (!coupon) {
      return res.status(404).json({ message: 'Invalid coupon code' });
    }

    if (new Date() > coupon.expiryDate) {
      return res.status(400).json({ message: 'Coupon has expired' });
    }

    if (totalAmount < coupon.minPurchase) {
      return res.status(400).json({ message: `Minimum purchase of ₹${coupon.minPurchase} required` });
    }

    let discount = 0;
    if (coupon.discountType === 'percentage') {
      discount = (totalAmount * coupon.discountValue) / 100;
    } else {
      discount = coupon.discountValue;
    }

    res.json({
      code: coupon.code,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      discountAmount: discount
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
