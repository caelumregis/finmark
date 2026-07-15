import type { Server } from "node:http";

import { createApp } from "./app.js";
import { env } from "./config/env.js";
import { logger } from "./lib/logger.js";

const app = createApp();

const server: Server = app.listen(env.PORT, () => {
  logger.info(
    {
      port: env.PORT,
    },
    "FinMark API started",
  );
});

let shutdownStarted = false;

function shutdown(signal: NodeJS.Signals) {
  if (shutdownStarted) {
    return;
  }

  shutdownStarted = true;

  logger.info(
    {
      signal,
    },
    "Graceful shutdown started",
  );

  const forcedShutdownTimer = setTimeout(() => {
    logger.error("Graceful shutdown timed out");
    process.exit(1);
  }, 10_000);

  forcedShutdownTimer.unref();

  server.close((error) => {
    clearTimeout(forcedShutdownTimer);

    if (error) {
      logger.error(
        {
          error,
        },
        "HTTP server failed to close",
      );

      process.exitCode = 1;
      return;
    }

    logger.info("HTTP server stopped");
  });
}

process.once("SIGTERM", () => {
  shutdown("SIGTERM");
});

process.once("SIGINT", () => {
  shutdown("SIGINT");
});
