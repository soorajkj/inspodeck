import { createFactory } from "hono/factory";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { cloudinary } from "./cloudinary";

type Variables = {
  prisma: typeof prisma;
  auth: typeof auth;
  user: typeof auth.$Infer.Session.user;
  cloudinary: typeof cloudinary;
};

type ApiBindings = { Variables: Variables };

export const hono = createFactory<ApiBindings>({
  defaultAppOptions: { strict: false },
  initApp(app) {
    app.use(async (c, next) => {
      c.set("prisma", prisma);
      c.set("auth", auth);
      c.set("cloudinary", cloudinary);
      await next();
    });
  },
});
