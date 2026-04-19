import Websites from "./Websites";

export default function WebsitesManager() {
  return (
    <div className="container mx-auto w-full px-4 md:px-6">
      <div className="mt-12 grid grid-cols-12 gap-8">
        <div className="col-span-12">
          <Websites />
        </div>
      </div>
    </div>
  );
}
