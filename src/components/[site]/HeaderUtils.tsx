"use client";

import { useRouter } from "next/navigation";
import { Button } from "@base-ui/react/button";
import { ComponentIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { authClient } from "@/lib/authClient";
import { useAuthModalStore } from "@/hooks/useAuthModalStore";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import HeaderUserActions from "./HeaderUserActions";

export default function HeaderUtils() {
  const router = useRouter();
  const { requireAuth } = useRequireAuth();
  const { data: session } = authClient.useSession();
  const { openModal } = useAuthModalStore();

  return (
    <div className="flex items-center gap-3">
      {!session?.user && (
        <Button
          className="relative inline-flex h-9 shrink cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-transparent bg-transparent px-3 text-sm leading-none font-medium whitespace-nowrap text-neutral-950 hover:bg-neutral-900/10 disabled:pointer-events-none disabled:opacity-90 [&_svg]:pointer-events-none [&_svg]:size-3.5 [&_svg]:shrink-0"
          onClick={openModal}
        >
          Join now
        </Button>
      )}
      <Button
        className="relative inline-flex h-9 shrink cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-transparent bg-orange-600 px-3 text-sm leading-none font-medium whitespace-nowrap text-white shadow inset-shadow-2xs inset-shadow-orange-400 hover:bg-orange-500 disabled:pointer-events-none disabled:opacity-90 [&_svg]:pointer-events-none [&_svg]:size-3.5 [&_svg]:shrink-0"
        onClick={() => {
          requireAuth(() => {
            router.push("/");
          });
        }}
      >
        <HugeiconsIcon icon={ComponentIcon} fill="white" />
        Submit a website
      </Button>
      {session?.user && <HeaderUserActions />}
    </div>
  );
}
