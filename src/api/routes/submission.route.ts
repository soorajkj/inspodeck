import normalizeUrl from "normalize-url";
import { hono } from "@/lib/hono";
import { authMiddleware } from "@/api/middlewares/auth.middleware";
import { validator } from "@/api/utils/validator";
import { createSubmissionSchema } from "@/utils/schemas/submissions";

export const submissionsRoute = hono
  .createApp()
  .use(authMiddleware)
  .post("/", validator("json", createSubmissionSchema), async (c) => {
    const user = c.get("user");
    const db = c.get("prisma");
    const json = c.req.valid("json");

    const normalizedUrl = normalizeUrl(json.url, {
      stripHash: true,
      removeQueryParameters: true,
      removePath: true,
    });

    try {
      const result = await db.submission.create({
        data: {
          url: normalizedUrl,
          title: json.title,
          description: json.description,
          submittedById: user!.id,
        },
      });

      return c.json({
        success: true,
        message: "Site submitted successfully",
        data: result,
      });
    } catch (error) {
      throw error;
    }
  });
