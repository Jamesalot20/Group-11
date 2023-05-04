const User = require('../server/models/User');
const bcrypt = require('bcrypt');
const request = require('supertest');
const chai = require('chai');
const app = require('../server/server');
const { expect } = chai;

describe('Buyer updating money balance', () => {
  let buyerToken;
  let buyerId;

  before(async () => {
    // Create a buyer user and get its token
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('BuyerPassword123', salt);

    const buyerUser = new User({
      email: 'buyer@example.com',
      password: hashedPassword,
      role: 'buyer',
    });

    const savedBuyerUser = await buyerUser.save();
    buyerId = savedBuyerUser._id;

    const response = await request(app)
      .post('/api/users/login')
      .send({
        email: 'buyer@example.com',
        password: 'BuyerPassword123',
      });
    buyerToken = response.body.token;
  });

  after(async () => {
    // Clean up the test user
    await User.deleteOne({ email: 'buyer@example.com' });
  });

  it('Buyer can update money balance', async () => {
    const addMoneyResponse = await request(app)
      .put('/api/users/addMoney') // Replace with the correct endpoint for adding money
      .set('Authorization', `Bearer ${buyerToken}`)
      .send({
        userId: buyerId,
        amount: 50,
      });

    expect(addMoneyResponse.status).to.equal(200);
    expect(addMoneyResponse.body.message).to.equal('Money added successfully');

    const updatedUser = await User.findById(buyerId);
    expect(updatedUser.balance).to.equal(50);
  });
});
