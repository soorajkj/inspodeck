import UserActions from "./UserActions";

export default function Header() {
  return (
    <header className="h-auto w-full">
      <div className="container mx-auto w-full px-4 md:px-6">
        <div className="flex h-16 items-center justify-between gap-2">
          <div className="flex flex-1 items-center"></div>
          <div className="flex items-center gap-0.5">
            <UserActions />
          </div>
        </div>
      </div>
    </header>
  );
}
