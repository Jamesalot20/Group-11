const Order = require('../models/Order');
const User = require('../models/User');
exports.getOrdersByUser = async (req, res) => {
  try {
    const userId = req.user.userId; // Accessing the userId from req.user
     console.log('User ID:', userId);
    const orders = await Order.find({ buyer: userId });
    console.log('Filtered orders:', orders);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching orders.' });
  }
};



exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      res.status(404).json({ error: 'Order not found.' });
    } else {
      res.status(200).json(order);
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the order.' });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const { buyerId, sellerId, totalAmount } = req.body;

    // Retrieve the buyer and the seller
    const buyer = await User.findById(buyerId);
    const seller = await User.findById(sellerId);

    if (!buyer) {
      return res.status(404).json({ error: 'Buyer not found' });
    }

    if (!seller) {
      return res.status(404).json({ error: 'Seller not found' });
    }

    // Check if the buyer has enough balance
    if (buyer.balance < totalAmount) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    // Deduct the order amount from the buyer's balance and add it to the seller's balance
    buyer.balance -= totalAmount;
    seller.balance += totalAmount;

    await buyer.save();
    await seller.save();

    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'An error occurred while creating the order.' });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!order) {
      res.status(404).json({ error: 'Order not found.' });
    } else {
      res.status(200).json(order);
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the order.' });
  }
};
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndRemove(req.params.id);
    if (!order) {
      res.status(404).json({ error: 'Order not found.' });
    } else {
      res.status(200).json({ message: 'Order successfully deleted.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the order.' });
  }
};

exports.getBuyerOrderHistory = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.userId });
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching order history:', error);
    res.status(500).json({ error: 'An error occurred while fetching the order history.' });
  }
};

exports.returnOrderItem = async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate(
      { _id: req.params.orderId },
      { $set: { 'items.$[].status': 'returned' } },
      { new: true }
    );

    if (!order) {
      res.status(404).json({ error: 'Order not found.' });
    } else {
      res.status(200).json(order);
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while returning the item.' });
  }
};
