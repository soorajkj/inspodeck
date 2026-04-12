import bcrypt from "bcrypt";
import { sign } from "hono/jwt";
import { setCookie, deleteCookie } from "hono/cookie";
import { zValidator } from "@hono/zod-validator";
import { hono } from "@/lib/hono";
import { signinSchema, signupSchema } from "@/utils/schemas/auth";
import { jwtMiddleware } from "@/api/middlewares/jwt";

const COOKIE_KEY = "token";

export const authRoute = hono
  .createApp()
  .post("/signup", zValidator("json", signupSchema), async (c) => {
    const json = c.req.valid("json");
    const db = c.get("prisma");

    const existingUser = await db.user.findFirst({
      where: {
        email: json.email,
      },
    });

    if (existingUser) return c.json("Email already exists", 400);

    const hashedPassword = await bcrypt.hash(json.password, 12);

    const user = await db.user.create({
      data: {
        email: json.email,
        password: hashedPassword,
      },
    });

    const payload = {
      userId: user.id,
      role: user.role,
      exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour
    };

    const token = await sign(payload, process.env.JWT_SECRET!);

    setCookie(c, COOKIE_KEY, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      path: "/",
      maxAge: 60 * 60, // 1 hour
    });

    return c.json({
      message: "User signed up successfully",
      user,
    });
  })
  .post("/signin", zValidator("json", signinSchema), async (c) => {
    const json = c.req.valid("json");
    const db = c.get("prisma");

    const user = await db.user.findFirst({
      where: {
        email: json.email,
      },
    });

    if (!user) return c.json("User not found", 404);

    const isPasswordMatch = await bcrypt.compare(json.password, user.password);

    if (!isPasswordMatch) return c.json("Invalid credentials", 400);

    const payload = {
      userId: user.id,
      role: user.role,
      exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour
    };

    const token = await sign(payload, process.env.JWT_SECRET!);

    setCookie(c, COOKIE_KEY, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      path: "/",
      maxAge: 60 * 60, // 1 hour
    });

    return c.json({
      message: "User signed in successfully",
      user,
    });
  })
  .delete("/signout", async (c) => {
    deleteCookie(c, COOKIE_KEY);

    return c.json({
      message: "User signed out successfully",
    });
  })
  .get("/test", jwtMiddleware, async (c) => {
    const payload = c.get("jwtPayload");
    console.log(payload);
    return c.json({
      message: "User is authenticated",
    });
  });
