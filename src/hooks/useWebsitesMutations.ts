import { useMutation } from "@tanstack/react-query";
import { createWebsite } from "@/utils/quries/website";
import { getQueryClient } from "@/utils/queryClient";

export const useWebsitesCreateMutation = () => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: createWebsite,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["WEBSITES"] }),
  });
};
