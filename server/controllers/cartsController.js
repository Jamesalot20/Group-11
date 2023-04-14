const Cart = require('../models/Cart');

exports.getCartByUser = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.userId }).populate('items.product');


    if (!cart) {
  cart = new Cart({ user: req.user._id, items: [] });
  await cart.save();
}

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
};

exports.addItemToCart = async (req, res) => {
  console.log("addItemToCart req.user:", req.user);
  console.log('addItemToCart called');
  console.log('Request user:', req.user);
  try {
    const { productId, quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user._id }); // Change this line
    console.log('userId:', req.user._id);
    console.log('Cart:', cart);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found.' });
    }

    // ... rest of the function code
  } catch (error) {
    console.log('Error:', error.message);
    res.status(500).json({ message: 'Server error.' });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user.userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found.' });
    }

    const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);

    if (itemIndex >= 0) {
      cart.items[itemIndex].quantity = quantity;
    } else {
      return res.status(404).json({ message: 'Item not found in cart.' });
    }

    await cart.save();
    res.status(200).json({ message: 'Item updated in cart.', cart });
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
};

exports.removeCartItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const cart = await Cart.findOne({ user: req.user.userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found.' });
    }

    cart.items = cart.items.filter((item) => item.product.toString() !== productId);

    await cart.save();
    res.status(200).json({ message: 'Item removed from cart.', cart });
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
};
