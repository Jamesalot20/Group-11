const request = require('supertest');
const app = require('../app'); // Import your Express app
const User = require('../models/User');
const app = require('../server/server');
describe('Admin banning a user', () => {
  let adminToken;
  let userEmail;

  beforeAll(async () => {
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

  afterAll(async () => {
    // Clean up the test users
    await User.deleteOne({ email: 'admin@example.com' });
    await User.deleteOne({ email: 'user@example.com' });
  });

  test('Admin can ban a user', async () => {
    const response = await request(app)
      .delete(`/deleteUser/${userEmail}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User account deleted successfully.');

    const deletedUser = await User.findOne({ email: userEmail });
    expect(deletedUser).toBeNull();
  });
});
