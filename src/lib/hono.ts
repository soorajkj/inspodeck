import { createFactory } from "hono/factory";
import { v2 } from "cloudinary";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { Env } from "@/types/hono";

export const hono = createFactory<Env>({
  defaultAppOptions: { strict: false },
  initApp(app) {
    app.use(async (c, next) => {
      c.set("prisma", prisma);
      c.set("auth", auth);
      v2.config({
        cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });
      c.set("cloudinary", v2);
      await next();
    });
  },
});
