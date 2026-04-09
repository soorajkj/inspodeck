import { hrpc } from "@/utils/hrpc";
import { CreateComponentSchema } from "../schemas/components";

export const getFonts = async () => {
  const res = await hrpc.api.fonts.$get();
  if (!res.ok) throw new Error("Failed to fetch fonts");
  return await res.json();
};

export const createFont = async (data: CreateComponentSchema) => {
  const res = await hrpc.api.fonts.$post({ json: data });
  if (!res.ok) throw new Error("Failed to create font");
  return await res.json();
};
