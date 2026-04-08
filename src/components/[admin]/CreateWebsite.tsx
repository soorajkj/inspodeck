"use client";

import { Button } from "@base-ui/react/button";
import { useWebsitesCreateMutation } from "@/hooks/useWebsitesMutations";

export default function CreateWebsite() {
  const { mutate } = useWebsitesCreateMutation();

  return (
    <div className="flex items-center">
      <Button
        className="relative inline-flex h-9 shrink cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-transparent bg-orange-600 px-3 text-sm leading-none font-semibold whitespace-nowrap text-white shadow inset-shadow-2xs inset-shadow-orange-400 hover:bg-orange-500 disabled:pointer-events-none disabled:opacity-20 [&_svg]:pointer-events-none [&_svg]:size-3.5 [&_svg]:shrink-0"
        onClick={() =>
          mutate({
            title: "Tes1",
            url: "https://test1.com",
            description: "",
            categoryIds: [
              "cmnlrqyqq000gwauxfgzmrtxb",
              "cmnlrqyr0000xwauxrpzojnjk",
            ],
            pageIds: ["cmnlrqyq40002waux7vt99t3d"],
            techIds: ["cmnlrqys00027wauxagw9ylzx"],
            fontIds: [],
          })
        }
      >
        Create website
      </Button>
    </div>
  );
}
