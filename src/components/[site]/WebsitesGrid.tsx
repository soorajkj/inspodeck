"use client";

import { Suspense } from "react";
import WebsiteTile from "@/components/[site]/WebsiteTile";
import { useWebsitesQuery } from "@/hooks/useWebsitesQuery";
import WebsiteGridSkeleton from "./WebsiteGridSkeleton";

export default function WebsitesGrid() {
  const { data: websites } = useWebsitesQuery();

  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="py-24">
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
