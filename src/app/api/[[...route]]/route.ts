import { handle } from "hono/vercel";
import { HTTPException } from "hono/http-exception";
import { hono } from "@/lib/hono";
import { authRoute } from "@/api/routes/auth";
import { websitesRoute } from "@/api/routes/websites";

const app = hono
  .createApp()
  .basePath("/api")
  .route("/auth", authRoute)
  .route("/websites", websitesRoute)
  .onError(async (err, c) => {
    console.log(err);
    switch (true) {
      case err instanceof HTTPException:
        return err.getResponse();
      default:
        return c.json({ err: err.message }, 500);
    }
  });

export const GET = handle(app);
export const POST = handle(app);
export const DELETE = handle(app);
export const PATCH = handle(app);
export const PUT = handle(app);

export type ApiType = typeof app;
