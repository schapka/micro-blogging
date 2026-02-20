# Microblogging

A minimal social microblogging platform.

## Structure

pnpm monorepo with two apps. The API is a standalone service; the web app is a consumer of it.

```
apps/
├── backend/    # Hono REST API
└── web-app/    # Nuxt.js frontend
```

## Getting started

**Prerequisites:** Node.js 24, pnpm

**Local development**

```sh
pnpm install
pnpm dev
```

Web App: `http://localhost:3000` · Backend: `http://localhost:3001`

## Profiles

Authentication is statically mocked — the logged-in user is always **starloam**.

| URL                                       | User     | Role                              |
| ----------------------------------------- | -------- | --------------------------------- |
| `http://localhost:3000/profiles/me`       | starloam | Logged-in user — can create posts |
| `http://localhost:3000/profiles/nullvoid` | nullvoid | Another user — read-only view     |

**Docker Compose**

```sh
docker compose up --build
```

Frontend: `http://localhost:3000`

## Commands

| Command          | Description                        |
| ---------------- | ---------------------------------- |
| `pnpm dev`       | Start both apps in watch mode      |
| `pnpm build`     | Build both apps for production     |
| `pnpm start`     | Start both built apps              |
| `pnpm typecheck` | Type-check all apps                |
| `pnpm clean`     | Remove all ignored/generated files |

## Environment Variables

### Backend

| Variable       | Default     | Description               |
| -------------- | ----------- | ------------------------- |
| `PORT`         | `3001`      | Port the API listens on   |
| `DATABASE_URL` | `sqlite.db` | SQLite database file path |

### Web-App

| Variable       | Default                 | Description                 |
| -------------- | ----------------------- | --------------------------- |
| `API_BASE_URL` | `http://localhost:3001` | Base URL of the backend API |

## Database

The backend uses [SQLite](https://sqlite.org) via [better-sqlite3](https://github.com/WiseLibs/better-sqlite3) — no external database service required. Data is persisted to a file on a named Docker volume.

Migrations are plain SQL files generated locally via [Drizzle Kit](https://orm.drizzle.team/docs/kit-overview) and applied automatically at startup.

**After changing the schema, regenerate migrations:**

```sh
pnpm --filter @repo/backend db:generate
```

Commit the generated files — they are baked into the Docker image and applied at startup.

## Technologies

- **[Nuxt.js](https://nuxt.com)** — frontend (Node server mode)
- **[Hono](https://hono.dev)** — backend API
- **[Drizzle ORM](https://orm.drizzle.team)** — schema definition and migrations
- **pnpm workspaces** — monorepo tooling
- **Docker Compose** — containerised deployment
