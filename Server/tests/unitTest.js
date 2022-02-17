const app = require("../server");
const Post = require("../models/Post");
const mongoose = require("mongoose");
const supertest = require("supertest");
const { getTokenById } = require("../controllers/electricity");

beforeEach((done) => {
  mongoose.connect("mongodb://localhost:27017/JestDB",
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => done());
});

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done())
  });
});


test("GET /api/tokens", async () => {
  const post = await Post.create({ amount: 100, meterNumber: 123456 });

  await supertest(app).get("/api/tokens")
    .expect(200)
    .then((response) => {
      // Check type and length
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toEqual(1);

      // Check data
      expect(response.body[0]._id).toBe(post.id);
      expect(response.body[0].title).toBe(post.title);
      expect(response.body[0].content).toBe(post.content);
    });
});

test("POST /api/tokens", async () => {
  const data = { amount:200, meterNumber: 333333};

  await supertest(app).post("/api/tokens")
    .send(data)
    .expect(200)
    .then(async (response) => {
      // Check the response
      expect(response.body._id).toBeTruthy();
      expect(response.body.title).toBe(data.title);
      expect(response.body.content).toBe(data.content);

      // Check data in the database
      const post = await Post.findOne({ _id: response.body._id });
      expect(post).toBeTruthy();
      expect(post.title).toBe(data.title);
      expect(post.content).toBe(data.content);
    });
});

test("GET /api/tokens:id", async () => {
  const post = await Post.create({ amount:500, meterNumber:2234567 });

  await supertest(app).get("/api/tokens" + getTokenById.id)
    .expect(200)
    .then((response) => {
      expect(response.body._id).toBe(post.id);
      expect(response.body.title).toBe(post.title);
      expect(response.body.content).toBe(post.content);
    });
});



test("DELETE /api/tokens/:id", async () => {
  const post = await Post.create({
    amount: 2000,
    meterNumber: 400022,
  });

  await supertest(app)
    .delete("/api/tokens" + getTokenById.id)
    .expect(204)
    .then(async () => {
      expect(await Post.findOne({ _id: getTokenById.id })).toBeFalsy();
    });
});