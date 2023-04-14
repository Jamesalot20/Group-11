const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server/server');

// Configure chai
chai.use(chaiHttp);
chai.should();

describe('Products', () => {
  describe('POST /api/users/createProduct', () => {
    // Test the create product route for a seller
    it('Should create a new product', (done) => {
      // Login as a seller
      chai.request(server)
        .post('/api/users/login')
        .send({ email: 'seller@example.com', password: 'password' })
        .end((err, res) => {
          res.should.have.status(200);
          const token = res.body.token;

          // Create a new product
          chai.request(server)
            .post('/api/users/createProduct')
            .set('Authorization', `Bearer ${token}`)
            .send({
              name: 'Product Name',
              description: 'Product Description',
              price: 9.99,
              quantity: 10
            })
            .end((err, res) => {
              res.should.have.status(201);
              done();
            });
        });
    });
  });
});
