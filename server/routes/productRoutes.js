const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const authMiddleware = require('../middlewares/authMiddleware');

// Get all products
router.get('/', productsController.getProducts);

// Get a single product by ID
router.get('/:productId', productsController.getProductById);

// Add a new product (assuming the user is a seller)
router.post('/', productsController.createProduct);
router.post('/products', authMiddleware.authenticate, authMiddleware.authorize(['Seller', 'Admin']), productsController.createProduct);

// Update an existing product (assuming the user is the product owner)
router.put('/:productId', productsController.updateProduct);

// Delete a product (assuming the user is the product owner or an admin)
router.delete('/:productId', productsController.deleteProduct);

module.exports = router;
