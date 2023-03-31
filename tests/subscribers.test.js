const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../App");
require("dotenv").config();

//connecting to the database before each test
beforeEach(async () => {
  await mongoose.connect(process.env.dbURL);
});

//closing database after each test
afterEach(async () => {
  await mongoose.connection.close();
});

describe("GET /", () => {
  it("should return index.html ", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.header["content-type"]).toBe("text/html; charset=UTF-8");
  });
});

describe("GET /subscribers", () => {
  it("should return an array of subscribers ", async () => {
    const res = await request(app).get("/subscribers");
    expect(res.statusCode).toBe(200);
  });
});

describe("GET /subscribers/:id", () => {
  it("should return an array of subscribers name and subscribedChannel ", async () => {
    const res = await request(app).get("/subscribers/63ef0ee6cd4ba7a97e047bd5");
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe("63ef0ee6cd4ba7a97e047bd5");
  });
});


describe("GET /subscribers/names", () => {
  it("should return an array of subscribers name and subscribedChannel ", async () => {
    const res = await request(app).get("/subscribers/names");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});






