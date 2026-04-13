import { hrpc } from "@/utils/hrpc";

export const getSession = async () => {
  const res = await hrpc.api.auth.session.$get();
  if (!res.ok) throw new Error("Failed to get session");
  return await res.json();
};
