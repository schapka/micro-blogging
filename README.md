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

| Variable | Default | Description             |
| -------- | ------- | ----------------------- |
| `PORT`   | `3001`  | Port the API listens on |

### Web-App

| Variable       | Default                 | Description                 |
| -------------- | ----------------------- | --------------------------- |
| `API_BASE_URL` | `http://localhost:3001` | Base URL of the backend API |

## Technologies

- **[Nuxt.js](https://nuxt.com)** — frontend (Node server mode)
- **[Hono](https://hono.dev)** — backend API
- **pnpm workspaces** — monorepo tooling
- **Docker Compose** — containerised deployment
