import { useCallback } from "react";
import { authClient } from "@/lib/authClient";
import { useAuthModalStore } from "@/hooks/useAuthModalStore";

export const useRequireAuth = () => {
  const { data: session, isPending } = authClient.useSession();
  const { openModal } = useAuthModalStore();

  const requireAuth = useCallback(
    async (fn: () => void | Promise<void>) => {
      if (isPending) return;

      if (!session) {
        openModal();
        return;
      }

      return await fn();
    },
    [session, isPending, openModal]
  );

  return { requireAuth };
};
