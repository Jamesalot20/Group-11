const User = require('../server/models/User');
const Product = require('../server/models/Product');
const request = require('supertest');
const app = require('../server/server');
const chai = require('chai');
const { expect } = chai;
const bcrypt = require('bcrypt');
describe('Get seller products', () => {
  let sellerToken;

  before(async () => {
    // Create a seller and get its token
    const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('SellerPassword123', salt);
    const sellerUser = new User({
      email: 'seller50@example.com',
      password: hashedPassword,
      role: 'seller',
    });

    const savedSellerUser = await sellerUser.save();

    const response = await request(app)
      .post('/api/users/login')
      .send({
        email: 'seller50@example.com',
        password: 'SellerPassword123',
      });
    sellerToken = response.body.token;

    // Create a product for the seller
    const product = new Product({
      name: 'Test Product',
      description: 'Test product description',
      price: 10.0,
      category: "RAM",
      seller: savedSellerUser._id,
    });

    await product.save();
  });

  after(async () => {
    // Clean up the test seller and product
    await User.deleteOne({ email: 'seller50@example.com' });
    await Product.deleteOne({ name: 'Test Product' });
  });

  it('Seller can get their products', async () => {
    const getProductsResponse = await request(app)
      .get('/api/users/my-products')
      .set('Authorization', `Bearer ${sellerToken}`);

    expect(getProductsResponse.status).to.equal(200);
    expect(getProductsResponse.body).to.be.an('array');
    expect(getProductsResponse.body[0]).to.have.property('name', 'Test Product');
  });
});
