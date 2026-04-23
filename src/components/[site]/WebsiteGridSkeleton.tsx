import WebsiteTileSkeleton from "./WebsiteTileSkeleton";

export default function WebsiteGridSkeleton() {
  return (
    <div className="grid grid-cols-12 gap-x-6 gap-y-8">
      {[...Array(12)].map((_, index) => (
        <div
          key={index}
          role="listitem"
          className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3"
        >
          <WebsiteTileSkeleton />
        </div>
      ))}
    </div>
  );
}
