const User = require('../server/models/User');
const request = require('supertest');
const chai = require('chai');
const app = require('../server/server');

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

  const savedAdminUser = await adminUser.save();
  console.log('Admin user created:', savedAdminUser);

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

  const savedUserToBeBanned = await userToBeBanned.save();
  console.log('User to be banned created:', savedUserToBeBanned);
  userEmail = savedUserToBeBanned.email;
});

  after(async () => {
    // Clean up the test users
    await User.deleteOne({ email: 'admin@example.com' });
    await User.deleteOne({ email: 'user@example.com' });
  });

  it('Admin can ban a user', async () => {
    const deleteUserResponse = await chai.request(app)
  .delete(`/api/users/deleteUser/${userToBeBanned.email}`)
  .set('Authorization', `Bearer ${adminUserLoginResponse.body.token}`);

    expect(response.status).to.equal(200);
    expect(response.body.message).to.equal('User account deleted successfully.');

    const deletedUser = await User.findOne({ email: userEmail });
    expect(deletedUser).to.be.null;
  });
});
