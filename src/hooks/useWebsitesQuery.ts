import { useSuspenseQuery } from "@tanstack/react-query";
import { getWebsites, getLikedWebsites } from "@/utils/quries/website";

export const useWebsitesQuery = () => {
  return useSuspenseQuery({
    queryKey: ["WEBSITES"],
    queryFn: getWebsites,
  });
};

export const useLikedWebsitesQuery = () => {
  return useSuspenseQuery({
    queryKey: ["LIKED_WEBSITES"],
    queryFn: getLikedWebsites,
  });
};
