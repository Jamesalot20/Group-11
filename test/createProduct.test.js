const request = require('supertest');
const app = require('../server');

describe('POST /api/users/createProduct', () => {
  let sellerToken;

  beforeAll((done) => {
    // Log in as a seller and get the access token
    request(app)
      .post('/api/users/login')
      .send({ email: 'sellertest@example.com', password: 'password123' })
      .end((err, res) => {
        if (err) return done(err);
        sellerToken = res.body.token;
        done();
      });
  });

  it('should create a new product', (done) => {
    const newProduct = {
      name: 'Test Product1',
      description: 'This is a test product',
      price: 10,
      category: 'Test Category',
      seller: '643885909545b9fda39f31ec',
    };
    request(app)
      .post('/api/users/createProduct')
      .send(newProduct)
      .set('Authorization', `Bearer ${sellerToken}`)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.message).toEqual('Product successfully created.');
        done();
      });
  });

  it('should not create a new product if user is not authenticated', (done) => {
    const newProduct = {
      name: 'Test Product',
      description: 'This is a test product',
      price: 9.99,
      quantity: 10,
      seller: 'sellertest@example.com',
    };
    request(app)
      .post('/api/users/createProduct')
      .send(newProduct)
      .expect(401)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.message).toEqual('Authentication required.');
        done();
      });
  });

  it('should not create a new product if user is not a seller', (done) => {
    const newProduct = {
      name: 'Test Product',
      description: 'This is a test product',
      price: 9.99,
      quantity: 10,
      seller: 'seller@example.com',
    };
    // Log in as a buyer and get the access token
    request(app)
      .post('/api/users/login')
      .send({ email: 'test@example.com', password: 'password123' })
      .end((err, res) => {
        if (err) return done(err);
        const buyerToken = res.body.token;
        request(app)
          .post('/api/users/createProduct')
          .send(newProduct)
          .set('Authorization', `Bearer ${buyerToken}`)
          .expect(403)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.message).toEqual('You are not authorized to perform this action.');
            done();
          });
      });
  });
});
