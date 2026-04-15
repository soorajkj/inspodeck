import * as z from "zod";
import type { ValidationTargets } from "hono";
import { zValidator } from "@hono/zod-validator";

export const validator = <
  T extends z.ZodSchema,
  Target extends keyof ValidationTargets,
>(
  target: Target,
  schema: T
) =>
  zValidator(target, schema, (result) => {
    if (!result.success) throw result.error;
  });
