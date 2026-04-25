const express = require('express');
const router = express.Router();
const { 
  getProducts, 
  getProductById,
  createProduct, 
  updateProduct, 
  deleteProduct,
  bulkDiscount,
  clearAllDiscounts
} = require('../controllers/productController');

router.route('/').get(getProducts).post(createProduct);
router.post('/bulk-discount', bulkDiscount);
router.post('/clear-discounts', clearAllDiscounts);
router.route('/:id').get(getProductById).put(updateProduct).delete(deleteProduct);

module.exports = router;
