import AuthForms from "@/components/[auth]/AuthForms";

export default function Page() {
  return (
    <div className="relative flex min-h-dvh w-full items-center justify-center overflow-hidden bg-gray-50/50 p-4 font-sans">
      <div className="relative w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Inspodeck
          </h1>
          <p className="mt-2 text-sm text-gray-800">
            The premium directory for design inspiration.
          </p>
        </div>
        <div className="overflow-hidden p-2">
          <AuthForms />
        </div>
        <p className="mt-8 text-center text-sm text-gray-800">
          &copy; {new Date().getFullYear()} Inspodeck. All rights reserved.
        </p>
      </div>
    </div>
  );
}
