import { randomUUID } from "node:crypto";

import cors from "cors";
import express from "express";
import helmet from "helmet";
import { pinoHttp } from "pino-http";

import { env } from "./config/env.js";
import { logger } from "./lib/logger.js";

export function createApp() {
  const app = express();

  app.disable("x-powered-by");

  app.use(
    pinoHttp({
      logger,

      genReqId(request, response) {
        const suppliedRequestId = request.headers["x-request-id"];

        const requestId =
          typeof suppliedRequestId === "string" &&
          suppliedRequestId.length > 0 &&
          suppliedRequestId.length <= 128
            ? suppliedRequestId
            : randomUUID();

        response.setHeader("x-request-id", requestId);

        return requestId;
      },
    }),
  );

  app.use(helmet());

  app.use(
    cors({
      origin: env.FRONTEND_ORIGIN,
      credentials: true,
    }),
  );

  app.use(
    express.json({
      limit: "1mb",
    }),
  );

  app.get("/health", (_request, response) => {
    response.status(200).json({
      status: "ok",
      service: "finmark-api",
    });
  });

  return app;
}
