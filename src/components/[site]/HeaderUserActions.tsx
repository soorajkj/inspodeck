"use client";

import Link from "next/link";
import { Menu } from "@base-ui/react/menu";
import { Avatar } from "@base-ui/react/avatar";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/authClient";
import { getQueryClient } from "@/utils/queryClient";

export default function HeaderUserActions() {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const queryClient = getQueryClient();

  return (
    <Menu.Root>
      <Menu.Trigger className="flex h-9 cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-neutral-200 px-1 pr-2 text-sm leading-none font-medium text-neutral-900 select-none focus:outline-none">
        <Avatar.Root className="relative flex aspect-square size-7 shrink-0 overflow-hidden rounded-md border border-neutral-200 select-none">
          <Avatar.Image
            src={session?.user.image || undefined}
            className="aspect-square size-full object-cover"
          />
          <Avatar.Fallback className="flex size-full items-center justify-center bg-neutral-100 text-sm font-medium text-neutral-900">
            {session?.user.email.charAt(0).toUpperCase()}
          </Avatar.Fallback>
        </Avatar.Root>
        <p>{session?.user.name}</p>
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner className="isolate z-50 outline-none" sideOffset={12}>
          <Menu.Popup className="data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 z-50 max-h-(--available-height) min-w-48 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-lg border border-neutral-100 bg-white p-1 text-neutral-600 duration-100 outline-none data-closed:overflow-hidden">
            <Menu.Item className="relative flex cursor-default items-center gap-1.5 rounded-md px-2 py-1.5 text-sm font-medium outline-hidden select-none focus:bg-neutral-100 focus:text-neutral-950 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
              Account
            </Menu.Item>
            <Menu.Item className="relative flex cursor-default items-center gap-1.5 rounded-md px-2 py-1.5 text-sm font-medium outline-hidden select-none focus:bg-neutral-100 focus:text-neutral-950 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
              Settings
            </Menu.Item>
            <Menu.Separator className="my-0.5 h-px bg-neutral-200" />
            <Menu.Item
              className="relative flex cursor-default items-center gap-1.5 rounded-md px-2 py-1.5 text-sm font-medium outline-hidden select-none focus:bg-neutral-100 focus:text-neutral-950 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
              render={<Link href="/submissions">Submissions</Link>}
            />
            <Menu.Item
              className="relative flex cursor-default items-center gap-1.5 rounded-md px-2 py-1.5 text-sm font-medium outline-hidden select-none focus:bg-neutral-100 focus:text-neutral-950 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
              render={<Link href="/likes">Likes</Link>}
            />
            <Menu.Separator className="my-0.5 h-px bg-neutral-200" />
            <Menu.Item className="relative flex cursor-default items-center gap-1.5 rounded-md px-2 py-1.5 text-sm font-medium outline-hidden select-none focus:bg-neutral-100 focus:text-neutral-950 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
              Refer and earn
            </Menu.Item>
            <Menu.Item className="relative flex cursor-default items-center gap-1.5 rounded-md px-2 py-1.5 text-sm font-medium outline-hidden select-none focus:bg-neutral-100 focus:text-neutral-950 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
              Help and support
            </Menu.Item>
            <Menu.Separator className="my-0.5 h-px bg-neutral-200" />
            <Menu.Item
              className="relative flex cursor-default items-center gap-1.5 rounded-md px-2 py-1.5 text-sm font-medium outline-hidden select-none focus:bg-neutral-100 focus:text-neutral-950 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
              onClick={() => {
                authClient.signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      queryClient.clear();
                      router.refresh();
                    },
                  },
                });
              }}
            >
              Sign out
            </Menu.Item>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
