"use client";

import { Button } from "@base-ui/react/button";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowUpRight03Icon,
  Bookmark02Icon,
  FavouriteIcon,
} from "@hugeicons/core-free-icons";
import Image from "next/image";
import { TWebsite } from "@/types/response";

interface WebsiteProps {
  website: TWebsite;
}

export default function Website({ website }: WebsiteProps) {
  return (
    <div className="grid overflow-hidden">
      <div className="relative h-96 cursor-pointer overflow-hidden rounded-lg border border-neutral-200">
        <Image
          src="/preview.jpg"
          alt={website.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="eager"
          className="object-cover object-top"
        />
      </div>
      <div className="flex items-center py-4 pb-0">
        <div className="relative flex-1">
          <h2 className="max-w-48 truncate text-sm font-semibold text-orange-600">
            {website.title}
          </h2>
          <p className="line-clamp-1 w-full max-w-44 flex-none truncate text-xs font-medium text-neutral-600">
            {website.categories.join(", ")}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <Button
            aria-label="Bookmark"
            className="relative inline-flex aspect-square size-8 shrink cursor-pointer items-center justify-center gap-1 rounded-full border border-transparent text-sm leading-none font-semibold whitespace-nowrap text-neutral-800 hover:bg-neutral-200/10 disabled:pointer-events-none disabled:opacity-20 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
          >
            <HugeiconsIcon icon={Bookmark02Icon} strokeWidth={2} />
          </Button>
          <Button
            aria-label="Like"
            className="relative inline-flex aspect-square size-8 shrink cursor-pointer items-center justify-center gap-1 rounded-full border border-transparent text-sm leading-none font-semibold whitespace-nowrap text-neutral-800 hover:bg-neutral-200/10 disabled:pointer-events-none disabled:opacity-20 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
          >
            <HugeiconsIcon icon={FavouriteIcon} strokeWidth={2} />
          </Button>
          <Button
            aria-label="Open"
            className="relative inline-flex aspect-square size-8 shrink cursor-pointer items-center justify-center gap-1 rounded-full border border-neutral-200 text-sm leading-none font-semibold whitespace-nowrap text-neutral-800 hover:bg-neutral-200/10 disabled:pointer-events-none disabled:opacity-20 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
          >
            <HugeiconsIcon icon={ArrowUpRight03Icon} strokeWidth={2} />
          </Button>
        </div>
      </div>
    </div>
  );
}
