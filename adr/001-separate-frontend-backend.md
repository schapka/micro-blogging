# ADR-001: Separate frontend and backend services

**Status:** Accepted

**Context:** A monolith would be simpler to deploy, but would mix concerns.

**Decision:** Run frontend (Nuxt) and backend (Hono) as separate services. The frontend proxies `/api/*` to the backend.

**Consequences:** The API is independently deployable and consumable by any client. The proxy makes it possible to keep the backend off the public internet and to attach auth credentials server-side rather than exposing them to the browser.
