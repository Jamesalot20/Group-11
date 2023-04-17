// test.js
const chai = require('chai');
const chaiHttp = require('chai-http');
 // Import your main app.js file here
const Product = require('../server/models/Product'); // Import your Product model
const { expect } = chai;
const app = require('../server/server');
const mongoose = require('mongoose');
chai.use(chaiHttp);

describe('Product API', () => {
  let testProductId;

  before((done) => { // Remove "async" and add "done" parameter
  // Clean up the test database
  Product.deleteMany({})
    .then(() => {
      // Create a test product
      const testProduct = new Product({
        name: 'Test Product',
        description: 'Test Product Description',
        price: 99.99,
        category: 'TestCategory', // Add category field
        seller: new mongoose.Types.ObjectId(),
      });

      return testProduct.save(); // Return the promise
    })
    .then((savedProduct) => {
      testProductId = savedProduct._id;
      done(); // Call the "done" callback
    });
});

  describe('GET /products/:productId', () => {
    it('should get a product by ID', (done) => {
      chai
        .request(app)
        .get('/products/' + testProductId)
        .end((err, res) => {
         if (err || res.status !== 200) {
        console.error(res.body);
      }
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('name', 'Test Product');
          expect(res.body).to.have.property('description', 'Test Product Description');
          expect(res.body).to.have.property('price', 99.99);
          expect(res.body).to.have.property('seller', testProduct.seller.toString());
          done();
        });
    });

    it('should return a 404 error when the product is not found', (done) => {
  chai
    .request(app)
    .get('/products/nonexistent-product-id')
    .end((err, res) => {
      if (err || res.status !== 404) {
        console.error(res.body);
      }
      expect(err).to.be.null;
      expect(res).to.have.status(404);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error', 'Product not found.');
          done();
        });
    });
  });
});

