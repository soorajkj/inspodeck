import { hono } from "@/lib/hono";

export const optAuthMiddleware = hono.createMiddleware(async (c, next) => {
  const auth = c.get("auth");

  const session = await auth.api.getSession({
    headers: c.req.raw.headers,
  });

  if (!session) {
    c.set("user", null);
    c.set("session", null);
    await next();
    return;
  }

  c.set("user", session.user);
  c.set("session", session.session);
  await next();
});
