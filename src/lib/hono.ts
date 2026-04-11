import { createFactory } from "hono/factory";
import { v2 } from "cloudinary";
import { prisma } from "@/lib/prisma";

type Variables = {
  prisma: typeof prisma;
  cloudinary: typeof v2;
};

type ApiBindings = {
  Variables: Variables;
};

export const hono = createFactory<ApiBindings>({
  defaultAppOptions: { strict: false },
  initApp(app) {
    app.use(async (c, next) => {
      c.set("prisma", prisma);
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
