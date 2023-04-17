const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server/server');

chai.use(chaiHttp);
chai.should();

describe('Order history API', () => {
  let token;
  let order;

  before(async () => {
    // Log in as a buyer to obtain an access token
    const res = await chai.request(app)
      .post('/api/users/login')
      .send({ email: 'test@example.com', password: 'password123' });

    token = res.body.token;
  });

  describe('POST /api/orders', () => {
    it('should create a new order', async () => {
      // Create a new order
      const res = await chai.request(app)
        .post('/api/orders')
        .set('Authorization', `Bearer ${token}`)
        .send({
          items: [
            {
              productId: 'product-id-1',
              quantity: 2,
            },
            {
              productId: 'product-id-2',
              quantity: 3,
            },
          ],
          shippingAddress: {
            address: '123 Main St',
            city: 'Anytown',
            state: 'CA',
            zipCode: '12345',
          },
        });

      // Verify the response
      res.should.have.status(201);
      res.body.should.be.an('object');
      res.body.should.have.property('id');
      res.body.should.have.property('items');
      res.body.should.have.property('shippingAddress');
      res.body.items.should.be.an('array').with.lengthOf(2);
      res.body.items[0].should.be.an('object').with.property('productId', 'product-id-1');
      res.body.items[0].should.be.an('object').with.property('quantity', 2);
      res.body.items[1].should.be.an('object').with.property('productId', 'product-id-2');
      res.body.items[1].should.be.an('object').with.property('quantity', 3);
      res.body.shippingAddress.should.be.an('object');
      res.body.shippingAddress.should.have.property('address', '123 Main St');
      res.body.shippingAddress.should.have.property('city', 'Anytown');
      res.body.shippingAddress.should.have.property('state', 'CA');
      res.body.shippingAddress.should.have.property('zipCode', '12345');

      // Store the order for later use
      order = res.body;
    });
  });

  // Add more test cases here, such as GET /api/orders to retrieve the created order
});
