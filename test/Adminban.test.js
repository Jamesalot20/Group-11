const User = require('server/models/User');
const request = require('supertest');
const chai = require('chai');
const server = require('../server/server');

const { expect } = chai;

describe('Admin banning a user', () => {
  let adminToken;
  let userEmail;

  before(async () => {
    // Create an admin user and get its token
    const adminUser = new User({
      email: 'admin@example.com',
      password: 'AdminPassword123',
      role: 'admin',
    });

    await adminUser.save();

    const response = await request(app)
      .post('/login')
      .send({
        email: 'admin@example.com',
        password: 'AdminPassword123',
      });

    adminToken = response.body.token;

    // Create a user to be banned
    const userToBeBanned = new User({
      email: 'user@example.com',
      password: 'UserPassword123',
      role: 'buyer',
    });

    await userToBeBanned.save();
    userEmail = userToBeBanned.email;
  });

  after(async () => {
    // Clean up the test users
    await User.deleteOne({ email: 'admin@example.com' });
    await User.deleteOne({ email: 'user@example.com' });
  });

  it('Admin can ban a user', async () => {
    const response = await request(app)
      .delete(`/deleteUser/${userEmail}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.status).to.equal(200);
    expect(response.body.message).to.equal('User account deleted successfully.');

    const deletedUser = await User.findOne({ email: userEmail });
    expect(deletedUser).to.be.null;
  });
});
