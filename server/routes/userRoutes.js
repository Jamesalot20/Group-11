const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const authMiddleware = require('../middlewares/authMiddleware');


router.post('/register', usersController.registerUser);
router.post('/login', usersController.loginUser);
router.get('/logout', usersController.logoutUser);
router.post('/searchItems', usersController.searchItems);
router.post('/createProduct', usersController.createProduct);

router.get('/protected', authMiddleware.authenticate, authMiddleware.authorize(['admin', 'seller']), userController.protectedRoute);

module.exports = router;
