import { zValidator } from "@hono/zod-validator";
import { hono } from "@/lib/hono";
import { createComponentSchema } from "@/utils/schemas/components";

export const categoriesRoute = hono
  .createApp()
  .get("/", async (c) => {
    const db = c.get("prisma");
    const data = await db.category.findMany({
      orderBy: { name: "asc" },
    });
    return c.json(data);
  })
  .post("/", zValidator("json", createComponentSchema), async (c) => {
    const db = c.get("prisma");
    const { name } = c.req.valid("json");
    const data = await db.category.create({
      data: { name },
    });
    return c.json(data);
  });
