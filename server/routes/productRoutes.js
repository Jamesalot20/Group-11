const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const authMiddleware = require('../middlewares/authMiddleware');

// Get all products
router.get('/', productsController.getProducts);

// Get a single product by ID
router.get('/:productId', productsController.getProductById);

// Add a new product (assuming the user is a seller)
router.post('/createProduct', authMiddleware.authenticate, authMiddleware.authorize(['seller', 'admin']), productsController.createProduct);

// Update an existing product (assuming the user is the product owner)
router.put('/:productId', productsController.updateProduct);

// Delete a product (assuming the user is the product owner or an admin)

// Route to get all pending products
router.get('/pending-products', async (req, res) => {
  try {
    const products = await Product.find({ status: 'pending' });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to approve a product
router.put('/approve-product/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    product.status = 'approved';
    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
