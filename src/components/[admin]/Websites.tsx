"use client";

import { Globe02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
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

      <div className="overflow-hidden rounded border border-neutral-200 bg-white">
        <div className="overflow-x-auto">
          <WebsitesTable />
        </div>
        {!websites.length && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-3 rounded-full bg-neutral-50 p-3">
              <HugeiconsIcon
                icon={Globe02Icon}
                className="h-6 w-6 text-neutral-400"
              />
            </div>
            <p className="text-sm font-medium text-neutral-900">
              No websites found
            </p>
            <p className="text-xs text-neutral-500">
              Get started by creating your first website.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
