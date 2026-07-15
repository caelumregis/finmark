import dotenv from "dotenv";
import { z } from "zod";

dotenv.config({ quiet: true });

const environmentSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),

  PORT: z.coerce
    .number()
    .int()
    .min(1)
    .max(65535)
    .default(3001),

  LOG_LEVEL: z
    .enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"])
    .default("info"),

  FRONTEND_ORIGIN: z
    .string()
    .url()
    .default("http://localhost:5173"),
});

const result = environmentSchema.safeParse(process.env);

if (!result.success) {
  const details = result.error.issues
    .map((issue) => {
      const field = issue.path.join(".") || "environment";
      return `${field}: ${issue.message}`;
    })
    .join("; ");

  throw new Error(`Invalid environment configuration: ${details}`);
}

export const env = result.data;

export type Environment = typeof env;
