import { afterEach, describe, expect, it, vi } from "vitest";

import { getHealth } from "../src/api/health";

describe("getHealth", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns a validated health response", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          status: "ok",
          service: "finmark-api",
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        },
      ),
    );

    vi.stubGlobal("fetch", fetchMock);

    await expect(getHealth()).resolves.toEqual({
      status: "ok",
      service: "finmark-api",
    });

    expect(fetchMock).toHaveBeenCalledWith(
      "http://localhost:3001/health",
      expect.objectContaining({
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }),
    );
  });

  it("rejects unsuccessful HTTP responses", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(null, {
          status: 503,
        }),
      ),
    );

    await expect(getHealth()).rejects.toThrow(
      "Health request failed with status 503.",
    );
  });

  it("rejects a response that violates the API contract", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            status: "available",
            service: "unknown-service",
          }),
          {
            status: 200,
            headers: {
              "Content-Type": "application/json",
            },
          },
        ),
      ),
    );

    await expect(getHealth()).rejects.toThrow(
      "Health response did not match the expected API contract.",
    );
  });
});
