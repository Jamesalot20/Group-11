const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const authMiddleware = require('../middlewares/authMiddleware');
const productsController = require('../controllers/productsController');

router.post('/register', usersController.registerUser);
router.post('/login', usersController.loginUser);
router.post('/createProduct', authMiddleware.authenticate, authMiddleware.authorize(['seller', 'admin']), productsController.createProduct);
router.post('/logout', usersController.logoutUser);
router.post('/searchItems', usersController.searchItems);

router.get('/protected', authMiddleware.authenticate, authMiddleware.authorize(['admin', 'seller']), usersController.protectedRoute);
router.get('/userByEmail/:email', usersController.getUserByEmail);
module.exports = router;
