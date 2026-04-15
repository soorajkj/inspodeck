import { v2 } from "cloudinary";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

type Variables = {
  prisma: typeof prisma;
  cloudinary: typeof v2;
  auth: typeof auth;
  user: typeof auth.$Infer.Session.user | null;
  session: typeof auth.$Infer.Session.session | null;
};

export type Env = {
  Variables: Variables;
};
