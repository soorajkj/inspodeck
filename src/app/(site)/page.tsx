import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import Hero from "@/components/[site]/Hero";
import Websites from "@/components/[site]/Websites";
import { getQueryClient } from "@/utils/queryClient";
import { getWebsites } from "@/utils/quries/website";

export default async function Page() {
  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({ queryKey: ["WEBSITES"], queryFn: getWebsites }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main>
        <Hero />
        <Websites />
      </main>
    </HydrationBoundary>
  );
}
