import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { env } from "./env.js";

const app = new Hono();

app.get("/health", (c) => {
  return c.json({ ok: true });
});

app.get("/api/test", (c) => {
  return c.json({ ok: true });
});

serve(
  {
    fetch: app.fetch,
    port: env.PORT,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
