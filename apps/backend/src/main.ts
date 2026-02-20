import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { env } from "./env.ts";
import { db, prepareDatabase } from "./db/db.ts";
import { usersTable } from "./db/schema.ts";

const app = new Hono();

app.get("/health", (c) => {
  return c.json({ ok: true });
});

/**
 * Temporary endpoint for development
 */
app.get("/api/test", (c) => {
  return c.json({ ok: true });
});

/**
 * Temporary endpoint for development
 */
app.get("/api/users", async (c) => {
  const users = await db.select().from(usersTable);
  return c.json({ data: users });
});

async function bootstrap() {
  await prepareDatabase();

  serve(
    {
      fetch: app.fetch,
      port: env.PORT,
    },
    (info) => {
      console.log(`Server is running on http://localhost:${info.port}`);
    },
  );
}

bootstrap().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
