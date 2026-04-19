"use client";

import { Avatar, Dropdown, Label } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { getQueryClient } from "@/utils/queryClient";
import { authClient } from "@/lib/authClient";

export default function UserActions() {
  const router = useRouter();
  const queryClient = getQueryClient();
  const { data: session } = authClient.useSession();

  const handleSignout = async () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          queryClient.clear();
          router.push("/auth");
        },
      },
    });
  };

  return (
    <Dropdown>
      <Dropdown.Trigger className="rounded-full">
        <Avatar>
          <Avatar.Image
            alt={session?.user?.name}
            src={session?.user?.image || undefined}
          />
          <Avatar.Fallback delayMs={600}>
            {session?.user?.name?.charAt(0)}
          </Avatar.Fallback>
        </Avatar>
      </Dropdown.Trigger>
      <Dropdown.Popover>
        <div className="px-3 pt-3 pb-1">
          <div className="flex items-center gap-2">
            <Avatar size="sm">
              <Avatar.Image
                alt={session?.user?.name}
                src={session?.user?.image || undefined}
              />
              <Avatar.Fallback delayMs={600}>
                {session?.user?.name?.charAt(0)}
              </Avatar.Fallback>
            </Avatar>
            <div className="flex flex-col gap-0">
              <p className="text-sm leading-5 font-medium">
                {session?.user?.name}
              </p>
              <p className="text-muted text-xs leading-none">
                {session?.user?.email}
              </p>
            </div>
          </div>
        </div>
        <Dropdown.Menu>
          <Dropdown.Item id="dashboard" textValue="Dashboard">
            <Label>Dashboard</Label>
          </Dropdown.Item>
          <Dropdown.Item id="profile" textValue="Profile">
            <Label>Profile</Label>
          </Dropdown.Item>
          <Dropdown.Item id="settings" textValue="Settings">
            <div className="flex w-full items-center justify-between gap-2">
              <Label>Settings</Label>
              <Icon
                icon="hugeicons:settings-01"
                className="text-muted size-3.5"
              />
            </div>
          </Dropdown.Item>
          <Dropdown.Item
            id="logout"
            textValue="Logout"
            variant="danger"
            onClick={handleSignout}
          >
            <div className="flex w-full items-center justify-between gap-2">
              <Label>Log Out</Label>
              <Icon
                icon="hugeicons:logout-square-02"
                className="text-danger size-3.5"
              />
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}
