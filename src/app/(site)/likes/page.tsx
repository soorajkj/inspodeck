import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import LinedWebsites from "@/components/[site]/LikedWebsites";
import { getQueryClient } from "@/utils/queryClient";
import { getLikedWebsites } from "@/utils/quries/website";
import { getServerSession } from "@/utils/session";

export default async function Page() {
  const session = await getServerSession();
  const queryClient = getQueryClient();

  if (!session) redirect("/auth");

  await queryClient.prefetchQuery({
    queryKey: ["LIKED_WEBSITES"],
    queryFn: getLikedWebsites,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main>
        <LinedWebsites />
      </main>
    </HydrationBoundary>
  );
}
