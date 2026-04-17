import { formatDistanceToNow } from "date-fns";
import { Globe02Icon, Clock01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

interface Submission {
  id: string;
  url: string;
  title: string;
  description: string | null;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
}

export default function SubmissionCard({
  submission,
}: {
  submission: Submission;
}) {
  const statusColors = {
    PENDING: "bg-amber-50 text-amber-700 border-amber-200",
    APPROVED: "bg-emerald-50 text-emerald-700 border-emerald-200",
    REJECTED: "bg-rose-50 text-rose-700 border-rose-200",
  };

  return (
    <div className="group relative rounded-2xl border border-neutral-200 bg-white p-5 transition-all">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1 space-y-1">
          <h3 className="truncate font-semibold text-neutral-900">
            {submission.title}
          </h3>
          <div className="flex items-center gap-1.5 text-xs text-neutral-500">
            <HugeiconsIcon icon={Globe02Icon} className="h-3.5 w-3.5" />
            <span className="truncate">{submission.url}</span>
          </div>
        </div>
        <div
          className={`shrink-0 rounded-full border px-2 py-0.5 text-xs font-bold tracking-wider uppercase ${
            statusColors[submission.status]
          }`}
        >
          {submission.status}
        </div>
      </div>

      {submission.description && (
        <p className="mt-4 line-clamp-2 text-sm text-neutral-500">
          {submission.description}
        </p>
      )}

      <div className="mt-5 flex items-center gap-2 border-t border-neutral-100 pt-4 text-xs text-neutral-400">
        <HugeiconsIcon icon={Clock01Icon} className="h-3 w-3" />
        <span>
          Submitted {formatDistanceToNow(new Date(submission.createdAt))} ago
        </span>
      </div>
    </div>
  );
}
