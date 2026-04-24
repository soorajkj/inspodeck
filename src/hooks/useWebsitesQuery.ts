import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { getWebsites } from "@/utils/quries/websites";

export const useWebsitesQuery = () => {
  return useSuspenseInfiniteQuery({
    queryKey: ["WEBSITES"],
    queryFn: ({ pageParam }) => getWebsites({ cursor: pageParam }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.pageInfo.hasNextPage ? lastPage.pageInfo.endCursor : undefined,
  });
};
