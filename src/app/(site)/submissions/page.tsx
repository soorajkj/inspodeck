import { redirect } from "next/navigation";
import SubmissionForm from "@/components/[site]/SubmissionForm";
import SubmissionList from "@/components/[site]/SubmissionList";
import { getServerSession } from "@/utils/session";

export default async function Page() {
  const session = await getServerSession();

  if (!session) redirect("/");

  return (
    <main className="min-h-screen px-4 py-20">
      <div className="container mx-auto w-full px-4 md:px-6">
        <div className="grid">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="sticky top-24 space-y-6">
                <div className="space-y-1">
                  <h2 className="text-xl font-bold text-neutral-900">
                    New Submission
                  </h2>
                  <p className="text-sm text-neutral-500">
                    Share a new website with the Inspodeck community.
                  </p>
                </div>
                <SubmissionForm />
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-neutral-900">
                    History
                  </h2>
                  <div className="text-sm text-neutral-500">
                    Sorted by newest first
                  </div>
                </div>
                <SubmissionList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
