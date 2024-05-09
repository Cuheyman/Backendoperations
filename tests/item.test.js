// tests/item.test.js

const request = require('supertest');
const app = require('../app.js');

let server;

beforeAll(() => {
  // Start the server using a dynamically assigned port
  server = app.listen(0);
});

afterAll(() => {
  // Close the server to prevent port conflicts
  server.close();
});

describe('Item API Tests', () => {
  it('should create a new item', async () => {
    const response = await request(server)
      .post('/api/items')
      .send({ name: 'Test Item', quantity: 10 })
      .expect(201);

    expect(response.body.name).toBe('Test Item');
    expect(response.body.quantity).toBe(10);
  });

  it('should return all items', async () => {
    const response = await request(server).get('/api/items').expect(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
