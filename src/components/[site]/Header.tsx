import { Button } from "@base-ui/react/button";
import { ComponentIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 right-0 left-0 z-40 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center gap-4">
          <div className="flex flex-1 items-center gap-4">
            <Link
              href="/"
              aria-label="Inspodeck"
              className="inline-flex w-fit cursor-pointer items-center justify-center select-none"
            >
              <svg
                width={36}
                height={36}
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M41.176 24.088C41.176 14.6506 33.5254 7 24.088 7C14.6506 7 7 14.6506 7 24.088C7 33.5254 14.6506 41.176 24.088 41.176C33.5254 41.176 41.176 33.5254 41.176 24.088Z"
                  fill="#F54900"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M24.0001 48C30.967 47.9386 37.9334 46.4812 42.148 42.1478C46.4812 37.9334 47.9387 30.9668 48 24C47.9387 17.0334 46.4812 10.0666 42.148 5.85212C37.9334 1.51883 30.967 0.0614604 24.0001 0C17.0332 0.0614604 10.0666 1.51883 5.85214 5.85212C1.51883 10.0666 0.0614606 17.0334 0 24C0.0614606 30.9668 1.51883 37.9334 5.85214 42.1478C10.0666 46.4812 17.0334 47.9386 24.0001 48ZM23.2276 12C22.8559 18.0304 18.0305 22.8558 12 23.2274V24.7734C18.0302 25.145 22.8555 29.97 23.2276 36H24.7738C25.1457 29.9704 29.9705 25.1456 36.0001 24.7736V23.2274C29.9701 22.8552 25.1453 18.03 24.7736 12H23.2276Z"
                  fill="#F54900"
                />
                <path
                  d="M34.1107 14.1736C28.6194 19.699 28.6298 28.6298 34.1421 34.1421C28.6298 28.6298 19.6989 28.6192 14.1735 34.1106C19.6647 28.5853 19.6544 19.6544 14.1421 14.1421C19.6544 19.6544 28.5853 19.665 34.1107 14.1736Z"
                  fill="white"
                />
              </svg>
            </Link>
            <ul className="hidden items-center gap-6 text-sm font-medium text-neutral-950 lg:flex">
              {["Websites", "Templates", "Pricing", "Resources", "Company"].map(
                (_, i) => (
                  <li key={i.toString()} className="cursor-pointer">
                    {_}
                  </li>
                )
              )}
            </ul>
          </div>
          <div className="flex items-center gap-2">
            <Button
              nativeButton={false}
              render={<Link href="/auth" />}
              className="relative inline-flex h-9 shrink cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-transparent bg-transparent px-3 text-sm leading-none font-semibold whitespace-nowrap text-neutral-950 hover:bg-neutral-900/10 disabled:pointer-events-none disabled:opacity-20 [&_svg]:pointer-events-none [&_svg]:size-3.5 [&_svg]:shrink-0"
            >
              Join now
            </Button>
            <Button className="relative inline-flex h-9 shrink cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-transparent bg-orange-600 px-3 text-sm leading-none font-semibold whitespace-nowrap text-white shadow inset-shadow-2xs inset-shadow-orange-400 hover:bg-orange-500 disabled:pointer-events-none disabled:opacity-20 [&_svg]:pointer-events-none [&_svg]:size-3.5 [&_svg]:shrink-0">
              <HugeiconsIcon icon={ComponentIcon} fill="white" />
              Submit a website
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
