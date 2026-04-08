import { HTTPException } from "hono/http-exception";
import { hono } from "@/lib/hono";

export const authMiddleware = hono.createMiddleware(async (c, next) => {
  const auth = c.get("auth");
  const session = await auth.api.getSession({
    headers: c.req.raw.headers,
  });

  if (!session) throw new HTTPException(401, { message: "Unauthorized" });

  c.set("user", session.user);
  await next();
});
