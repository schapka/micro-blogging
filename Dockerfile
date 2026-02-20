# =============================================================================
# Base
# =============================================================================
FROM node:24-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# =============================================================================
# Build — install dependencies and build all workspaces
# =============================================================================
FROM base AS build

WORKDIR /usr/src/app
COPY . .

ENV CI=true
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

# Produce standalone production deployments (flattened node_modules, no symlinks)
RUN pnpm deploy --filter=@repo/backend --prod /prod/backend
RUN pnpm deploy --filter=@repo/web-app --prod /prod/web-app

# =============================================================================
# Runtime — backend (Node.js alpine)
# =============================================================================
FROM node:24-alpine AS backend

WORKDIR /app
COPY --from=build /prod/backend .

ENV NODE_ENV=production
ENV PORT=3001
EXPOSE 3001

CMD ["node", "./dist/main.js"]

# =============================================================================
# Runtime — web-app (distroless)
# =============================================================================
FROM gcr.io/distroless/nodejs24-debian12 AS web-app

WORKDIR /app
COPY --from=build /prod/web-app .

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

CMD ["./dist/server/index.mjs"]
