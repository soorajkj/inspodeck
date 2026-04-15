import { bodyLimit } from "hono/body-limit";
import { encodeBase64 } from "hono/utils/encode";
import { hono } from "@/lib/hono";
import {
  createWebsiteWithoutImageSchema,
  updateWebsiteImageSchema,
  updateWebsiteWithoutImageSchema,
} from "@/utils/schemas/website";
import { authMiddleware } from "@/api/middlewares/auth.middleware";
import { adminMiddleware } from "@/api/middlewares/admin.middleware";
import { validator } from "@/api/utils/validator";

export const adminRoute = hono
  .createApp()
  .use(authMiddleware)
  .use(adminMiddleware)
  .get("/websites", async (c) => {
    const db = c.get("prisma");

    try {
      const result = await db.website.findMany({
        include: {
          categories: {
            include: { category: true },
          },
          pages: {
            include: { page: true },
          },
          tech: {
            include: { tech: true },
          },
          fonts: {
            include: { font: true },
          },
          _count: {
            select: {
              likes: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      const websites = result.map((w) => ({
        id: w.id,
        title: w.title,
        url: w.url,
        description: w.description,
        image: w.image,
        categories: w.categories.map((c) => c.category.name),
        pages: w.pages.map((p) => p.page.name),
        tech: w.tech.map((t) => t.tech.name),
        fonts: w.fonts.map((f) => f.font.name),
        likes: w._count.likes,
      }));

      return c.json(websites);
    } catch (error) {
      throw error;
    }
  })
  .post(
    "/websites",
    validator("json", createWebsiteWithoutImageSchema),
    async (c) => {
      const db = c.get("prisma");
      const json = c.req.valid("json");

      try {
        const result = await db.website.create({
          data: {
            title: json.title,
            url: json.url,
            description: json.description,
            categories: {
              create: [...new Set(json.categoryIds)].map((id) => ({
                category: { connect: { id } },
              })),
            },
            pages: {
              create: [...new Set(json.pageIds)].map((id) => ({
                page: { connect: { id } },
              })),
            },
            tech: {
              create:
                [...new Set(json.techIds)]?.map((id) => ({
                  tech: { connect: { id } },
                })) || [],
            },
            fonts: {
              create:
                [...new Set(json.fontIds)]?.map((id) => ({
                  font: { connect: { id } },
                })) || [],
            },
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
  .patch(
    "/websites/:id",
    validator("json", updateWebsiteWithoutImageSchema),
    async (c) => {
      const db = c.get("prisma");
      const { id } = c.req.param();
      const json = c.req.valid("json");

      try {
        const result = await db.website.update({
          where: { id },
          data: json,
        });

        return c.json(result);
      } catch (error) {
        throw error;
      }
    }
  )
  .patch(
    "/websites/:id/image",
    bodyLimit({ maxSize: 5 * 1024 * 1024 }),
    validator("form", updateWebsiteImageSchema),
    async (c) => {
      const db = c.get("prisma");
      const { id } = c.req.param();
      const cloudinary = c.get("cloudinary");
      const body = c.req.valid("form");

      const file = body.image;
      const arrayBuffer = await file.arrayBuffer();
      const base46 = encodeBase64(arrayBuffer);
      const image = `data:image/png;base64,${base46}`;

      try {
        // Upload new image using website ID as the public_id
        const result = await cloudinary.uploader.upload(image, {
          public_id: id,
          overwrite: true,
          invalidate: true,
        });

        await db.website.update({
          where: { id },
          data: { image: result.secure_url },
        });

        return c.json(result);
      } catch (error) {
        throw error;
      }
    }
  )
  .delete("/websites/:id", async (c) => {
    const db = c.get("prisma");
    const { id } = c.req.param();
    const cloudinary = c.get("cloudinary");

    try {
      // Delete image from Cloudinary using the website ID as public_id
      await cloudinary.uploader.destroy(id);

      const result = await db.website.delete({
        where: { id },
      });

      return c.json(result);
    } catch (error) {
      throw error;
    }
  });
