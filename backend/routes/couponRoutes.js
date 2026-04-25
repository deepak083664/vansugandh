const express = require('express');
const router = express.Router();
const couponController = require('../controllers/couponController');
const { protect, admin } = require('../middleware/auth');

router.post('/validate', couponController.validateCoupon);
router.post('/', admin, couponController.createCoupon);
router.get('/', admin, couponController.getCoupons);
router.delete('/:id', admin, couponController.deleteCoupon);

module.exports = router;
