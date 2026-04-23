import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { HTTPException } from "hono/http-exception";
import { ZodError } from "zod";
import { Context } from "hono";
import { Env } from "@/types/hono";

export const handleError = (err: unknown, c: Context<Env>) => {
  console.log("ERROR", err);

  // HTTPException
  if (err instanceof HTTPException) {
    return c.json(
      {
        success: false,
        message: err.message,
        data: null,
      },
      err.status
    );
  }

  // ZodError
  if (err instanceof ZodError) {
    const issues = err.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
      code: issue.code,
    }));

    return c.json(
      {
        success: false,
        message: issues,
        data: null,
      },
      400
    );
  }

  // PrismaError
  if (err instanceof PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002":
        return c.json(
          {
            success: false,
            message: err.meta,
            data: null,
          },
          400
        );

      default:
        return c.json(
          {
            success: false,
            message: err.message,
            data: null,
          },
          400
        );
    }
  }

  return c.json(
    {
      success: false,
      message: "Internal server error",
      data: null,
    },
    500
  );
};
