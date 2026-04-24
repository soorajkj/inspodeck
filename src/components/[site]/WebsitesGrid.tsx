"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import WebsiteTile from "@/components/[site]/WebsiteTile";
import { useWebsitesQuery } from "@/hooks/useWebsitesQuery";
import FilterBar from "./FilterBar";
import WebsiteTileSkeleton from "./WebsiteTileSkeleton";

export default function WebsitesGrid() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useWebsitesQuery();

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const websites = data.pages.flatMap((page) => page.items);

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
              <div
                role="list"
                className="grid grid-cols-12 gap-x-6 gap-y-8 py-12"
              >
                {websites.map((website) => (
                  <div
                    key={website.id}
                    role="listitem"
                    className="col-span-12 sm:col-span-6 xl:col-span-4"
                  >
                    <WebsiteTile website={website} />
                  </div>
                ))}
                {isFetchingNextPage &&
                  [...Array(10)].map((_, i) => (
                    <div
                      key={i.toString()}
                      className="col-span-12 sm:col-span-6 xl:col-span-4"
                    >
                      <WebsiteTileSkeleton />
                    </div>
                  ))}
                <span ref={ref} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
