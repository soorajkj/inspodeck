import { auth } from "@/lib/auth";
import { hono } from "@/lib/hono";

export const authRoute = hono
  .createApp()
  .on(["POST", "GET"], "/*", (c) => auth.handler(c.req.raw));
