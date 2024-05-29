import request from 'supertest';
import app from '../app';

jest.mock('../models/Prompt');
jest.mock('replicate');

describe('API Tests', () => {
  it('should return a message from the root endpoint', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body.message).toMatch(/API is working as expected - video generate:/);
  });

  it('should generate a video on /video endpoint', async () => {
    const prompt = 'Generate a video';
    const response = await request(app)
      .post('/video')
      .send({ prompt });
    expect(response.status).toBe(200);
    expect(response.body.result).toBeDefined();
  });

  it('should return 404 for non-existent endpoints', async () => {
    const response = await request(app).get('/nonexistent');
    expect(response.status).toBe(500);
    expect(response.body.error.message).toBe('Endpoint Not found...');
  });
});
