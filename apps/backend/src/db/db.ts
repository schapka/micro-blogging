import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { eq } from "drizzle-orm";
import { env } from "../env.ts";
import { postsTable, usersTable } from "./schema.ts";
import { postSeeds, userSeeds } from "./seeds.ts";

function migrateDatabase() {
  migrate(db, {
    migrationsFolder: "./drizzle",
  });
}

async function seedDatabase() {
  await db
    .insert(usersTable)
    .values(
      userSeeds.map(({ username, avatarUrl }) => ({ username, avatarUrl })),
    )
    .onConflictDoNothing();

  const existingPosts = await db.select().from(postsTable).limit(1);
  if (existingPosts.length > 0) {
    // Posts already seeded — skip to avoid duplicates on restart.
    return;
  }

  for (const [username, posts] of postSeeds) {
    const [user] = await db
      .select({ id: usersTable.id })
      .from(usersTable)
      .where(eq(usersTable.username, username));

    if (!user) continue;

    await db
      .insert(postsTable)
      .values(posts.map((content) => ({ userId: user.id, content })));
  }
}

export async function prepareDatabase() {
  migrateDatabase();
  await seedDatabase();
}

const sqlite = new Database(env.DATABASE_URL);

export const db = drizzle({ client: sqlite });
