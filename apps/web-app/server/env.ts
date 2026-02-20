/**
 * Validated runtime environment configuration for the Nuxt server.
 * Throws at startup if required variables are missing or malformed.
 */
import { env as processEnv } from "node:process";
import { prettifyError, z } from "zod/v4";

const envSchema = z.object({
  API_BASE_URL: z.url().default("http://localhost:3001"),
});

type Env = z.infer<typeof envSchema>;

function getEnv(): Env {
  console.log("API_BASE_URL", processEnv.API_BASE_URL);
  const parseResult = envSchema.safeParse(processEnv);
  if (!parseResult.success) {
    throw new Error(
      `Invalid environment configuration: ${prettifyError(parseResult.error)}`,
    );
  }
  console.log("Env:", JSON.stringify(parseResult.data, null, 2));
  return parseResult.data;
}

export const env = getEnv();
