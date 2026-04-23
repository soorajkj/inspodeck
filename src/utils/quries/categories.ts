import { hrpc } from "../hrpc";

export const getCategories = async () => {
  const response = await hrpc.api.categories.$get();
  if (!response.ok) throw new Error("Failed to fetch categories");
  return await response.json();
};
