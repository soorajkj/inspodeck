import CreateWebsite from "./CreateWebsite";
import Websites from "./Websites";

export default function WebsitesManager() {
  return (
    <div className="container mx-auto px-4">
      <div className="relative">
        <div className="flex h-16 items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-xl font-bold tracking-tight text-gray-900">
              Dashboard
            </h1>
            <p className="text-sm text-gray-500">
              Manage your selection of websites and component metadata.
            </p>
          </div>
          <CreateWebsite />
        </div>
      </div>
      <div className="mt-12 grid grid-cols-12 gap-8">
        <div className="col-span-12">
          <Websites />
        </div>
      </div>
    </div>
  );
}
