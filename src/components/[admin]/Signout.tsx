"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/authClient";
import { getQueryClient } from "@/utils/queryClient";

export default function Signout() {
  const router = useRouter();
  const queryClient = getQueryClient();

  return (
    <button
      onClick={async () => {
        authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              queryClient.clear();
              router.refresh();
            },
          },
        });
      }}
    >
      Sign out
    </button>
  );
}
