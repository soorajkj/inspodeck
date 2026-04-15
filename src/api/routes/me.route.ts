import { hono } from "@/lib/hono";
import { authMiddleware } from "@/api/middlewares/auth.middleware";

export const meRoute = hono
  .createApp()
  .use(authMiddleware)
  .get("/likes", async (c) => {
    const db = c.get("prisma");
    const user = c.get("user");

    try {
      const likes = await db.like.findMany({
        where: {
          userId: user!.id,
        },
        include: {
          website: {
            include: {
              categories: { include: { category: true } },
              pages: { include: { page: true } },
              tech: { include: { tech: true } },
              fonts: { include: { font: true } },
              _count: { select: { likes: true } },
            },
          },
        },
        orderBy: {
          createdAt: "desc", // recently liked first
        },
      });

      const data = likes.map((l) => {
        const w = l.website;

        return {
          id: w.id,
          title: w.title,
          url: w.url,
          description: w.description,
          image: w.image,

          categories: w.categories.map((c) => c.category.name),
          pages: w.pages.map((p) => p.page.name),
          tech: w.tech.map((t) => t.tech.name),
          fonts: w.fonts.map((f) => f.font.name),

          likesCount: w._count.likes,
          isLiked: true, // obvious here
        };
      });

      return c.json(data);
    } catch (error) {
      throw error;
    }
  });
