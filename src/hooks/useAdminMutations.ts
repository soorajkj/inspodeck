import { useMutation } from "@tanstack/react-query";
import { getQueryClient } from "@/utils/queryClient";
import {
  createAdminWebsite,
  deleteAdminWebsite,
  updateAdminWebsiteImage,
  updateAdminWebsiteWithoutImage,
} from "@/utils/quries/admin";
import {
  UpdateWebsiteImageSchema,
  UpdateWebsiteWithoutImageSchema,
} from "@/utils/schemas/website";

export const useAdminWebsiteCreateMutation = () => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: createAdminWebsite,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ADMIN_WEBSITES", "WEBSITES"],
      });
    },
  });
};

export const useAdminWebsiteUpdateWithoutImageMutation = () => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateWebsiteWithoutImageSchema;
    }) => updateAdminWebsiteWithoutImage(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ADMIN_WEBSITES", "WEBSITES"],
      });
    },
  });
};

export const useAdminWebsiteUpdateImageMutation = () => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateWebsiteImageSchema;
    }) => updateAdminWebsiteImage(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ADMIN_WEBSITES", "WEBSITES"],
      });
    },
  });
};

export const useAdminWebsiteDeleteMutation = () => {
  const queryClient = getQueryClient();
  return useMutation({
    mutationFn: deleteAdminWebsite,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["ADMIN_WEBSITES", "WEBSITES"],
      }),
  });
};
