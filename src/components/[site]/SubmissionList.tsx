"use client";

import { LoaderPinwheelIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { useMySubmissionsQuery } from "@/hooks/useMySubmissionsQuery";
import SubmissionCard from "./SubmissionCard";

export default function SubmissionList() {
  const { data: submissions, isLoading, isError } = useMySubmissionsQuery();

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center rounded-2xl border border-neutral-100 bg-white/50">
        <HugeiconsIcon
          icon={LoaderPinwheelIcon}
          className="h-6 w-6 animate-spin text-neutral-400"
        />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-2 rounded-2xl border border-rose-100 bg-rose-50 text-rose-600">
        <p className="font-medium">Failed to load submissions</p>
        <button
          onClick={() => window.location.reload()}
          className="text-sm underline underline-offset-4 hover:text-rose-700"
        >
          Try again
        </button>
      </div>
    );
  }

  if (!submissions || !submissions.length) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-neutral-200 bg-neutral-50/50">
        <p className="font-medium text-neutral-500">No submissions yet</p>
        <p className="max-w-[200px] text-center text-sm text-neutral-400">
          Your website submissions will appear here after you share them.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {submissions.map((submission) => (
        <SubmissionCard key={submission.id} submission={submission} />
      ))}
    </div>
  );
}
