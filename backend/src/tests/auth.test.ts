import request from "supertest";
import app from "../app";
import prisma from "../prisma";
import { beforeAll, afterAll, it, expect, describe } from "vitest";


beforeAll(async () => {
  await prisma.user.deleteMany();
  await prisma.refreshToken.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Auth Routes", () => {
  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ email: "test@example.com", password: "123456" });

    expect(res.statusCode).toBe(201);
    expect(res.body.user.email).toBe("test@example.com");
    expect(res.headers["set-cookie"]).toBeDefined();
  });

  it("should not register a user with existing email", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ email: "test@example.com", password: "123456" });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("User already exists");
  });

  it("should login an existing user", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@example.com", password: "123456" });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Logged in");
    expect(res.headers["set-cookie"]).toBeDefined();
  });

  it("should protect a route", async () => {
    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@example.com", password: "123456" });

    const cookie = loginRes.headers["set-cookie"];

    const protectedRes = await request(app).get("/api/auth/me").set("Cookie", cookie);

    expect(protectedRes.statusCode).toBe(200);
    expect(protectedRes.body.user.id).toBeDefined();
  });

  it("should reject access without token", async () => {
    const res = await request(app).get("/api/auth/me");
    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBeDefined();
  });

  it("should refresh access token with valid refresh token", async () => {
    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@example.com", password: "123456" });

    const cookies = Array.isArray(loginRes.headers["set-cookie"])
      ? loginRes.headers["set-cookie"]
      : [loginRes.headers["set-cookie"]];

    const refreshCookie = cookies.find((c) => c.startsWith("refreshToken="));

    const res = await request(app).post("/api/auth/refresh").set("Cookie", refreshCookie);

    expect(res.statusCode).toBe(200);
    expect(res.headers["set-cookie"]).toEqual(
      expect.arrayContaining([expect.stringMatching(/^accessToken=/)])
    );
  });
});
