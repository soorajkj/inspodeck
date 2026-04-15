import { useMutation } from "@tanstack/react-query";
import { toggleLike } from "@/utils/quries/website";
import { getQueryClient } from "@/utils/queryClient";

export const useWebsitesToggleLikeMutation = () => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: (id: string) => toggleLike(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["WEBSITES"] });
      queryClient.invalidateQueries({ queryKey: ["LIKED_WEBSITES"] });
    },
  });
};
