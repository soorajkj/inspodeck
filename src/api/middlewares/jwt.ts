import { getCookie } from "hono/cookie";
import { verify } from "hono/jwt";
import { hono } from "@/lib/hono";

export const jwtMiddleware = hono.createMiddleware(async (c, next) => {
  const token = getCookie(c, process.env.JWT_COOKIE_NAME!);
  if (!token) return c.json("Unauthorized", 200);
  const payload = await verify(token, process.env.JWT_SECRET!, "HS256");
  c.set("jwtPayload", payload);
  await next();
});
