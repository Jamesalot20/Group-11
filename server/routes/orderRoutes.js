const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');
const authMiddleware = require('../middlewares/authMiddleware');
// Get all orders for the current user
router.get('/', ordersController.getOrdersByUser);

// Get order history for a user
router.get('/history/:userId', authMiddleware.authenticate, orderController.getOrderHistory);

// Get a single order by ID for the current user
router.get('/:orderId', ordersController.getOrderById);

// Create a new order (assuming the user is a buyer)
router.post('/', ordersController.createOrder);

// Update an order (e.g., change the status or cancel the order)
router.put('/:orderId', ordersController.updateOrder);

// Delete an order (assuming the user is the order owner or an admin)
router.delete('/:orderId', ordersController.deleteOrder);

module.exports = router;
