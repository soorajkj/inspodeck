import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/utils/quries/categories";

export const useCategoriesQuery = () => {
  return useQuery({
    queryKey: ["CATEGORIES"],
    queryFn: getCategories,
  });
};
