import { z } from "zod";

export const createSubmissionSchema = z.object({
  url: z.url().min(1, "URL is required"),
  title: z.string().max(120, "Title too long"),
  description: z.string().max(300, "Description too long").optional(),
});

export type CreateSubmissionSchema = z.infer<typeof createSubmissionSchema>;
