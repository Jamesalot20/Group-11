const supertest = require('supertest');
const chai = require('chai');
const app = require('../server'); // Import your server or app instance
const request = supertest(app);
const { expect } = chai;

describe('Auth Tests', () => {
  let buyerToken, sellerToken, adminToken;

  it('Buyer login', async () => {
    const response = await request.post('/api/users/login').send({
      email: 'test@example.com',
      password: 'password123',
    });

    expect(response.status).to.equal(200);
    expect(response.body.token).to.exist;
    buyerToken = response.body.token;
  });

  it('Seller login', async () => {
    const response = await request.post('/api/users/login').send({
      email: 'sellertest@example.com',
      password: 'password123',
    });

    expect(response.status).to.equal(200);
    expect(response.body.token).to.exist;
    sellerToken = response.body.token;
  });

  it('Admin login', async () => {
    const response = await request.post('/api/users/login').send({
      email: 'jf1812@msstate.edu',
      password: 'Qwerre123',
    });

    expect(response.status).to.equal(200);
    expect(response.body.token).to.exist;
    adminToken = response.body.token;
  });

  // Write test cases for different user roles performing actions

  it('Buyer logout', async () => {
    const response = await request.post('/api/auth/logout').set('Authorization', `Bearer ${eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDM4NGFjNTczNGZmYjkyMjJlOGE5ODkiLCJyb2xlIjoiYnV5ZXIiLCJpYXQiOjE2ODE0MTIwNjcsImV4cCI6MTY4MTQxNTY2N30.5DQQZjTLPPSpoyiUpP6DUFxa2R4aKUsz2Rfsa6AIC4M}`);

    expect(response.status).to.equal(200);
    expect(response.body.message).to.equal('Logged out successfully');
  });

  it('Seller logout', async () => {
    const response = await request.post('/api/auth/logout').set('Authorization', `Bearer ${eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDM4NGFlOTczNGZmYjkyMjJlOGE5OGMiLCJyb2xlIjoic2VsbGVyIiwiaWF0IjoxNjgxNDEyMDMxLCJleHAiOjE2ODE0MTU2MzF9.zgt2FrHn6madv1MxY-QW9grZ9gv-BJD5OTlV61AP_TA}`);

    expect(response.status).to.equal(200);
    expect(response.body.message).to.equal('Logged out successfully');
  });

  it('Admin logout', async () => {
    const response = await request.post('/api/auth/logout').set('Authorization', `Bearer ${eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDM3N2FiNTE0MWE2M2FlMTc3ZDc0YzAiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2ODE0MTIwOTUsImV4cCI6MTY4MTQxNTY5NX0.FSuTw-l06H5mYUq3l0yg29nkJuCbADEhPEdAb7qqcXE}`);

    expect(response.status).to.equal(200);
    expect(response.body.message).to.equal('Logged out successfully');
  });
});
