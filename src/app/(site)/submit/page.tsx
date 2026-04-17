import { redirect } from "next/navigation";
import { ArrowLeft02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { getServerSession } from "@/utils/session";
import SubmissionForm from "@/components/[site]/SubmissionForm";

export default async function Page() {
  const session = await getServerSession();

  if (!session) redirect("/");

  return (
    <main className="mx-auto min-h-screen max-w-2xl px-4 py-20">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition hover:text-neutral-950"
      >
        <HugeiconsIcon icon={ArrowLeft02Icon} className="h-4 w-4" />
        Back to home
      </Link>

      <div className="mb-10 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
          Submit a website
        </h1>
        <p className="text-neutral-500">
          Know a stunning website that belongs here? Share it with the
          community. Submitting your work is absolutely free! We will personally
          carefully review every website submission, so there&apos;s no need to
          submit it multiple times.
        </p>
      </div>

      <SubmissionForm />
    </main>
  );
}
