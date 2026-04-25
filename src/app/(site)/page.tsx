import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import WebsitesGrid from "@/components/[site]/WebsitesGrid";
import { getQueryClient } from "@/utils/queryClient";
import { infiniteWebsitesQueryOptions } from "@/utils/quries/websites";
import { getCategories } from "@/utils/quries/categories";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ categories?: string }>;
}) {
  const { categories } = await searchParams;
  const categoryList = categories?.split(",").filter(Boolean);
  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchInfiniteQuery(
      infiniteWebsitesQueryOptions(categoryList)
    ),
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
