import { useSuspenseQuery } from "@tanstack/react-query";
import { getCategories } from "@/utils/quries/categories";
import { getPages } from "@/utils/quries/pages";
import { getTech } from "@/utils/quries/tech";
import { getFonts } from "@/utils/quries/fonts";

export const useCategoriesQuery = () => {
  return useSuspenseQuery({
    queryKey: ["CATEGORIES"],
    queryFn: getCategories,
  });
};

export const usePagesQuery = () => {
  return useSuspenseQuery({
    queryKey: ["PAGES"],
    queryFn: getPages,
  });
};

export const useTechQuery = () => {
  return useSuspenseQuery({
    queryKey: ["TECH"],
    queryFn: getTech,
  });
};

export const useFontsQuery = () => {
  return useSuspenseQuery({
    queryKey: ["FONTS"],
    queryFn: getFonts,
  });
};
