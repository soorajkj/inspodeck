import { zValidator } from "@hono/zod-validator";
import { bodyLimit } from "hono/body-limit";
import { encodeBase64 } from "hono/utils/encode";
import { hono } from "@/lib/hono";
import {
  createWebsiteWithoutImageSchema,
  updateWebsiteImageSchema,
} from "@/utils/schemas/website";
import { authMiddleware } from "@/api/middlewares/auth.middleware";

export const websitesRoute = hono
  .createApp()
  .get("/", authMiddleware, async (c) => {
    const db = c.get("prisma");
    const user = c.get("user");

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
        _count: {
          select: { likes: true },
        },
        likes: user
          ? {
              where: { userId: user.id },
              select: { id: true },
            }
          : false,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const result = data.map((w) => ({
      id: w.id,
      title: w.title,
      url: w.url,
      description: w.description,
      image: w.image,
      categories: w.categories.map((c) => c.category.name),
      pages: w.pages.map((p) => p.page.name),
      tech: w.tech.map((t) => t.tech.name),
      fonts: w.fonts.map((f) => f.font.name),
      likeCount: w._count.likes,
      isLiked: !!w.likes?.length,
    }));

    return c.json(result);
  })
  .post(
    "/",
    authMiddleware,
    zValidator("json", createWebsiteWithoutImageSchema),
    async (c) => {
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
    }
  )
  .patch(
    "/:id/image",
    bodyLimit({ maxSize: 5 * 1024 * 1024 }),
    zValidator("form", updateWebsiteImageSchema),
    async (c) => {
      const db = c.get("prisma");
      const id = c.req.param("id");
      const cloudinary = c.get("cloudinary");
      const body = c.req.valid("form");

      // Upload new image using website ID as the public_id
      const file = body.image;
      const arrayBuffer = await file.arrayBuffer();
      const base46 = encodeBase64(arrayBuffer);
      const image = `data:image/png;base64,${base46}`;
      const result = await cloudinary.uploader.upload(image, {
        public_id: id,
        overwrite: true,
        invalidate: true,
      });

      // Update database
      await db.website.update({
        where: { id },
        data: { image: result.secure_url },
      });
      return c.json(result);
    }
  )
  .delete("/:id", async (c) => {
    const db = c.get("prisma");
    const id = c.req.param("id");
    const cloudinary = c.get("cloudinary");

    // Delete image from Cloudinary using the website ID as public_id
    await cloudinary.uploader.destroy(id);

    // Delete from database
    const result = await db.website.delete({
      where: { id },
    });

    return c.json(result);
  })
  .post("/:id/like", authMiddleware, async (c) => {
    const db = c.get("prisma");
    const id = c.req.param("id");
    const user = c.get("user");

    const existingLike = await db.like.findUnique({
      where: {
        userId_websiteId: {
          userId: user.id,
          websiteId: id,
        },
      },
    });

    if (existingLike) {
      await db.like.delete({
        where: { id: existingLike.id },
      });
      return c.json({ liked: false });
    }

    await db.like.create({
      data: {
        userId: user.id,
        websiteId: id,
      },
    });

    return c.json({ liked: true });
  })
  .get("/likes", authMiddleware, async (c) => {
    const db = c.get("prisma");
    const user = c.get("user");

    const data = await db.website.findMany({
      where: {
        likes: {
          some: {
            userId: user.id,
          },
        },
      },
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
          select: { likes: true },
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
      likeCount: site._count.likes,
      isLiked: true,
    }));

    return c.json(result);
  });
