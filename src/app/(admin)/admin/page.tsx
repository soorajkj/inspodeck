import { forbidden, unauthorized } from "next/navigation";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import WebsitesManager from "@/components/[admin]/WebsitesManager";
import { getQueryClient } from "@/utils/queryClient";
import { getServerSession } from "@/utils/session";
import { getCategories, getWebsites } from "@/utils/quries/admin";

export default async function page() {
  const session = await getServerSession();
  const user = session && session.user;

  if (!user) unauthorized();
  if (user.role !== "admin") forbidden();

  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["ADMIN_WEBSITES"],
      queryFn: getWebsites,
    }),
    queryClient.prefetchQuery({
      queryKey: ["ADMIN_CATEGORIES"],
      queryFn: getCategories,
    }),
  ]);

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <WebsitesManager />
      </HydrationBoundary>
    </div>
  );
}
