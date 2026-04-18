import CreateWebsite from "./CreateWebsite";
import Signout from "./Signout";
import Websites from "./Websites";

export default function WebsitesManager() {
  return (
    <div className="container mx-auto w-full px-4 md:px-6">
      <div className="relative">
        <div className="flex h-16 items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-xl font-bold tracking-tight text-neutral-900">
              Dashboard
            </h1>
            <p className="text-sm text-neutral-500">
              Manage your selection of websites and component metadata.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <CreateWebsite />
            <Signout />
          </div>
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
