"use client";

import { Button } from "@base-ui/react/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUpRight03Icon } from "@hugeicons/core-free-icons";
import Image from "next/image";
import { Heart } from "lucide-react";
import { Route } from "next";
import Link from "next/link";
import { TWebsite } from "@/types/response";

interface WebsiteProps {
  website: TWebsite;
}

export default function Website({ website }: WebsiteProps) {
  return (
    <div className="group relative flex cursor-pointer flex-col gap-2">
      <div className="relative max-w-full cursor-pointer">
        <div className="relative flex flex-col gap-1">
          <div className="absolute inset-0 z-10 flex h-full w-full items-start rounded opacity-0 transition-all duration-300 group-hover:opacity-100">
            <div className="flex w-full justify-end gap-2 rounded-sm p-3">
              <Button
                className="relative inline-flex aspect-square size-8 shrink cursor-pointer items-center justify-center gap-1 rounded-full border border-neutral-200 bg-white/90 text-sm leading-none font-semibold whitespace-nowrap text-neutral-800 disabled:pointer-events-none disabled:opacity-20 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
                aria-label={`Add ${website.title} to liked websites`}
              >
                <Heart />
              </Button>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-2xl">
            <Image
              alt={website.title}
              src={website.image || "/preview.jpg"}
              loading="eager"
              className="size-full"
              width={600}
              height={600}
            />
          </div>
        </div>
      </div>
      <div className="relative flex items-center justify-between gap-2">
        <div className="flex grow flex-col items-start truncate">
          <h3 className="flex items-center truncate text-sm font-medium">
            {website.title}
          </h3>
          <p className="truncate text-sm leading-tight text-neutral-500">
            {[...website.categories].join(", ")}
          </p>
        </div>
        <div className="flex flex-none flex-row items-center justify-center gap-1">
          <Button
            className="relative inline-flex aspect-square size-8 shrink cursor-pointer items-center justify-center gap-1 rounded-full border border-neutral-100 text-sm leading-none font-semibold whitespace-nowrap text-neutral-800 hover:bg-neutral-200/10 disabled:pointer-events-none disabled:opacity-20 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
            aria-label="Visit website"
            nativeButton={false}
            render={
              <Link
                href={website.url as Route}
                rel="noopener nofollow"
                target="_blank"
              />
            }
          >
            <HugeiconsIcon icon={ArrowUpRight03Icon} />
          </Button>
        </div>
      </div>
    </div>
  );
}
