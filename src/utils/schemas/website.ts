import { z } from "zod";

export const createWebsiteSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  baseUrl: z.url("Invalid URL"),
  description: z.string().max(500).optional(),
  categories: z.array(z.string()).min(1, "At least one category is required"),
});

export const updateWebsiteAssetsSchema = z.object({
  icon: z.instanceof(File, {
    error: "Please upload a valid image",
  }),
  thumbnail: z.instanceof(File, {
    error: "Please upload a valid image",
  }),
});

export type UpdateWebsiteAssetsSchema = z.infer<
  typeof updateWebsiteAssetsSchema
>;

export type CreateWebsiteSchema = z.infer<typeof createWebsiteSchema>;
