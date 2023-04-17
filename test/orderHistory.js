/*
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Order history', () => {
  it('should return the order history for a user', (done) => {
    chai.request(app)
      .get('/api/orders/history/12345') // Replace with a valid user ID
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body[0]).to.have.property('orderId');
        expect(res.body[0]).to.have.property('items');
        expect(res.body[0].items[0]).to.have.property('productId');
        expect(res.body[0].items[0]).to.have.property('quantity');
        done();
      });
  });
});
*/
