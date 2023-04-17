// test.js
const chai = require('chai');
const chaiHttp = require('chai-http');
 // Import your main app.js file here
const Product = require('../server/models/Product'); // Import your Product model
const { expect } = chai;
const server = require('../server/server');
const mongoose = require('mongoose');
chai.use(chaiHttp);

describe('Product API', () => {
  let testProductId;

  before(async () => {
    // Clean up the test database
    await Product.deleteMany({});

    // Create a test product
    const testProduct = new Product({
      name: 'Test Product',
      description: 'Test Product Description',
      price: 99.99,
      category: 'TestCategory', // Add category field
      seller: new mongoose.Types.ObjectId(),
    });

    await testProduct.save();
    testProductId = testProduct._id;
  });

  describe('GET /:productId', () => {
    it('should get a product by ID', (done) => {
      chai
        .request(app)
        .get('/' + testProductId)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('name', 'Test Product');
          expect(res.body).to.have.property('description', 'Test Product Description');
          expect(res.body).to.have.property('price', 99.99);
          expect(res.body).to.have.property('seller', 'some-seller-id');
          done();
        });
    });

    it('should return a 404 error when the product is not found', (done) => {
      chai
        .request(app)
        .get('/nonexistent-product-id')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(404);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error', 'Product not found.');
          done();
        });
    });
  });
});

