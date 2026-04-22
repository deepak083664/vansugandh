const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');

// @desc    Get all dashboard stats
// @route   GET /api/admin/stats
exports.getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();
    
    const revenueData = await Order.aggregate([
      { $match: { isPaid: true } },
      { $group: { _id: null, totalRevenue: { $sum: "$totalPrice" } } }
    ]);
    
    const totalRevenue = revenueData.length > 0 ? revenueData[0].totalRevenue : 0;

    const recentOrders = await Order.find()
      .populate('user', 'name')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalUsers,
      totalOrders,
      totalProducts,
      totalRevenue,
      recentOrders
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get monthly revenue analytics
// @route   GET /api/admin/analytics/revenue
exports.getRevenueAnalytics = async (req, res) => {
  try {
    const revenue = await Order.aggregate([
      { $match: { isPaid: true } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          amount: { $sum: "$totalPrice" },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } },
      { $limit: 12 }
    ]);
    res.json(revenue);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get all orders with filtering
// @route   GET /api/admin/orders
exports.getOrders = async (req, res) => {
  try {
    const status = req.query.status;
    const filter = status ? { status } : {};
    const orders = await Order.find(filter)
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get all users
// @route   GET /api/admin/users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
