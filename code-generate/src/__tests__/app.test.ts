import request from 'supertest';
import app from '../app'; 

jest.mock('../models/Prompt');
jest.mock('openai');

describe('API Tests', () => {
  it('should return a message from the root endpoint', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body.message).toMatch(/API is working as expected -code generate: /);
  });

  it('should generate code on /code endpoint', async () => {
    const response = await request(app)
      .post('/code')
      .send({
        messages: [
          { role: 'user', content: 'Generate a hello world in Python' }
        ]
      });
    expect(response.status).toBe(200);
    expect(response.body.result).toBeDefined();
    expect(response.body.result.content).toMatch(/```python/);
  });

  it('should return 404 for non-existent endpoints', async () => {
    const response = await request(app).get('/nonexistent');
    expect(response.status).toBe(500);
    expect(response.body.error.message).toBe('Endpoint Not found...');
  });
});
