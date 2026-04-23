import { hono } from "@/lib/hono";
import { websitesRoute } from "./routes/websites.route";
import { authRoute } from "./routes/auth.route";
import { adminRoute } from "./routes/admin.route";
import { handleError } from "./utils/error";
import { categoriesRoute } from "./routes/categories.route";

export const api = hono
  .createApp()
  .basePath("/api")
  .route("/auth", authRoute)
  .route("/admin", adminRoute)
  .route("/websites", websitesRoute)
  .route("/categories", categoriesRoute)
  .onError(handleError);

export type ApiType = typeof api;
