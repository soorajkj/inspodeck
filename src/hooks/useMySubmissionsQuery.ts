import { useQuery } from "@tanstack/react-query";
import { getMySubmissions } from "@/utils/quries/submission";

export const useMySubmissionsQuery = () => {
  return useQuery({
    queryKey: ["MY_SUBMISSIONS"],
    queryFn: getMySubmissions,
  });
};
