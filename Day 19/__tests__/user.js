const supertest = require("supertest");
const app = require("../app");
jest.mock("../models/user.model");
const User = require("../models/user.model");

describe("user find by id", () => {
  // success
  it("succes", async () => {
    const fakeUser = { name: "Omar", email: "omar@mail.com" };
    User.findById.mockResolvedValue(fakeUser);
    const res = await supertest(app).get("/users/123");
    expect(res.status).toBe(200);
    expect(res.body).toEqual(fakeUser);
  });
  // Not Found
  it("Not found", async () => {
    User.findById.mockResolvedValue(null);
    const res = await supertest(app).get("/users/456");
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: "User not found" });
  });
  // Error
  it("Server error", async () => {
    User.findById.mockRejectedValue(new Error("DB failed"));
    const res = await supertest(app).get("/users/789");
    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: "Server error" });
  });
});
