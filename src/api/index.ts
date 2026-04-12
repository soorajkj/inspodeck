import { hono } from "@/lib/hono";
import { websitesRoute } from "@/api/routes/websites";
import { categoriesRoute } from "@/api/routes/categories";
import { pagesRoute } from "@/api/routes/pages";
import { techRoute } from "@/api/routes/tech";
import { fontsRoute } from "@/api/routes/fonts";
import { authRoute } from "@/api/routes/auth";

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
    console.log(err);
    return c.json("Internal server error", 500);
  });

export type ApiType = typeof api;
