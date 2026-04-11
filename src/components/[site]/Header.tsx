import { Button } from "@base-ui/react/button";
import { ComponentIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 right-0 left-0 z-40 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center gap-4">
          <div className="flex flex-1 items-center gap-8">
            <Link href="/" aria-label="Inspodeck">
              <svg
                width={32}
                height={32}
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-rose-500"
              >
                <g clipPath="url(#clip0_1113_5188)">
                  <path
                    d="M199.686 0.31543C144.773 55.5693 144.877 144.877 200 200C144.877 144.877 55.5684 144.771 0.314453 199.685C55.2266 144.432 55.123 55.123 0 0C55.123 55.123 144.432 55.2295 199.686 0.31543Z"
                    fill="currentColor"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1113_5188">
                    <rect width={200} height={200} fill="white" />
                  </clipPath>
                </defs>
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
            <Button className="relative inline-flex h-9 shrink cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-transparent bg-rose-500 px-3 text-sm leading-none font-semibold whitespace-nowrap text-white shadow inset-shadow-2xs inset-shadow-rose-400 hover:bg-rose-500 disabled:pointer-events-none disabled:opacity-20 [&_svg]:pointer-events-none [&_svg]:size-3.5 [&_svg]:shrink-0">
              <HugeiconsIcon icon={ComponentIcon} fill="white" />
              Submit a website
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
