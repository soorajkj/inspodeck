import { z } from "zod";

export const submissionSchema = z.object({
  url: z.url("Invalid URL format"),
  title: z.string().max(120, "Title too long"),
  description: z.string().max(300, "Description too long").optional(),
});

export type SubmissionData = z.infer<typeof submissionSchema>;
