/**
 * Validated runtime environment configuration for the backend.
 * Throws at startup if required variables are missing or malformed.
 */
import { env as processEnv } from "node:process";
import { prettifyError, z } from "zod/v4";

const envSchema = z.object({
  PORT: z.coerce.number().default(3001),
  DATABASE_URL: z.string().default("sqlite.db"),
});

type Env = z.infer<typeof envSchema>;

function getEnv(): Env {
  const parseResult = envSchema.safeParse(processEnv);
  if (!parseResult.success) {
    throw new Error(
      `Invalid environment configuration: ${prettifyError(parseResult.error)}`,
    );
  }
  return parseResult.data;
}

export const env = getEnv();
