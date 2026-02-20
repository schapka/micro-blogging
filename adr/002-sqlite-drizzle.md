# ADR-002: SQLite + Drizzle ORM

**Status:** Accepted

**Context:** The app needs a persistent store. Running a separate database service adds operational overhead that isn't justified for this scope.

**Decision:** Use SQLite via better-sqlite3 with Drizzle ORM. The database is a single file on a named Docker volume.

**Consequences:** No external service to run or connect to. Drizzle abstracts the database layer. Migrations are plain SQL files committed to the repo and applied at startup before the server begins accepting requests.
