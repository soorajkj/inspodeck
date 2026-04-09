import { z } from "zod";

export const createWebsiteSchema = z.object({
  title: z.string().min(2, "Title is too short").max(100, "Title is too long"),
  url: z.url("Invalid URL"),
  description: z.string().max(500).optional(),
  categoryIds: z.array(z.string()).min(1, "Select at least one category"),
  pageIds: z.array(z.string()).min(1, "Select at least one page type"),
  techIds: z.array(z.string()).optional(),
  fontIds: z.array(z.string()).optional(),
});

export type CreateWebsiteSchema = z.infer<typeof createWebsiteSchema>;
