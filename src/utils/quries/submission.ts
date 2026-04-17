import { hrpc } from "@/utils/hrpc";
import { SubmissionData } from "@/utils/schemas/submissions";

export const createSubmission = async (data: SubmissionData) => {
  const res = await hrpc.api.submissions.$post({ json: data });
  if (!res.ok) throw new Error("Failed to submit website");
  return await res.json();
};

export const getMySubmissions = async () => {
  const res = await hrpc.api.me.submissions.$get();
  if (!res.ok) throw new Error("Failed to fetch submissions");
  return await res.json();
};
