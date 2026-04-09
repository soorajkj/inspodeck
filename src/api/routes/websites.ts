import { zValidator } from "@hono/zod-validator";
import { bodyLimit } from "hono/body-limit";
import { encodeBase64 } from "hono/utils/encode";
import { hono } from "@/lib/hono";
import { createWebsiteSchema } from "@/utils/schemas/website";

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
  .post("/", zValidator("json", createWebsiteSchema), async (c) => {
    const db = c.get("prisma");
    const json = c.req.valid("json");
    const data = await db.website.create({
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
    return c.json(data);
  })
  .post(
    "/upload",
    bodyLimit({
      maxSize: 5 * 1024 * 1024, // 5 MiB
      onError: (c) => {
        return c.json("File too large", 413);
      },
    }),
    async (c) => {
      const cloudinary = c.get("cloudinary");
      const body = await c.req.parseBody();
      const file = body["image"];
      if (!file || !(file instanceof File)) {
        return c.json("Image file is required", 400);
      }
      const byteArrayBuffer = await file.arrayBuffer();
      const base46 = encodeBase64(byteArrayBuffer);
      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${base46}`
      );
      return c.json(result);
    }
  );
