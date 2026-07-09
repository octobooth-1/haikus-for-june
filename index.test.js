// index.test.js
const request = require('supertest');
const app = require('./index');
const haikus = require('./haikus.json');

describe('GET /', () => {
  it('should return HTML with all haikus', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/html/);
    haikus.forEach(haiku => {
      expect(response.text).toContain(haiku.text);
      expect(response.text).toContain(haiku.image);
    });
  });
});

describe('GET /:id', () => {
  it('should return HTML with the specific haiku', async () => {
    const haikuId = 0; // Assuming we have at least one haiku
    const response = await request(app).get(`/${haikuId}`);
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/html/);
    expect(response.text).toContain(haikus[haikuId].text);
    expect(response.text).toContain(haikus[haikuId].image);
  });

  it('should return 404 for non-existent haiku', async () => {
    const nonExistentId = haikus.length; // Out of bounds index
    const response = await request(app).get(`/${nonExistentId}`);
    expect(response.status).toBe(404);
  });
});

describe('GET /random', () => {
  it('should return HTML with one random haiku and image', async () => {
    const response = await request(app).get('/random');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/html/);

    const matchingHaikus = haikus.filter((haiku) => {
      return response.text.includes(haiku.text) && response.text.includes(haiku.image);
    });

    expect(matchingHaikus).toHaveLength(1);
  });
});