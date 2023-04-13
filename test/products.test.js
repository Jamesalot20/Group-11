const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server/server');
const should = chai.should();

chai.use(chaiHttp);

describe('Product Tests', () => {
  let sellerToken;

  before(async () => {
    // Login as a seller to obtain the authorization token
    const sellerCredentials = {
      email: 'deleteproduct@example.com',
      password: 'qwerre'
    };

    const res = await chai.request(server)
      .post('/api/users/login')
      .send(sellerCredentials);
      
    sellerToken = res.body.token;
  });

  describe('Delete Product', () => {
    it('should delete a product by a seller', (done) => {
      const productId = '643886309545b9fda39f31ef'; // Replace this with an actual product ID

      chai.request(server)
        .delete(`/api/products/${productId}`)
        .set('Authorization', `Bearer ${sellerToken}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Product deleted successfully.');
          done();
        });
    });
  });
});
