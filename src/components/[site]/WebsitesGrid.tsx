"use client";

import { Suspense } from "react";
import WebsiteTile from "@/components/[site]/WebsiteTile";
import { useWebsitesQuery } from "@/hooks/useWebsitesQuery";
import WebsiteGridSkeleton from "./WebsiteGridSkeleton";
import FilterBar from "./FilterBar";

export default function WebsitesGrid() {
  const { data: websites = [] } = useWebsitesQuery();

  return (
    <section className="relative">
      <div className="container mx-auto w-full px-4 md:px-6">
        <div className="py-0">
          <div className="flex gap-8">
            <div
              className="sticky top-16 hidden w-64 self-start lg:block"
              style={{ height: "calc(100vh - 4rem)" }}
            >
              <FilterBar />
            </div>
            <div className="flex-1">
              <Suspense fallback={<WebsiteGridSkeleton />}>
                <div
                  role="list"
                  className="grid grid-cols-12 gap-x-6 gap-y-8 py-12"
                >
                  {websites.map((website, i) => (
                    <div
                      key={i.toString()}
                      role="listitem"
                      className="col-span-12 sm:col-span-6 xl:col-span-4"
                    >
                      <WebsiteTile website={website} />
                    </div>
                  ))}
                </div>
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
