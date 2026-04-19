"use client";

import { Button } from "@base-ui/react/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUpRight03Icon, FavouriteIcon } from "@hugeicons/core-free-icons";
import Image from "next/image";
import { Route } from "next";
import Link from "next/link";
import { useWebsitesToggleLikeMutation } from "@/hooks/useWebsitesMutations";
import { LikedWebsite, Website } from "@/types/response";
import { useRequireAuth } from "@/hooks/useRequireAuth";

interface WebsiteTileProps<T> {
  website: T;
}

export default function WebsiteTile<T extends Website | LikedWebsite>({
  website,
}: WebsiteTileProps<T>) {
  const { mutateAsync: toggleLike } = useWebsitesToggleLikeMutation();
  const { requireAuth } = useRequireAuth();

  return (
    <div className="group relative flex cursor-pointer flex-col gap-2">
      <div className="relative max-w-full cursor-pointer">
        <div className="relative flex flex-col gap-1">
          <div className="absolute inset-0 z-10 flex h-full w-full items-start rounded opacity-0 transition-all duration-300 group-hover:opacity-100">
            <div className="flex w-full justify-end gap-2 rounded-sm p-3">
              <Button
                className="relative inline-flex aspect-square size-8 shrink cursor-pointer items-center justify-center gap-1 rounded-full border border-neutral-200 bg-white/90 text-sm leading-none font-semibold whitespace-nowrap text-neutral-800 disabled:pointer-events-none disabled:opacity-90 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
                aria-label={`Add ${website.title} to liked websites`}
                onClick={() => {
                  requireAuth(async () => {
                    toggleLike(website.id);
                  });
                }}
              >
                <HugeiconsIcon
                  icon={FavouriteIcon}
                  color={website.isLiked ? "red" : "currentColor"}
                  fill={website.isLiked ? "red" : "currentColor"}
                />
              </Button>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-xl border border-neutral-100">
            <Image
              alt={website.title}
              src={website.image || "/preview.jpg"}
              loading="eager"
              fetchPriority="high"
              className="size-full"
              width={200}
              height={200}
            />
          </div>
        </div>
      </div>
      <div className="relative flex items-center justify-between gap-2">
        <div className="flex grow flex-col items-start truncate">
          <h3 className="max-w-60 truncate text-sm font-medium text-neutral-950">
            {website.title}
          </h3>
          <p className="max-w-72 truncate text-sm leading-tight text-neutral-600">
            {[...website.categories].join(", ")}
          </p>
        </div>
        <div className="flex flex-none flex-row items-center justify-center gap-1">
          <Button
            className="relative inline-flex aspect-square size-8 shrink cursor-pointer items-center justify-center gap-1 rounded-full border border-neutral-100 text-sm leading-none font-semibold whitespace-nowrap text-neutral-800 hover:bg-neutral-200/10 disabled:pointer-events-none disabled:opacity-90 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
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
