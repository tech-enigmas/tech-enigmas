'use strict';

const { app } = require('../src/server');
const supertest = require('supertest');
const mockServer = supertest(app);
const { db } = require('../src/models/index.js');

beforeEach(async () => {
  db.sync();
});
afterEach(async () => {
  await db.drop({});
});


describe('test server routes and database', () => {
  test('POST /signup creates a new user and sends an object with the user and the token to the client', async () => {
    const res = await mockServer.post('/signup').send({username: 'Emily', password: '1234', role: 'admin'});
    expect(res.status).toEqual(201);
  });
  test('POST /signin with basic authentication headers logs in a user and sends an object with the user and the token to the client', async () => {
    const res = await mockServer.post('/signin').auth('Emily', '1234');
    console.log(res);
    expect(res.status).toBe(200);
    expect(res.body.user.username).toBe('Emily');
  });
  test('can we make a request to /users', async () => {
    const res = await mockServer.get('/users').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkVtaWx5IiwiaWF0IjoxNjkwNjUzODYxfQ.ZFSmfNpGCL57BZJil7leVtPiPkOtJZcmIeo8Dmo664c');
    expect(res.status).toBe(200);
  });
});