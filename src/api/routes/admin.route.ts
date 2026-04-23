import { bodyLimit } from "hono/body-limit";
import { encodeBase64 } from "hono/utils/encode";
import normalizeUrl from "normalize-url";
import { zValidator } from "@hono/zod-validator";
import { createId } from "@paralleldrive/cuid2";
import { hono } from "@/lib/hono";
import { authMiddleware } from "@/api/middlewares/auth.middleware";
import {
  createWebsiteSchema,
  updateWebsiteAssetsSchema,
} from "@/utils/schemas/website";

export const adminRoute = hono
  .createApp()
  .use(authMiddleware)
  .get("/websites", async (c) => {
    const db = c.get("prisma");

    try {
      const websites = await db.website.findMany({
        include: {
          categories: {
            include: {
              category: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      const result = websites.map((site) => ({
        ...site,
        categories: site.categories.map((c) => c.category.name),
      }));

      return c.json(result);
    } catch (error) {
      throw error;
    }
  })
  .post(
    "/websites",
    zValidator("json", createWebsiteSchema, (r) => {
      if (!r.success) throw r.error;
    }),
    async (c) => {
      const db = c.get("prisma");
      const json = c.req.valid("json");

      const id = createId();

      const url = normalizeUrl(json.baseUrl, {
        stripHash: true,
        removeQueryParameters: true,
        removePath: true,
      });

      try {
        const result = await db.website.create({
          data: {
            id,
            name: json.name,
            baseUrl: url,
            description: json.description,
            categories: {
              create: json.categories?.map((categoryId: string) => ({
                categoryId,
              })),
            },
          },
        });

        return c.json(result);
      } catch (error) {
        throw error;
      }
    }
  )
  .patch(
    "/websites/:id/assests",
    bodyLimit({ maxSize: 5 * 1024 * 1024 }),
    zValidator("form", updateWebsiteAssetsSchema, (r) => {
      if (!r.success) throw r.error;
    }),
    async (c) => {
      try {
        const db = c.get("prisma");
        const cloudinary = c.get("cloudinary");
        const { id } = c.req.param();
        const form = c.req.valid("form");

        const iconFile = form.icon;
        const iconArrayBuffer = await iconFile.arrayBuffer();
        const iconBase46 = encodeBase64(iconArrayBuffer);
        const iconImage = `data:${iconFile.type};base64,${iconBase46}`;

        const thumbnailFile = form.thumbnail;
        const thumbnailArrayBuffer = await thumbnailFile.arrayBuffer();
        const thumbnailBase46 = encodeBase64(thumbnailArrayBuffer);
        const thumbnailImage = `data:${thumbnailFile.type};base64,${thumbnailBase46}`;

        const [icon, thumbnail] = await Promise.all([
          cloudinary.uploader.upload(iconImage, {
            public_id: id,
            folder: "icons",
            overwrite: true,
            invalidate: true,
          }),

          cloudinary.uploader.upload(thumbnailImage, {
            public_id: id,
            folder: "thumbnails",
            overwrite: true,
            invalidate: true,
          }),
        ]);

        const result = await db.website.update({
          where: { id },
          data: {
            icon: icon.secure_url,
            thumbnail: thumbnail.secure_url,
          },
        });

        return c.json(result);
      } catch (error) {
        throw error;
      }
    }
  )
  .get("/websites/:id", async (c) => {
    const db = c.get("prisma");
    const { id } = c.req.param();

    try {
      const result = await db.website.findFirst({
        where: { id },
      });

      return c.json(result);
    } catch (error) {
      throw error;
    }
  })
  .delete("/websites/:id", async (c) => {
    const db = c.get("prisma");
    const { id } = c.req.param();
    const cloudinary = c.get("cloudinary");

    try {
      await Promise.all([
        cloudinary.uploader.destroy(`icons/${id}`),
        cloudinary.uploader.destroy(`thumbnails/${id}`),
      ]);

      const result = await db.website.delete({
        where: { id },
      });

      return c.json(result);
    } catch (error) {
      throw error;
    }
  })
  .get("/categories", async (c) => {
    const db = c.get("prisma");

    const categories = await db.category.findMany({
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
      },
    });

    return c.json(categories);
  });
