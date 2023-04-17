const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server/server');

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Product Routes", () => {

  describe("GET /api/products/:productId", () => {
    it("should return the product with the given ID", (done) => {
      const productId = "643ccc56a2578e3450a14d2e";

      chai.request(app)
        .get(`/api/products/${productId}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('_id');
          res.body.should.have.property('name');
          res.body.should.have.property('description');
          res.body.should.have.property('price');
          res.body.should.have.property('quantity');
          res.body.should.have.property('seller');
          done();
        });
    });

    it("should return 404 if the product ID is invalid", (done) => {
      const productId = "0123456789";

      chai.request(app)
        .get(`/api/products/${productId}`)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

});
