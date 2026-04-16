"use client";

import { Button } from "@base-ui/react/button";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/authClient";
import { getQueryClient } from "@/utils/queryClient";

export default function Signout() {
  const router = useRouter();
  const queryClient = getQueryClient();

  return (
    <Button
      className="relative inline-flex h-9 w-full shrink cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-transparent bg-neutral-800 px-3 text-sm leading-none font-medium whitespace-nowrap text-white shadow inset-shadow-2xs inset-shadow-neutral-600 hover:bg-neutral-900 disabled:pointer-events-none disabled:opacity-90 [&_svg]:pointer-events-none [&_svg]:size-3.5 [&_svg]:shrink-0"
      onClick={async () => {
        authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              queryClient.clear();
              router.push("/auth");
            },
          },
        });
      }}
    >
      Sign out
    </Button>
  );
}
