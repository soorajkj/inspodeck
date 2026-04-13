import { hrpc } from "@/utils/hrpc";
import { SigninSchema, SignupSchema } from "@/utils/schemas/auth";

export const getSession = async () => {
  const res = await hrpc.api.auth.session.$get();
  if (!res.ok) throw new Error("Failed to get session");
  return await res.json();
};

export const signin = async (data: SigninSchema) => {
  const res = await hrpc.api.auth.signin.$post({ json: data });
  if (!res.ok) throw new Error("Failed to sign in");
  return await res.json();
};

export const signup = async (data: SignupSchema) => {
  const res = await hrpc.api.auth.signup.$post({ json: data });
  if (!res.ok) throw new Error("Failed to sign up");
  return await res.json();
};
