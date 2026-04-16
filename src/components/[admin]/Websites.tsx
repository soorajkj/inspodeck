"use client";

import { useAdminWebsitesQuery } from "@/hooks/useAdminQuery";
import WebsitesTable from "./WebsitesTable";

export default function Websites() {
  const { data: websites = [] } = useAdminWebsitesQuery();

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-neutral-900">
          Websites Registry
        </h2>
        <span className="text-xs text-neutral-500">
          {websites.length} total
        </span>
      </div>
      <div className="overflow-x-auto">
        <WebsitesTable />
      </div>
    </div>
  );
}
