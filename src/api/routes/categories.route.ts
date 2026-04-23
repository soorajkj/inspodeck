import { hono } from "@/lib/hono";

export const categoriesRoute = hono.createApp().get("/", async (c) => {
  const db = c.get("prisma");

  const categories = await db.category.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      _count: {
        select: {
          websites: true,
        },
      },
    },
    orderBy: { name: "asc" },
  });

  const result = categories.map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    count: c._count.websites,
  }));

  return c.json(result);
});
