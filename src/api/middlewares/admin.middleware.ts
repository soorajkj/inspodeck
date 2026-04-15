import { HTTPException } from "hono/http-exception";
import { hono } from "@/lib/hono";

export const adminMiddleware = hono.createMiddleware(async (c, next) => {
  const user = c.get("user");

  if (!user || user.role !== "admin") {
    throw new HTTPException(403, { message: "Forbidden" });
  }

  await next();
});
