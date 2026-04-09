import { hrpc } from "@/utils/hrpc";
import { CreateComponentSchema } from "../schemas/components";

export const getPages = async () => {
  const res = await hrpc.api.pages.$get();
  if (!res.ok) throw new Error("Failed to fetch pages");
  return await res.json();
};

export const createPage = async (data: CreateComponentSchema) => {
  const res = await hrpc.api.pages.$post({ json: data });
  if (!res.ok) throw new Error("Failed to create page");
  return await res.json();
};
