const request = require('supertest');
const app = require('../index');
const haikus = require('../haikus.json');

describe('GET /', () => {
  it('should return HTML response with haikus', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toContain('Haikus for June');
    haikus.forEach(haiku => {
      expect(response.text).toContain(haiku.text);
      expect(response.text).toContain(haiku.image);
    });
  });
});

describe('GET /:id', () => {
  haikus.forEach((haiku, index) => {
    it(`should return HTML response with haiku ${index}`, async () => {
      const response = await request(app).get(`/${index}`);
      expect(response.status).toBe(200);
      expect(response.text).toContain('Haikus for June');
      expect(response.text).toContain(haiku.text);
      expect(response.text).toContain(haiku.image);
    });
  });
});

describe('POST /', () => {
  haikus.forEach((haiku, index) => {
    it(`should return HTML response with haiku ${index}`, async () => {
      const response = await request(app)
        .post('/')
        .send({ id: index });
      expect(response.status).toBe(200);
      expect(response.text).toContain('Haikus for June');
      expect(response.text).toContain(haiku.text);
      expect(response.text).toContain(haiku.image);
    });
  });
});
