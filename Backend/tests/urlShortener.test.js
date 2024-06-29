const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const urlRoute = require('../Routes/url.route');

const app = express();
app.use(bodyParser.json());
app.use('/api', urlRoute);

let mongod;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
});

test('POST /api/shortner should shorten a valid URL', async () => {
  const res = await request(app)
    .post('/api/shortner')
    .send({ longUrl: 'http://example.com' });
  expect(res.status).toBe(201);
  expect(res.body).toHaveProperty('shortUrl');
});

test('POST /api/shortner should return 400 for an invalid URL', async () => {
  const res = await request(app)
    .post('/api/shortner')
    .send({ longUrl: 'invalid-url' });
  expect(res.status).toBe(400);
  expect(res.body).toHaveProperty('error');
});

test('POST /api/shortner should return the same short URL for an already shortened URL', async () => {
  const res1 = await request(app)
    .post('/api/shortner')
    .send({ longUrl: 'http://example.com' });

  const res2 = await request(app)
    .post('/api/shortner')
    .send({ longUrl: 'http://example.com' });

  expect(res2.status).toBe(201);
  expect(res2.body.shortUrl).toBe(res1.body.shortUrl);
});

test('GET /api/:shortId should redirect to the original URL', async () => {
  const postRes = await request(app)
    .post('/api/shortner')
    .send({ longUrl: 'http://example.com' });

  const shortUrl = postRes.body.shortUrl;
  const shortId = shortUrl.split('/').pop();

  const getRes = await request(app).get(`/api/${shortId}`);
  expect(getRes.status).toBe(302);
  expect(getRes.header.location).toBe('http://example.com');
});

test('GET /api/:shortId should return 404 for a non-existent short URL', async () => {
  const res = await request(app).get('/api/nonexistent');
  expect(res.status).toBe(404);
});

test('GET /api/get/all should retrieve all shortened URLs', async () => {
  await request(app)
    .post('/api/shortner')
    .send({ longUrl: 'http://example1.com' });

  await request(app)
    .post('/api/shortner')
    .send({ longUrl: 'http://example2.com' });

  const res = await request(app).get('/api/get/all');
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(2);
});

test('GET /api/get/all should return 404 if no URLs are found', async () => {
  const res = await request(app).get('/api/get/all');
  expect(res.status).toBe(404);
});
