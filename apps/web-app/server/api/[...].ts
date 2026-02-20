import { env } from "../env";

export default defineEventHandler(async (event) => {
  const url = new URL(event.path, env.API_BASE_URL);
  return proxyRequest(event, url.toString());
});
