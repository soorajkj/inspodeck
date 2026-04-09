import { z } from "zod";

export const createComponentSchema = z.object({
  name: z.string().min(2, "Name is too short").max(50, "Name is too long"),
});

export type CreateComponentSchema = z.infer<typeof createComponentSchema>;
