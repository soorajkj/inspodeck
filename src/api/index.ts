import { HTTPException } from "hono/http-exception";
import { hono } from "@/lib/hono";
import { websitesRoute } from "@/api/routes/websites.route";
import { categoriesRoute } from "@/api/routes/categories.route";
import { pagesRoute } from "@/api/routes/pages.route";
import { techRoute } from "@/api/routes/tech.route";
import { fontsRoute } from "@/api/routes/fonts.route";
import { authRoute } from "@/api/routes/auth.route";

export const api = hono
  .createApp()
  .basePath("/api")
  .route("/auth", authRoute)
  .route("/websites", websitesRoute)
  .route("/categories", categoriesRoute)
  .route("/pages", pagesRoute)
  .route("/tech", techRoute)
  .route("/fonts", fontsRoute)
  .onError(async (err, c) => {
    console.error("Something went wrong -> API: ", err);
    if (err instanceof HTTPException) {
      return err.getResponse();
    }
    return c.json("Internal server error", 500);
  });

export type ApiType = typeof api;
