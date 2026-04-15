import { useQuery } from "@tanstack/react-query";
import { getAdminWebsites } from "@/utils/quries/admin";

export const useAdminWebsitesQuery = () => {
  return useQuery({
    queryKey: ["ADMIN_WEBSITES"],
    queryFn: getAdminWebsites,
  });
};
