import request from "supertest";
import app from "../app";
import { it, expect, describe } from "vitest";

describe("Utils routes", () => {
  it("Should return no issues", async () => {
    const res = await request(app)
      .post("/api/utils/check-grammar")
      .send({ content: "This is a sentence WITH a period." });

    expect(res.statusCode).toBe(200);
    expect(res.body.issues.length).toBeFalsy();
    expect(res.body.message).toBe("0 issues found");
  });

  it("Should return one issue", async () => {
    const res = await request(app)
      .post("/api/utils/check-grammar")
      .send({ content: "This is a sentence WITHOUT a period" });

    expect(res.statusCode).toBe(200);
    expect(res.body.issues.length).toBe(1);
    expect(res.body.issues[0]).toBe("Note doesn't end with a period.");
    expect(res.body.message).toBe("1 issues found");
  });

  it("Should convert markdown to html", async () => {
    const res = await request(app).post("/api/utils/convert").send({ content: "Hello world" });

    expect(res.statusCode).toBe(200);
    expect(res.body.htmlContent).toContain("<p>Hello world</p>");
    expect(res.body.message).toBe("Content converted successfully");
  });
});
