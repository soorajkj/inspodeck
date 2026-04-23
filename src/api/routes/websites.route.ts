import { hono } from "@/lib/hono";

export const websitesRoute = hono.createApp().get("/", async (c) => {
  const db = c.get("prisma");

  const websites = await db.website.findMany({
    include: {
      categories: {
        include: {
          category: true,
        },
      },
    },
    where: {
      thumbnail: {
        not: null,
      },
      icon: {
        not: null,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const result = websites.map((site) => ({
    id: site.id,
    name: site.name,
    baseUrl: site.baseUrl,
    icon: site.icon,
    thumbnail: site.thumbnail,
    categories: site.categories.map((c) => ({
      name: c.category.name,
      slug: c.category.slug,
    })),
  }));

  return c.json(result);
});
