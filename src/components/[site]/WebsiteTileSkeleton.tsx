export default function WebsiteTileSkeleton() {
  return (
    <div className="flex animate-pulse flex-col gap-2">
      {/* Image */}
      <div className="relative overflow-hidden rounded-xl border border-neutral-100">
        <div className="h-48 w-full bg-neutral-200" />
      </div>

      {/* Content */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex grow flex-col gap-1">
          {/* Title */}
          <div className="h-4 w-3/4 rounded bg-neutral-200" />

          {/* Categories */}
          <div className="h-3 w-1/2 rounded bg-neutral-200" />
        </div>

        {/* Button */}
        <div className="size-8 rounded-full bg-neutral-200" />
      </div>
    </div>
  );
}
