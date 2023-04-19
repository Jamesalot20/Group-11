/*
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server/server');

chai.use(chaiHttp);
chai.should();

describe('Product search by ID', () => {
  let authToken;

  // Get auth token before running tests
  before((done) => {
    chai.request(app)
      .post('/api/users/login')
      .send({ email: 'test@example.com', password: 'password123' })
      .end((err, res) => {
        authToken = res.body.token;
        done();
      });
  });

  it('should return a product by ID', (done) => {
    const productId = '643ccd3aebe48b07e6c7f157';
    chai.request(app)
      .get(`/api/products/${productId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('name');
        res.body.should.have.property('description');
        res.body.should.have.property('price');
        done();
      });
  });

  it('should return an error when the product ID is not found', (done) => {
    const productId = '32543';
    chai.request(app)
      .get(`/api/products/${productId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Product not found.');
        done();
      });
  });

  it('should return an error when an invalid product ID is provided', (done) => {
    const productId = 'invalidid';
    chai.request(app)
      .get(`/api/products/${productId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Invalid product ID.');
        done();
      });
  });
});
*/
