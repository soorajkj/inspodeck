import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(3).max(25),
  email: z.email(),
  password: z.string().min(6),
});

export type SignupSchema = z.infer<typeof signupSchema>;

export const signinSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export type SigninSchema = z.infer<typeof signinSchema>;
