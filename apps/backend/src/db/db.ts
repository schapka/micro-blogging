import { type InferInsertModel } from "drizzle-orm";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { env } from "../env.ts";
import { usersTable } from "./schema.ts";

type UserInsert = InferInsertModel<typeof usersTable>;

const users: UserInsert[] = [
  {
    username: "starloam",
    avatarUrl: "https://i.pravatar.cc/300?img=48",
  },
  {
    username: "nullvoid",
    avatarUrl: "https://i.pravatar.cc/300?img=13",
  },
];

function migrateDatabase() {
  migrate(db, {
    migrationsFolder: "./drizzle",
  });
}

async function seedDatabase() {
  await db.insert(usersTable).values(users).onConflictDoNothing();
}

export async function prepareDatabase() {
  migrateDatabase();
  await seedDatabase();
}

const sqlite = new Database(env.DATABASE_URL);

export const db = drizzle({ client: sqlite });
