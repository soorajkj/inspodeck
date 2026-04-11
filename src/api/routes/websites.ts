import { zValidator } from "@hono/zod-validator";
import { bodyLimit } from "hono/body-limit";
import { encodeBase64 } from "hono/utils/encode";
import { hono } from "@/lib/hono";
import {
  createWebsiteWithoutImageSchema,
  updateWebsiteImageSchema,
} from "@/utils/schemas/website";

export const websitesRoute = hono
  .createApp()
  .get("/", async (c) => {
    const db = c.get("prisma");
    const data = await db.website.findMany({
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
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const result = data.map((site) => ({
      id: site.id,
      title: site.title,
      url: site.url,
      description: site.description,
      image: site.image,
      categories: site.categories.map((c) => c.category.name),
      pages: site.pages.map((p) => p.page.name),
      tech: site.tech.map((t) => t.tech.name),
      fonts: site.fonts.map((f) => f.font.name),
    }));

    return c.json(result);
  })
  .post("/", zValidator("json", createWebsiteWithoutImageSchema), async (c) => {
    const db = c.get("prisma");
    const form = c.req.valid("json");
    const result = await db.website.create({
      data: {
        title: form.title,
        url: form.url,
        description: form.description,
        categories: {
          create: [...new Set(form.categoryIds)].map((id) => ({
            category: { connect: { id } },
          })),
        },
        pages: {
          create: [...new Set(form.pageIds)].map((id) => ({
            page: { connect: { id } },
          })),
        },
        tech: {
          create:
            [...new Set(form.techIds)]?.map((id) => ({
              tech: { connect: { id } },
            })) || [],
        },
        fonts: {
          create:
            [...new Set(form.fontIds)]?.map((id) => ({
              font: { connect: { id } },
            })) || [],
        },
      },
    });

    return c.json(result);
  })
  .patch(
    "/:id/image",
    bodyLimit({ maxSize: 5 * 1024 * 1024 }),
    zValidator("form", updateWebsiteImageSchema),
    async (c) => {
      const db = c.get("prisma");
      const id = c.req.param("id");
      const cloudinary = c.get("cloudinary");
      const body = c.req.valid("form");

      // 1. Get old image ID to delete if it exists
      const website = await db.website.findUnique({
        where: { id },
        select: { imagePublicId: true },
      });

      if (website?.imagePublicId) {
        await cloudinary.uploader.destroy(website.imagePublicId);
      }

      // 2. Upload new image
      const file = body.image;
      const arrayBuffer = await file.arrayBuffer();
      const base46 = encodeBase64(arrayBuffer);
      const image = `data:image/png;base64,${base46}`;
      const result = await cloudinary.uploader.upload(image);

      // 3. Update database
      await db.website.update({
        where: { id },
        data: {
          image: result.secure_url,
          imagePublicId: result.public_id,
        },
      });
      return c.json(result);
    }
  )
  .delete("/:id", async (c) => {
    const db = c.get("prisma");
    const id = c.req.param("id");
    const cloudinary = c.get("cloudinary");

    // 1. Get image ID to delete
    const website = await db.website.findUnique({
      where: { id },
      select: { imagePublicId: true },
    });

    if (website?.imagePublicId) {
      await cloudinary.uploader.destroy(website.imagePublicId);
    }

    // 2. Delete from database
    const result = await db.website.delete({
      where: { id },
    });

    return c.json(result);
  });
