import z from "zod";
import { hono } from "@/lib/hono";
import { authMiddleware } from "@/api/middlewares/auth.middleware";
import { optAuthMiddleware } from "@/api/middlewares/optAuth.middleware";
import { validator } from "@/api/utils/validator";

export const websitesRoute = hono
  .createApp()
  .get("/", optAuthMiddleware, async (c) => {
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
    "/:id/like",
    authMiddleware,
    validator(
      "param",
      z.object({
        id: z.string(),
      })
    ),
    async (c) => {
      const db = c.get("prisma");
      const { id } = c.req.valid("param");
      const user = c.get("user");

      const existing = await db.like.findUnique({
        where: {
          userId_websiteId: {
            userId: user!.id,
            websiteId: id,
          },
        },
      });

      if (existing) {
        await db.like.delete({
          where: { id: existing.id },
        });
      } else {
        await db.like.create({
          data: {
            userId: user!.id,
            websiteId: id,
          },
        });
      }

      return c.json({
        success: true,
        message: "Like toggled successfully",
        data: {
          liked: !existing,
        },
      });
    }
  );
