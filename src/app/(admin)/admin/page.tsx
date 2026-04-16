import { forbidden, unauthorized } from "next/navigation";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import WebsitesManager from "@/components/[admin]/WebsitesManager";
import { getQueryClient } from "@/utils/queryClient";
import { getCategories } from "@/utils/quries/categories";
import { getPages } from "@/utils/quries/pages";
import { getTech } from "@/utils/quries/tech";
import { getFonts } from "@/utils/quries/fonts";
import { getServerSession } from "@/utils/session";
import { getAdminWebsites } from "@/utils/quries/admin";

export default async function page() {
  const session = await getServerSession();
  const user = session && session.user;

  if (!user) unauthorized();
  if (user.role !== "admin") forbidden();

  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["ADMIN_WEBSITES"],
      queryFn: getAdminWebsites,
    }),
    queryClient.prefetchQuery({
      queryKey: ["CATEGORIES"],
      queryFn: getCategories,
    }),
    queryClient.prefetchQuery({ queryKey: ["PAGES"], queryFn: getPages }),
    queryClient.prefetchQuery({ queryKey: ["TECH"], queryFn: getTech }),
    queryClient.prefetchQuery({ queryKey: ["FONTS"], queryFn: getFonts }),
  ]);

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <WebsitesManager />
      </HydrationBoundary>
    </div>
  );
}
