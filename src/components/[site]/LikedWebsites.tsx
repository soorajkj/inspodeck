"use client";

import { Suspense } from "react";
import { useLikedWebsitesQuery } from "@/hooks/useWebsitesQuery";
import WebsiteGridSkeleton from "./WebsiteGridSkeleton";
import WebsiteTile from "./WebsiteTile";

export default function LikedWebsites() {
  const { data: websites = [] } = useLikedWebsitesQuery();

  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto w-full px-4 md:px-6">
        <div className="py-24">
          <div className="mb-6 flex flex-col">
            <h2 className="text-2xl font-semibold">Liked Websites</h2>
            <p className="text-neutral-600">Websites you have liked</p>
          </div>
          <Suspense fallback={<WebsiteGridSkeleton />}>
            <div role="list" className="grid grid-cols-12 gap-x-6 gap-y-8">
              {websites.map((website) => (
                <div
                  key={website.id}
                  role="listitem"
                  className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3"
                >
                  <WebsiteTile website={website} />
                </div>
              ))}
            </div>
          </Suspense>
        </div>
      </div>
    </section>
  );
}
