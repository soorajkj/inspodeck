import { useMutation } from "@tanstack/react-query";
import { getQueryClient } from "@/utils/queryClient";
import { createCategory } from "@/utils/quries/categories";
import { createPage } from "@/utils/quries/pages";
import { createTech } from "@/utils/quries/tech";
import { createFont } from "@/utils/quries/fonts";

export const useCategoryCreateMutation = () => {
  const queryClient = getQueryClient();
  return useMutation({
    mutationFn: createCategory,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["CATEGORIES"] }),
  });
};

export const usePageCreateMutation = () => {
  const queryClient = getQueryClient();
  return useMutation({
    mutationFn: createPage,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["PAGES"] }),
  });
};

export const useTechCreateMutation = () => {
  const queryClient = getQueryClient();
  return useMutation({
    mutationFn: createTech,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["TECH"] }),
  });
};

export const useFontCreateMutation = () => {
  const queryClient = getQueryClient();
  return useMutation({
    mutationFn: createFont,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["FONTS"] }),
  });
};
