const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server/server');
const should = chai.should();

chai.use(chaiHttp);

// Move adminToken declaration to the outer scope
let adminToken;

describe('Product Tests', () => {
  before(async () => {
    // Login as an admin to obtain the authorization token
    const adminCredentials = {
      email: 'jf1812@msstate.edu',
      password: 'Qwerre123'
    };

    const res = await chai.request(server)
      .post('/api/users/login')
      .send(adminCredentials);

    adminToken = res.body.token;
  });

  describe('Delete Product', () => {
    let productId;

    before(async () => {
      // Create a new product
      const newProduct = {
        name: 'Test Product',
        description: 'Test Product Description',
        price: 10,
        category: 'Test Category',
        seller: '643c8ea417aa25bf8350452b',
      };

      const createRes = await chai.request(server)
        .post('/api/products/createProduct')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(newProduct);

      productId = createRes.body._id;
    });

    it('should delete a product by an admin', (done) => {
      chai.request(server)
        .delete(`/api/products/${productId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Product successfully deleted.');
          done();
        });
    });
  });
});
