const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server/server');
const expect = chai.expect;

chai.use(chaiHttp);

describe('DELETE /api/products/:productId', () => {
  let adminToken;

  before(async () => {
    // Login as admin user to get authentication token
    const res = await chai.request(server)
      .post('/api/users/login')
      .send({ email: 'jf1812@msstate.edu', password: 'Qwerre123' });
    adminToken = res.body.token;
  });

  it('should delete a product when requested by an admin', async () => {
    // Create a new product
    const createProductRes = await chai.request(server)
      .post('/api/products/createProduct')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Test Product',
        description: 'Test Product Description',
        price: 10,
        category: 'Test Category',
        seller: '643c8ea417aa25bf8350452b', // Replace this with an actual seller ID
      });

    // Delete the product
    const deleteProductRes = await chai.request(server)
      .delete(`/api/products/${createProductRes.body._id}`)
      .set('Authorization', `Bearer ${adminToken}`);

    // Assert that the product was deleted
    expect(deleteProductRes.status).to.equal(200);
    expect(deleteProductRes.body.message).to.equal('Product deleted successfully.');
  });

  after(async () => {
    // Cleanup: delete all products created during the test
    const products = await chai.request(server)
      .get('/api/products')
      .set('Authorization', `Bearer ${adminToken}`);
    for (const product of products.body) {
      await chai.request(server)
        .delete(`/api/products/${product._id}`)
        .set('Authorization', `Bearer ${adminToken}`);
    }
  });
});
