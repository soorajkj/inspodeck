import { hrpc } from "../hrpc";

export const getWebsites = async () => {
  const res = await hrpc.api.websites.$get();
  if (!res.ok) throw new Error("Failed to fetch websites");
  return await res.json();
};
