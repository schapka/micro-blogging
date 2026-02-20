import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { env } from "./env.ts";
import { prepareDatabase } from "./db/db.ts";
import { users } from "./users.ts";

const app = new Hono();

app.get("/health", (c) => {
  return c.json({ ok: true });
});

app.route("/api/users", users);

async function bootstrap() {
  await prepareDatabase();

  serve(
    {
      fetch: app.fetch,
      port: env.PORT,
      hostname: "::",
    },
    (info) => {
      console.log(`Server is running on http://[${info.address}]:${info.port}`);
    },
  );
}

bootstrap().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
