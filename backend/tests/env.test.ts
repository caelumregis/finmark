import { describe, expect, it } from "vitest";

import { parseEnvironment } from "../src/config/env.js";

describe("environment configuration", () => {
  it("applies development defaults", () => {
    const environment = parseEnvironment({});

    expect(environment).toEqual({
      NODE_ENV: "development",
      PORT: 3001,
      LOG_LEVEL: "info",
      FRONTEND_ORIGIN: "http://localhost:5173",
    });
  });

  it("coerces a valid port string to a number", () => {
    const environment = parseEnvironment({
      PORT: "4000",
    });

    expect(environment.PORT).toBe(4000);
  });

  it("rejects an invalid port", () => {
    expect(() =>
      parseEnvironment({
        PORT: "invalid",
      }),
    ).toThrowError(/PORT/);
  });

  it("rejects an invalid frontend origin", () => {
    expect(() =>
      parseEnvironment({
        FRONTEND_ORIGIN: "not-a-url",
      }),
    ).toThrowError(/FRONTEND_ORIGIN/);
  });
});
