import bcrypt from "bcrypt";
import { sign } from "hono/jwt";
import { setCookie, deleteCookie } from "hono/cookie";
import { zValidator } from "@hono/zod-validator";
import { hono } from "@/lib/hono";
import { signinSchema, signupSchema } from "@/utils/schemas/auth";
import { jwtMiddleware } from "@/api/middlewares/jwt";

export const authRoute = hono
  .createApp()
  .post("/signup", zValidator("json", signupSchema), async (c) => {
    const json = c.req.valid("json");
    const db = c.get("prisma");

    const existingUser = await db.user.findUnique({
      where: {
        email: json.email,
      },
    });

    if (existingUser) {
      return c.json({ error: "Email already in use" }, 400);
    }

    const hashedPassword = await bcrypt.hash(json.password, 12);

    const user = await db.user.create({
      data: {
        name: json.name,
        email: json.email,
        password: hashedPassword,
      },
      omit: { password: true },
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

    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }

    const isPasswordMatch = await bcrypt.compare(json.password, user.password);

    if (!isPasswordMatch) {
      return c.json({ error: "Invalid credentials" }, 400);
    }

    const token = await sign(
      {
        userId: user.id,
        role: user.role,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour
      },
      process.env.JWT_SECRET!,
      "HS256"
    );

    setCookie(c, process.env.JWT_COOKIE_NAME!, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      path: "/",
      maxAge: 60 * 60, // 1 hour
    });

    const { password: _password, ...userWithoutPassword } = user;

    return c.json({
      message: "User signed in successfully",
      user: userWithoutPassword,
    });
  })
  .delete("/signout", async (c) => {
    deleteCookie(c, process.env.JWT_COOKIE_NAME!, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      path: "/",
    });

    return c.json({
      message: "User signed out successfully",
    });
  })
  .get("/session", jwtMiddleware, async (c) => {
    const payload = c.get("jwtPayload");
    const db = c.get("prisma");
    const user = await db.user.findUnique({
      where: {
        id: payload.userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return c.json(user);
  });
