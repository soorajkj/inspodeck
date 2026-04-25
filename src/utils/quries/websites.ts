import { infiniteQueryOptions } from "@tanstack/react-query";
import { hrpc } from "../hrpc";
import { GetWebsitesQuerySchema } from "../schemas/website";

export const getWebsites = async ({
  cursor,
  limit,
  categories,
}: GetWebsitesQuerySchema) => {
  const res = await hrpc.api.websites.$get({
    query: {
      ...(limit && { limit: limit.toString() }),
      ...(cursor && { cursor }),
      ...(categories?.length && { categories: categories.join(",") }),
    },
  });
  if (!res.ok) throw new Error("Failed to fetch websites");
  return await res.json();
};

export const infiniteWebsitesQueryOptions = (
  categories: GetWebsitesQuerySchema["categories"]
) =>
  infiniteQueryOptions({
    queryKey: ["WEBSITES", { categories }],
    queryFn: ({ pageParam }) => getWebsites({ cursor: pageParam, categories }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.pageInfo.hasNextPage ? lastPage.pageInfo.endCursor : undefined,
  });
