const express = require('express');
const router = express.Router();
const { createOrder, getMyOrders, trackOrder } = require('../controllers/orderController');
const { protect } = require('../middleware/auth');

router.post('/createOrder', protect, createOrder);
router.get('/myorders', protect, getMyOrders);
router.get('/track-order/:orderId', protect, trackOrder);

module.exports = router;
