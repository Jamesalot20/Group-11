const Product = require('../models/product');

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
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
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
