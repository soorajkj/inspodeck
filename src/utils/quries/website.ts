import { hrpc } from "@/utils/hrpc";
import { CreateWebsiteSchema } from "../schemas/website";

export const getWebsites = async () => {
  const res = await hrpc.api.websites.$get();
  if (!res.ok) throw new Error("Failed to fecth websites");
  return await res.json();
};

export const createWebsite = async (data: CreateWebsiteSchema) => {
  const res = await hrpc.api.websites.$post({ json: data });
  if (!res.ok) throw new Error("Failed to fecth websites");
  return await res.json();
};
