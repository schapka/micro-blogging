/** GET /health — liveness check. */
export default defineEventHandler(() => ({ ok: true }));
