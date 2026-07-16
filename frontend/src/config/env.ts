import { z } from "zod";

const environmentSchema = z.object({
  VITE_API_BASE_URL: z
    .string()
    .url()
    .default("http://localhost:3001"),
});

const result = environmentSchema.safeParse(import.meta.env);

if (!result.success) {
  console.error(
    "Invalid frontend environment configuration:",
    z.treeifyError(result.error),
  );

  throw new Error("Invalid frontend environment configuration.");
}

export const env = result.data;
