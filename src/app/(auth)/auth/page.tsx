import SigninForm from "@/components/[auth]/SigninForm";

export default function Page() {
  return (
    <section className="relative grid w-full max-w-sm gap-8">
      <div className="space-y-2 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900">
          Inspodeck
        </h2>
        <p className="text-sm text-neutral-800">
          The premium directory for design inspiration.
        </p>
      </div>
      <div className="overflow-hidden">
        <SigninForm />
      </div>
    </section>
  );
}
