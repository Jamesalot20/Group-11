const User = require('../server/models/User');
const Product = require('../server/models/Product');
const Order = require('../server/models/Order');
const app = require('../server/server');
const chai = require('chai');
const { expect } = chai;
const bcrypt = require('bcrypt');
const supertest = require('supertest');

const request = supertest(app);

let buyerToken, sellerToken;

describe('Seller receiving money after product purchase', () => {
  before(async () => {
    // Login as a buyer to obtain the authorization token
    const buyerCredentials = {
      email: 'buyer32@example.com',
      password: 'BuyerPassword123'
    };

    const buyerRes = await request
      .post('/api/users/login')
      .send(buyerCredentials);

    buyerToken = buyerRes.body.token;

    // Login as a seller to obtain the authorization token
    const sellerCredentials = {
      email: 'seller32@example.com',
      password: 'SellerPassword123'
    };

    const sellerRes = await request
      .post('/api/users/login')
      .send(sellerCredentials);

    sellerToken = sellerRes.body.token;
  });

  beforeEach(async () => {
    // Create a buyer with an initial balance
    const buyerPassword = await bcrypt.hash('BuyerPassword123', 10);
    buyer = new User({
      email: 'buyer32@example.com',
      password: buyerPassword,
      role: 'buyer',
      balance: 50,
    });
    await buyer.save();

    // Create a seller with an initial balance
    const sellerPassword = await bcrypt.hash('SellerPassword123', 10);
    seller = new User({
      email: 'seller32@example.com',
      password: sellerPassword,
      role: 'seller',
      balance: 0,
    });
    await seller.save();

    // Create a product with the seller as the owner
    product = new Product({
      name: 'Test Product',
      description: 'Test product description',
      price: 10.0,
      category: 'RAM',
      seller: seller._id,
    });
    await product.save();
  });

  afterEach(async () => {
    // Clean up the test users and product
    await User.deleteOne({ email: 'buyer32@example.com' });
    await User.deleteOne({ email: 'seller32@example.com' });
    await Product.deleteOne({ name: 'Test Product' });
    await Order.deleteMany({});
  });

    it('Seller receives money after buyer purchases product', async () => {
    // Simulate the buyer purchasing the product
    const items = [
      {
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
        seller: seller._id,
      },
    ];
    const totalAmount = items[0].price * items[0].quantity;
    const sellerIds = [seller._id];
    const orderData = {
      buyerId: buyer._id,
      sellerIds,
      totalAmount,
      items,
    };

    const response = await request
      .post('/api/orders')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${buyerToken}`)
      .send(orderData);

    expect(response.status).to.equal(201);

    // Verify the buyer's balance has decreased
    const updatedBuyer = await User.findById(buyer._id);
    expect(updatedBuyer.balance).to.equal(buyer.balance - totalAmount);

    // Verify the seller's balance has increased
    const updatedSeller = await User.findById(seller._id);
    expect(updatedSeller.balance).to.equal(seller.balance + totalAmount);
  });
});
