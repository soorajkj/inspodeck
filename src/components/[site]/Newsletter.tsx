import { Button } from "@base-ui/react/button";
import { Input } from "@base-ui/react/input";

export default function Newsletter() {
  return (
    <div className="relative w-full max-w-md">
      <div className="flex gap-px">
        <Input
          placeholder="Enter your email"
          className="relative h-10 w-full border border-neutral-900 bg-neutral-900/50 px-4 text-sm text-white shadow-xs transition-colors placeholder:text-neutral-600 focus-visible:border-neutral-900 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-neutral-300 disabled:bg-neutral-50"
        />
        <Button className="relative inline-flex aspect-square h-10 shrink cursor-pointer items-center justify-center gap-2 rounded-none border border-transparent bg-orange-600 px-3 text-sm leading-none font-semibold whitespace-nowrap text-white hover:bg-orange-500 disabled:pointer-events-none disabled:opacity-20 [&_svg]:pointer-events-none [&_svg]:size-3.5 [&_svg]:shrink-0">
          Subscribe now
        </Button>
      </div>
      <p className="my-2 text-xs font-medium text-neutral-600">
        Get the 7 best design picks in your inbox each week.
      </p>
    </div>
  );
}
