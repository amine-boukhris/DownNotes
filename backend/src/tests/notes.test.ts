import request from "supertest";
import prisma from "../prisma";
import app from "../app";
import { describe, it, expect, beforeAll, afterAll } from "vitest";

let accessToken: string;
let noteId: string;

beforeAll(async () => {
  await prisma.user.deleteMany();
  await prisma.note.deleteMany();

  const registerRes = await request(app).post("/api/auth/register").send({
    email: "noteuser@example.com",
    password: "password123",
  });

  const cookies = Array.isArray(registerRes.headers["set-cookie"])
    ? registerRes.headers["set-cookie"]
    : [registerRes.headers["set-cookie"]];

  accessToken = cookies.find((c: string) => c.startsWith("accessToken="))?.split(";")[0];
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Notes routes", () => {
  it("Should create a new note", async () => {
    const res = await request(app).post("/api/notes").set("Cookie", accessToken).send({
      title: "My note",
      content: "This is a **note**",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.note).toHaveProperty("id");
    noteId = res.body.note.id;
  });

  it("Should list notes", async () => {
    const res = await request(app).get("/api/notes").set("Cookie", accessToken);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.notes)).toBe(true);
    expect(res.body.notes.length).toBeGreaterThan(0);
  });

  it("Should fetch a note by id", async () => {
    const res = await request(app).get(`/api/notes/${noteId}`).set("Cookie", accessToken);

    expect(res.statusCode).toBe(200);
    expect(res.body.note.title).toBe("My note");
  });

  it("Should update a note", async () => {
    const res = await request(app).put(`/api/notes/${noteId}`).set("Cookie", accessToken).send({
      title: "My updated note",
      content: "### New content WITH a period.",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.note.title).toBe("My updated note");
  });

  it("Should check grammar of a note", async () => {
    const res = await request(app)
      .get(`/api/notes/${noteId}/check-grammar`)
      .set("Cookie", accessToken);

    expect(res.statusCode).toBe(200);
    expect(res.body.issues).toBeInstanceOf(Array);
  });

  it("Should delete a note", async () => {
    const res = await request(app).delete(`/api/notes/${noteId}`).set("Cookie", accessToken);

    expect(res.statusCode).toBe(200);
  });

  it("Should block unauthorized access", async () => {
    const res = await request(app).get("/api/notes");

    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBeDefined();
    expect(res.body.error).toBe("Not authenticated");
  });
});
