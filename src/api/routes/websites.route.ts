import { zValidator } from "@hono/zod-validator";
import { hono } from "@/lib/hono";
import { getWebsitesQuerySchema } from "@/utils/schemas/website";

export const websitesRoute = hono.createApp().get(
  "/",
  zValidator("query", getWebsitesQuerySchema, (r) => {
    if (!r.success) throw r.error;
  }),
  async (c) => {
    const db = c.get("prisma");
    const { limit = 10, cursor, categories } = c.req.valid("query");

    const websites = await db.website.findMany({
      take: limit + 1,
      skip: cursor ? 1 : undefined,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
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
        ...(categories?.length && {
          categories: {
            some: {
              category: {
                slug: {
                  in: categories,
                },
              },
            },
          },
        }),
      },
    });

    const hasNextPage = websites.length > limit;
    const items = hasNextPage ? websites.slice(0, limit) : websites;
    const endCursor = items.length > 0 ? items[items.length - 1].id : null;

    const result = items.map((site) => ({
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

    return c.json({
      items: result,
      pageInfo: {
        endCursor,
        hasNextPage,
      },
    });
  }
);
