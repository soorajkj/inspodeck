import { redirect } from "next/navigation";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import WebsitesManager from "@/components/[admin]/WebsitesManager";
import { getQueryClient } from "@/utils/queryClient";
import { getWebsites } from "@/utils/quries/website";
import { getCategories } from "@/utils/quries/categories";
import { getPages } from "@/utils/quries/pages";
import { getTech } from "@/utils/quries/tech";
import { getFonts } from "@/utils/quries/fonts";
import { getServerSession } from "@/utils/session";

export default async function page() {
  const session = await getServerSession();

  if (!session) redirect("/");

  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({ queryKey: ["WEBSITES"], queryFn: getWebsites }),
    queryClient.prefetchQuery({
      queryKey: ["CATEGORIES"],
      queryFn: getCategories,
    }),
    queryClient.prefetchQuery({ queryKey: ["PAGES"], queryFn: getPages }),
    queryClient.prefetchQuery({ queryKey: ["TECH"], queryFn: getTech }),
    queryClient.prefetchQuery({ queryKey: ["FONTS"], queryFn: getFonts }),
  ]);

  if (session.user.role !== "admin") {
    return <div>You are not authorized to access this page</div>;
  }

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <WebsitesManager />
      </HydrationBoundary>
    </div>
  );
}
