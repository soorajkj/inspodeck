import { useSuspenseQuery } from "@tanstack/react-query";
import { getWebsites } from "@/utils/quries/website";

export const useWebsitesQuery = () => {
  return useSuspenseQuery({
    queryKey: ["WEBSITES"],
    queryFn: getWebsites,
  });
};
