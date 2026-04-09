import { hrpc } from "@/utils/hrpc";
import { CreateComponentSchema } from "../schemas/components";

export const getTech = async () => {
  const res = await hrpc.api.tech.$get();
  if (!res.ok) throw new Error("Failed to fetch tech stacks");
  return await res.json();
};

export const createTech = async (data: CreateComponentSchema) => {
  const res = await hrpc.api.tech.$post({ json: data });
  if (!res.ok) throw new Error("Failed to create tech stack");
  return await res.json();
};
