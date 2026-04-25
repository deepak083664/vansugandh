const Order = require('../models/Order');
const crypto = require('crypto');
const axios = require('axios'); // Note: ensure axios is installed or just mock it as requested, but user asks for API call

// Mock Courier API Base URL (per requirements)
const COURIER_BASE_URL = 'https://api.indiancouriercompany.com/api/custom';

// @desc    Create new order & trigger courier API
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {
  try {
    const {
      orderItems,
      totalPrice,
      deliveryAddress,
      deliveryPhones,
      paymentMode,
      physicalWeight = 1.0,
      dimensions = '10x10x10'
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    // Generate unique order ID
    const uniqueOrderId = `ORD-${Date.now()}-${crypto.randomBytes(2).toString('hex').toUpperCase()}`;

    // 1. Create order in DB with 'pending' status initially
    const order = new Order({
      user: req.user._id,
      orderItems,
      totalPrice,
      deliveryAddress,
      deliveryPhones,
      paymentMode,
      physicalWeight,
      dimensions,
      orderId: uniqueOrderId,
      status: 'pending' // Default before API call
    });

    const savedOrder = await order.save();

    // 2. Call Courier API
    try {
      // User requested to send these specific fields to Courier API
      const courierPayload = {
        orderId: uniqueOrderId,
        paymentMode,
        deliveryAddress,
        deliveryPhones,
        physicalWeight,
        dimensions,
        products: orderItems.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price
        }))
      };

      // Mocking the axios post call to the requested API endpoint
      /* 
      const courierResponse = await axios.post(`${COURIER_BASE_URL}/createOrder`, courierPayload, {
        headers: {
          email: 'YOUR_EMAIL',
          password: 'YOUR_PASSWORD'
        }
      });
      */
      
      // Since it's a mock URL, we'll simulate a successful response
      const mockCourierResponse = {
        data: {
          success: true,
          shipmentId: `SHIP-${crypto.randomBytes(4).toString('hex').toUpperCase()}`,
          estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000) // 5 days from now
        }
      };

      if (mockCourierResponse.data.success) {
        // Update order with shipment details
        savedOrder.status = 'Order Received';
        savedOrder.shipmentId = mockCourierResponse.data.shipmentId;
        savedOrder.courierName = 'Indian Courier Company';
        savedOrder.estimatedDelivery = mockCourierResponse.data.estimatedDelivery;
        
        savedOrder.trackingEvents = [{
          status: 'Order Placed',
          location: 'Warehouse',
          timestamp: new Date(),
          message: 'Your order has been placed successfully.'
        }];

        await savedOrder.save();
      }

    } catch (apiError) {
      console.error('Courier API Error, falling back:', apiError);
      // Logic Rule: If API fails -> fallback to "Order Received" status
      savedOrder.status = 'Order Received';
      savedOrder.trackingEvents = [{
        status: 'Order Placed',
        location: 'System',
        timestamp: new Date(),
        message: 'Order received. Awaiting courier confirmation.'
      }];
      await savedOrder.save();
    }

    res.status(201).json(savedOrder);

  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ message: 'Failed to create order' });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Get my orders error:', error);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};

// @desc    Track Order
// @route   GET /api/orders/:orderId/track
// @access  Private
const trackOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId, user: req.user._id });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Call Courier Tracking API
    try {
      /*
      const trackingResponse = await axios.post(`${COURIER_BASE_URL}/tracking?orderId=${order.orderId}&phone=${order.deliveryPhones}`);
      */

      // Mocking Tracking Response
      // Depending on time passed, simulate different statuses
      const timeDiffDays = (new Date() - new Date(order.createdAt)) / (1000 * 60 * 60 * 24);
      
      let newStatus = order.status;
      let newTrackingEvents = [...order.trackingEvents];

      // Simulate movement for demo purposes if it's "Order Received"
      if (order.status === 'Order Received') {
        newStatus = 'In Transit';
        newTrackingEvents.push({
          status: 'In Transit',
          location: 'Regional Hub',
          timestamp: new Date(),
          message: 'Package is on the way.'
        });
        
        order.status = newStatus;
        order.trackingEvents = newTrackingEvents;
        await order.save();
      }

      res.json({
        orderId: order.orderId,
        status: order.status,
        trackingEvents: order.trackingEvents,
        estimatedDelivery: order.estimatedDelivery
      });

    } catch (apiError) {
      console.error('Tracking API Error:', apiError);
      // Return cached events from DB
      res.json({
        orderId: order.orderId,
        status: order.status,
        trackingEvents: order.trackingEvents,
        estimatedDelivery: order.estimatedDelivery,
        cached: true
      });
    }

  } catch (error) {
    console.error('Track order error:', error);
    res.status(500).json({ message: 'Failed to track order' });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  trackOrder
};
