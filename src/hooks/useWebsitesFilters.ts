import { useQueryState, parseAsArrayOf, parseAsString } from "nuqs";

export const useWebsitesFilters = () => {
  const [categories, setCategories] = useQueryState(
    "categories",
    parseAsArrayOf(parseAsString).withDefault([])
  );

  return {
    categories,
    setCategories,
  };
};
