const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const authMiddleware = require('../middlewares/authMiddleware');


router.post('/register', usersController.registerUser);
router.post('/login', usersController.loginUser);
router.get('/logout', usersController.logoutUser);
router.post('/searchItems', usersController.searchItems);
router.post('/createProduct', usersController.createProduct);

router.get('/protected', authMiddleware.authenticate, authMiddleware.authorize(['admin', 'seller']), usersController.protectedRoute);
router.get('/userByEmail/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the user.' });
  }
});
module.exports = router;
