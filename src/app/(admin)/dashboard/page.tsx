import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import WebsitesManager from "@/components/[admin]/WebsitesManager";
import { getQueryClient } from "@/utils/queryClient";
import { getWebsites } from "@/utils/quries/website";

export default async function page() {
  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({ queryKey: ["WEBSITES"], queryFn: getWebsites }),
  ]);

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <WebsitesManager />
      </HydrationBoundary>
    </div>
  );
}
