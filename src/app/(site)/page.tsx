import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import WebsitesGrid from "@/components/[site]/WebsitesGrid";
import { getQueryClient } from "@/utils/queryClient";
import { getWebsites } from "@/utils/quries/websites";
import { getCategories } from "@/utils/quries/categories";

export default async function Page() {
  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchInfiniteQuery({
      queryKey: ["WEBSITES"],
      queryFn: ({ pageParam }) => getWebsites({ cursor: pageParam }),
      initialPageParam: undefined,
    }),
    queryClient.prefetchQuery({
      queryKey: ["CATEGORIES"],
      queryFn: getCategories,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="flex-1">
        <WebsitesGrid />
      </main>
    </HydrationBoundary>
  );
}
