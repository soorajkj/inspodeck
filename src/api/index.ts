import { hono } from "@/lib/hono";
import { websitesRoute } from "@/api/routes/websites.route";
import { categoriesRoute } from "@/api/routes/categories.route";
import { pagesRoute } from "@/api/routes/pages.route";
import { techRoute } from "@/api/routes/tech.route";
import { fontsRoute } from "@/api/routes/fonts.route";
import { authRoute } from "@/api/routes/auth.route";
import { adminRoute } from "@/api/routes/admin.route";
import { meRoute } from "@/api/routes/me.route";
import { handleError } from "@/api/utils/error";

export const api = hono
  .createApp()
  .basePath("/api")
  .route("/auth", authRoute)
  .route("/admin", adminRoute)
  .route("/websites", websitesRoute)
  .route("/me", meRoute)
  .route("/categories", categoriesRoute)
  .route("/pages", pagesRoute)
  .route("/tech", techRoute)
  .route("/fonts", fontsRoute)
  .onError(handleError);

export type ApiType = typeof api;
