const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

// Get all products
router.get('/', productsController.getAllProducts);

// Get a single product by ID
router.get('/:productId', productsController.getProductById);

// Add a new product (assuming the user is a seller)
router.post('/', productsController.addProduct);

// Update an existing product (assuming the user is the product owner)
router.put('/:productId', productsController.updateProduct);

// Delete a product (assuming the user is the product owner or an admin)
router.delete('/:productId', productsController.deleteProduct);

module.exports = router;