"use client";

import { useWebsitesQuery } from "@/hooks/useWebsitesQuery";

export default function Websites() {
  const { data: websites } = useWebsitesQuery();

  return (
    <div>
      {websites.map((website) => (
        <div key={website.id}>
          <p>{website.title}</p>
        </div>
      ))}
    </div>
  );
}
