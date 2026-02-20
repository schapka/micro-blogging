import { Hono, type Context } from "hono";
import { postsTable, usersTable } from "./db/schema.ts";
import { db } from "./db/db.ts";
import { eq, getTableColumns } from "drizzle-orm";

export const users = new Hono();

/**
 * For the purpose of this project we assume to have a static autrhenticated user
 */
const currentUsername = "starloam";

users.get("/", async (c) => {
  const users = await db.select().from(usersTable);
  return c.json({ data: users });
});

users.get("/me", async (c) => {
  const user = await findUserByUsername(currentUsername);
  if (!user) {
    return createNotFound(c, "User not found");
  }
  return c.json({ data: user });
});

users.get("/me/posts", async (c) => {
  const posts = await findPostsByUsername(currentUsername);
  return c.json({ data: posts });
});

users.get("/:username", async (c) => {
  const username = c.req.param("username");
  const user = await findUserByUsername(username);
  if (!user) {
    return createNotFound(c, "User not found");
  }
  return c.json({ data: user });
});

users.get("/:username/posts", async (c) => {
  const username = c.req.param("username");
  const posts = await findPostsByUsername(username);
  return c.json({ data: posts });
});

async function findUserByUsername(username: string) {
  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.username, username));

  return user ?? null;
}

async function findPostsByUsername(username: string) {
  return db
    .select(getTableColumns(postsTable))
    .from(postsTable)
    .fullJoin(usersTable, eq(postsTable.userId, usersTable.id))
    .where(eq(usersTable.username, username));
}

function createNotFound(c: Context, error = "not found") {
  return c.json({ error }, 404);
}
