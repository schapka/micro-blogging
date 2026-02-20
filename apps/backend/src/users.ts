import { Hono, type Context } from "hono";
import { desc, eq, getTableColumns } from "drizzle-orm";
import { validator } from "hono/validator";
import { treeifyError, z } from "zod/v4";
import { postsTable, usersTable } from "./db/schema.ts";
import { db } from "./db/db.ts";

const createPostSchema = z.object({
  content: z.string().trim().min(1).max(280),
});

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

users.post(
  "/me/posts",
  validator("json", (value, c) => {
    const parseResult = createPostSchema.safeParse(value);
    if (!parseResult.success) {
      return c.json(
        {
          error: "Bad request",
          errorFields: treeifyError(parseResult.error),
        },
        400,
      );
    }
    return parseResult.data;
  }),
  async (c) => {
    const { content } = c.req.valid("json");
    const post = await createPost(content);
    return c.json({ data: post });
  },
);

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
    .orderBy(desc(postsTable.createdAt))
    .leftJoin(usersTable, eq(postsTable.userId, usersTable.id))
    .where(eq(usersTable.username, username));
}

async function createPost(content: string) {
  const user = await findUserByUsername(currentUsername);

  if (!user) {
    throw new Error(`User not found: ${currentUsername}`);
  }

  const [post] = await db
    .insert(postsTable)
    .values({ userId: user.id, content })
    .returning(getTableColumns(postsTable));

  return post;
}

function createNotFound(c: Context, error = "not found") {
  return c.json({ error }, 404);
}
