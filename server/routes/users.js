const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.post('/register', usersController.registerUser);
router.post('/login', usersController.loginUser);
router.get('/logout', usersController.logoutUser);
router.post('/searchItems', usersController.searchItems);
router.post('/createProduct', usersController.createProduct);

module.exports = router;
