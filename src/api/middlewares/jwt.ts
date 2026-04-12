import { jwt } from "hono/jwt";
import { hono } from "@/lib/hono";

export const jwtMiddleware = hono.createMiddleware(async (c, next) => {
  const middleware = jwt({
    secret: process.env.JWT_SECRET!,
    alg: "HS256",
  });
  return middleware(c, next);
});
