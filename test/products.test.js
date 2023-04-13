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
    chai
      .request(server)
      .delete('/api/products/' + productId) // Assuming 'productId' is the variable holding the ID of the product you want to delete.
      .set('Authorization', `Bearer ${sellerToken}`) // Assuming 'sellerToken' is the token for the seller's account.
      .end((err, res) => {
        console.log('Product ID:', productId);
        console.log('Response:', res.body);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Product successfully deleted.');
        done();
      });
  });
});
