const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching products.' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ error: 'Product not found.' });
    } else {
      res.status(200).json(product);
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the product.' });
  }
};

exports.createProduct = async (req, res) => {
  const user = req.user;
  console.log('User:', user);
  if (user.role !== 'seller' && user.role !== 'admin') {
    res.status(403).json({ message: 'You do not have permission to create a product' });
    return;
  }
  try {
    const product = new Product({
      ...req.body,
      seller: user.userId, // Add this line to set the seller field from the user object
    });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error('Error while creating the product:', error);
    res.status(500).json({ error: 'An error occurred while creating the product.' });
  }
};


exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      res.status(404).json({ error: 'Product not found.' });
    } else {
      res.status(200).json(product);
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the product.' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndRemove(req.params.id);
    if (!product) {
      res.status(404).json({ error: 'Product not found.' });
    } else {
      res.status(200).json({ message: 'Product successfully deleted.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the product.' });
  }
};
