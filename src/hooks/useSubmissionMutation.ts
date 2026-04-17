import { useMutation } from "@tanstack/react-query";
import { createSubmission } from "@/utils/quries/submission";
import { getQueryClient } from "@/utils/queryClient";

export const useSubmissionMutation = () => {
  const queryClient = getQueryClient();
  return useMutation({
    mutationFn: createSubmission,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["MY_SUBMISSIONS"] });
    },
  });
};
