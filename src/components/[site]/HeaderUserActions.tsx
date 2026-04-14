"use client";

import { Menu } from "@base-ui/react/menu";
import { Avatar } from "@base-ui/react/avatar";
import { HugeiconsIcon } from "@hugeicons/react";
import { useRouter } from "next/navigation";
import {
  UserIcon,
  SettingsIcon,
  DollarCircleIcon,
  CustomerSupportIcon,
  Logout05Icon,
} from "@hugeicons/core-free-icons";
import { authClient } from "@/lib/authClient";
import { getQueryClient } from "@/utils/queryClient";

export default function HeaderUserActions() {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const queryClient = getQueryClient();

  return (
    <Menu.Root>
      <Menu.Trigger className="flex h-9 cursor-pointer items-center justify-center gap-1.5 text-base leading-none font-normal text-neutral-900 select-none focus:outline-none">
        <Avatar.Root className="relative flex aspect-square size-9 shrink-0 overflow-hidden rounded-lg select-none after:absolute after:inset-0 after:rounded-lg after:border after:border-neutral-200">
          <Avatar.Image
            src={session?.user.image || undefined}
            className="aspect-square size-full rounded-full object-cover"
          />
          <Avatar.Fallback className="flex size-full items-center justify-center bg-neutral-100 text-sm font-medium text-neutral-900">
            {session?.user.email.charAt(0).toUpperCase()}
          </Avatar.Fallback>
        </Avatar.Root>
        <p>{session?.user.name}</p>
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner className="isolate z-50 outline-none" sideOffset={8}>
          <Menu.Popup className="data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 z-50 max-h-(--available-height) origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-lg bg-white p-1 text-neutral-600 shadow-lg ring-1 shadow-gray-200 ring-neutral-200/10 outline-1 outline-gray-200 duration-100 outline-none data-closed:overflow-hidden">
            <Menu.Item className="focus:text-neutral-950relative flex cursor-default items-center gap-1.5 rounded-md px-3 py-1 text-sm outline-hidden select-none focus:bg-neutral-100 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
              <HugeiconsIcon icon={UserIcon} strokeWidth={2} />
              Account
            </Menu.Item>
            <Menu.Item className="relative flex cursor-default items-center gap-1.5 rounded-md px-3 py-1 text-sm outline-hidden select-none focus:bg-neutral-100 focus:text-neutral-950 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
              <HugeiconsIcon icon={SettingsIcon} strokeWidth={2} />
              Settings
            </Menu.Item>
            <Menu.Separator className="my-1.5 h-px bg-neutral-200" />
            <Menu.Item className="relative flex cursor-default items-center gap-1.5 rounded-md px-3 py-1 text-sm outline-hidden select-none focus:bg-neutral-100 focus:text-neutral-950 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
              <HugeiconsIcon icon={DollarCircleIcon} strokeWidth={2} />
              Refer and earn
            </Menu.Item>
            <Menu.Item className="focus:text-neutral-950relative flex cursor-default items-center gap-1.5 rounded-md px-3 py-1 text-sm outline-hidden select-none focus:bg-neutral-100 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
              <HugeiconsIcon icon={CustomerSupportIcon} strokeWidth={2} />
              Help and support
            </Menu.Item>
            <Menu.Separator className="my-1.5 h-px bg-neutral-200" />
            <Menu.Item
              className="relative flex cursor-default items-center gap-1.5 rounded-md px-3 py-1 text-sm outline-hidden select-none focus:bg-neutral-100 focus:text-neutral-950 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
              onClick={() => {
                authClient.signOut();
                queryClient.clear();
                router.refresh();
              }}
            >
              <HugeiconsIcon icon={Logout05Icon} strokeWidth={2} />
              Sign out
            </Menu.Item>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
