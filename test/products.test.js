const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server/server');
const should = chai.should();

chai.use(chaiHttp);

describe('Delete Product', () => {
  let productId;

  before(async () => {
    // Create a new product
    const newProduct = {
      name: 'Test Product',
      description: 'Test Product Description',
      price: 10,
      category: 'Test Category',
      seller: '64377ab5141a63ae177d74c0', // Replace this with an actual seller ID
    };

    const createRes = await chai.request(server)
      .post('/api/products/createProduct')
      .set('Authorization', `Bearer ${sellerToken}`)
      .send(newProduct);

    productId = createRes.body._id;
  });

  it('should delete a product by a seller', (done) => {
    chai.request(server)
      .delete(`/api/users/${productId}`)
      .set('Authorization', `Bearer ${sellerToken}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Product deleted successfully.');
        done();
      });
  });
});
