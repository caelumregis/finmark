import request from "supertest";
import { describe, expect, it } from "vitest";

import { createApp } from "../src/app.js";

describe("GET /health", () => {
  it("returns the service health response", async () => {
    const response = await request(createApp()).get("/health");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: "ok",
      service: "finmark-api",
    });

    expect(response.headers["content-type"]).toMatch(
      /^application\/json/,
    );
  });

  it("generates a request ID", async () => {
    const response = await request(createApp()).get("/health");

    expect(response.headers["x-request-id"]).toEqual(
      expect.any(String),
    );

    expect(response.headers["x-request-id"]).not.toHaveLength(0);
  });

  it("preserves a valid supplied request ID", async () => {
    const response = await request(createApp())
      .get("/health")
      .set("x-request-id", "learning-request-001");

    expect(response.headers["x-request-id"]).toBe(
      "learning-request-001",
    );
  });

  it("returns security headers", async () => {
    const response = await request(createApp()).get("/health");

    expect(response.headers["x-content-type-options"]).toBe(
      "nosniff",
    );

    expect(response.headers["x-frame-options"]).toBe(
      "SAMEORIGIN",
    );
  });

  it("returns the configured CORS origin", async () => {
    const response = await request(createApp())
      .get("/health")
      .set("origin", "http://localhost:5173");

    expect(response.headers["access-control-allow-origin"]).toBe(
      "http://localhost:5173",
    );

    expect(
      response.headers["access-control-allow-credentials"],
    ).toBe("true");
  });
});
