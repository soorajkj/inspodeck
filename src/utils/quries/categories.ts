import { hrpc } from "@/utils/hrpc";
import { CreateComponentSchema } from "@/utils/schemas/components";

export const getCategories = async () => {
  const res = await hrpc.api.categories.$get();
  if (!res.ok) throw new Error("Failed to fetch categories");
  return await res.json();
};

export const createCategory = async (data: CreateComponentSchema) => {
  const res = await hrpc.api.categories.$post({ json: data });
  if (!res.ok) throw new Error("Failed to create category");
  return await res.json();
};
