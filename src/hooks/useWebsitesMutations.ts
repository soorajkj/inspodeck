import { useMutation } from "@tanstack/react-query";
import {
  createWebsite,
  updateWebsiteThumbnail,
  deleteWebsite,
  toggleLike,
} from "@/utils/quries/website";
import { getQueryClient } from "@/utils/queryClient";
import { UpdateWebsiteImageSchema } from "@/utils/schemas/website";

export const useWebsitesCreateMutation = () => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: createWebsite,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["WEBSITES"] }),
  });
};

export const useWebsitesUpdateThumbnailMutation = () => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateWebsiteImageSchema;
    }) => updateWebsiteThumbnail(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["WEBSITES"] }),
  });
};

export const useWebsitesDeleteMutation = () => {
  const queryClient = getQueryClient();
  return useMutation({
    mutationFn: deleteWebsite,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["WEBSITES"] }),
  });
};

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
