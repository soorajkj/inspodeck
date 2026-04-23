import { useMutation } from "@tanstack/react-query";
import { getQueryClient } from "@/utils/queryClient";
import {
  createWebsite,
  deleteWebsite,
  updateWebsiteAssets,
} from "@/utils/quries/admin";
import { UpdateWebsiteAssetsSchema } from "@/utils/schemas/website";

export const useAdminWebsiteCreateMutation = () => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: createWebsite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ADMIN_WEBSITES"] });
      queryClient.invalidateQueries({ queryKey: ["WEBSITES"] });
    },
  });
};

export const useAdminWebsiteAssetsUpdateMutation = () => {
  const queryClient = getQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateWebsiteAssetsSchema;
    }) => updateWebsiteAssets(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ADMIN_WEBSITES"] });
    },
  });
};

export const useAdminWebsiteDeleteMutation = () => {
  const queryClient = getQueryClient();
  return useMutation({
    mutationFn: deleteWebsite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ADMIN_WEBSITES"] });
      queryClient.invalidateQueries({ queryKey: ["WEBSITES"] });
    },
  });
};
