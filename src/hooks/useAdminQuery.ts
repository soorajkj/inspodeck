import { useQuery } from "@tanstack/react-query";
import { getCategories, getWebsites } from "@/utils/quries/admin";

export const useAdminWebsitesQuery = () => {
  return useQuery({
    queryKey: ["ADMIN_WEBSITES"],
    queryFn: getWebsites,
  });
};

export const useAdminCategoriesQuery = () => {
  return useQuery({
    queryKey: ["ADMIN_CATEGORIES"],
    queryFn: getCategories,
  });
};
