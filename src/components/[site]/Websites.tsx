"use client";

import Website from "@/components/[site]/Website";
import { useWebsitesQuery } from "@/hooks/useWebsitesQuery";

export default function Websites() {
  const { data: websites } = useWebsitesQuery();

  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="py-24">
          <div role="list" className="grid grid-cols-12 gap-x-6 gap-y-8">
            {websites.map((website) => (
              <div
                key={website.id}
                role="listitem"
                className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3"
              >
                <Website website={website} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
