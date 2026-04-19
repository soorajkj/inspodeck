"use client";

import WebsitesTable from "./WebsitesTable";
import CreateWebsite from "./CreateWebsite";

export default function Websites() {
  return (
    <div className="grid w-full gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-neutral-900">Websites</h2>
        <CreateWebsite />
      </div>
      <div className="overflow-x-auto">
        <WebsitesTable />
      </div>
    </div>
  );
}
