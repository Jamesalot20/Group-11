const express = require('express');
const router = express.Router();
const cartsController = require('../controllers/cartsController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', cartsController.getCartByUser);
router.post('/add', cartsController.addItemToCart);
router.put('/update', cartsController.updateCartItem);
router.delete('/remove/:productId', cartsController.removeCartItem);

module.exports = router;
