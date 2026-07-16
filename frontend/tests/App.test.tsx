import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { App } from "../src/App";

describe("App health status", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("shows the loading state before reporting a healthy API", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
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
      ),
    );

    render(<App />);

    expect(
      screen.getByRole("heading", {
        name: "Checking API",
      }),
    ).toBeInTheDocument();

    expect(
      await screen.findByRole("heading", {
        name: "API operational",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/connected successfully to/i),
    ).toHaveTextContent("finmark-api");
  });

  it("shows an unavailable state when the API cannot be reached", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new TypeError("Failed to fetch")),
    );

    render(<App />);

    expect(
      await screen.findByRole("heading", {
        name: "API unavailable",
      }),
    ).toBeInTheDocument();

    expect(screen.getByText("Failed to fetch")).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: "Check again",
      }),
    ).toBeInTheDocument();
  });

  it("allows the user to retry a failed health check", async () => {
    const user = userEvent.setup();

    const fetchMock = vi
      .fn()
      .mockRejectedValueOnce(new TypeError("Failed to fetch"))
      .mockResolvedValueOnce(
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

    render(<App />);

    await screen.findByRole("heading", {
      name: "API unavailable",
    });

    await user.click(
      screen.getByRole("button", {
        name: "Check again",
      }),
    );

    expect(
      await screen.findByRole("heading", {
        name: "API operational",
      }),
    ).toBeInTheDocument();

    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});
