import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { infiniteWebsitesQueryOptions } from "@/utils/quries/websites";
import { useWebsitesFilters } from "./useWebsitesFilters";

export const useWebsitesQuery = () => {
  const { categories } = useWebsitesFilters();
  return useSuspenseInfiniteQuery(infiniteWebsitesQueryOptions(categories));
};
