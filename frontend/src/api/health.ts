import { z } from "zod";

import { env } from "../config/env";

const healthResponseSchema = z.object({
  status: z.literal("ok"),
  service: z.literal("finmark-api"),
});

export type HealthResponse = z.infer<typeof healthResponseSchema>;

export async function getHealth(
  signal?: AbortSignal,
): Promise<HealthResponse> {
  const response = await fetch(`${env.VITE_API_BASE_URL}/health`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    signal,
  });

  if (!response.ok) {
    throw new Error(
      `Health request failed with status ${response.status}.`,
    );
  }

  const payload: unknown = await response.json();
  const result = healthResponseSchema.safeParse(payload);

  if (!result.success) {
    throw new Error(
      "Health response did not match the expected API contract.",
    );
  }

  return result.data;
}
