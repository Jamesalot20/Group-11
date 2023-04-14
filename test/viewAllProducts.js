/*
const chai = require('chai');
const expect = chai.expect;
const app = require('../server/server');
const request = require('supertest');

describe('Product Routes', () => {
  describe('GET /api/products', () => {
    it('should return all products for a buyer', (done) => {
      request(app)
        .get('/api/products')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('array');
          // Make sure all products are for buyers
          const allProductsForBuyers = res.body.every(product => product.seller === 'admin');
          expect(allProductsForBuyers).to.be.true;
          done();
        });
    });
  });
});
*/
