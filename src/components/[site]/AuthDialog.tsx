"use client";

import { toast } from "sonner";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { Separator } from "@base-ui/react/separator";
import { Button } from "@base-ui/react/button";
import { Dialog } from "@base-ui/react/dialog";
import { useAuthModalStore } from "@/hooks/useAuthModalStore";
import { authClient } from "@/lib/authClient";

export function AuthDialog() {
  const { isOpen, closeModal } = useAuthModalStore();

  const handleSignin = async () => {
    await authClient.signIn.social(
      { provider: "google" },
      {
        onSuccess: () => {
          closeModal();
        },
        onError: (error) => {
          toast.error("Failed to sign in", {
            description: error.error.message,
          });
        },
      }
    );
  };

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          closeModal();
        }
      }}
    >
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-40 bg-neutral-950/60 backdrop-blur-sm" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 overflow-auto rounded-2xl border border-neutral-200 bg-white">
          <div className="relative flex w-full justify-end gap-2 p-2">
            <Dialog.Close className="hover:bg-neutral-750 text-xs-medium svelte-1nhvtt9 inline-flex h-6 shrink-0 cursor-pointer items-center justify-center rounded-full p-1 text-neutral-500 transition-colors duration-100 hover:text-neutral-900 focus:outline-none disabled:text-neutral-700">
              <span>
                <svg
                  width={14}
                  height={14}
                  viewBox="0 0 14 14"
                  fill="none"
                  className="size-3.5"
                >
                  <path
                    d="M10.8891 3.11111L3.11133 10.8889"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3.11133 3.11111L10.8891 10.8889"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Dialog.Close>
          </div>

          <div className="flex w-full flex-col items-center justify-center space-y-4 py-8">
            <svg
              width={42}
              height={42}
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M41.176 24.088C41.176 14.6506 33.5254 7 24.088 7C14.6506 7 7 14.6506 7 24.088C7 33.5254 14.6506 41.176 24.088 41.176C33.5254 41.176 41.176 33.5254 41.176 24.088Z"
                fill="#F54900"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24.0001 48C30.967 47.9386 37.9334 46.4812 42.148 42.1478C46.4812 37.9334 47.9387 30.9668 48 24C47.9387 17.0334 46.4812 10.0666 42.148 5.85212C37.9334 1.51883 30.967 0.0614604 24.0001 0C17.0332 0.0614604 10.0666 1.51883 5.85214 5.85212C1.51883 10.0666 0.0614606 17.0334 0 24C0.0614606 30.9668 1.51883 37.9334 5.85214 42.1478C10.0666 46.4812 17.0334 47.9386 24.0001 48ZM23.2276 12C22.8559 18.0304 18.0305 22.8558 12 23.2274V24.7734C18.0302 25.145 22.8555 29.97 23.2276 36H24.7738C25.1457 29.9704 29.9705 25.1456 36.0001 24.7736V23.2274C29.9701 22.8552 25.1453 18.03 24.7736 12H23.2276Z"
                fill="#F54900"
              />
              <mask
                id="mask0_0_1"
                style={{ maskType: "luminance" }}
                maskUnits="userSpaceOnUse"
                x={14}
                y={14}
                width={20}
                height={20}
              >
                <path d="M34 14H14V34H34V14Z" fill="white" />
              </mask>
              <g mask="url(#mask0_0_1)">
                <path
                  d="M21.8995 17.6022C21.8995 15.6128 23.5122 14 25.5016 14C25.8836 14 26.1933 14.3096 26.1933 14.6916V30.3979C26.1933 32.3873 24.5805 34 22.5911 34C22.2091 34 21.8995 33.6904 21.8995 33.3084V17.6022Z"
                  fill="white"
                />
                <path
                  d="M28.0011 21.105C28.0011 19.1156 29.6139 17.5028 31.6034 17.5028C31.9854 17.5028 32.295 17.8125 32.295 18.1944V26.895C32.295 28.8844 30.6823 30.4971 28.6928 30.4971C28.3109 30.4971 28.0011 30.1875 28.0011 29.8055V21.105Z"
                  fill="white"
                />
                <path
                  d="M15.7978 21.105C15.7978 19.1156 17.4105 17.5028 19.4 17.5028C19.7819 17.5028 20.0916 17.8125 20.0916 18.1944V26.895C20.0916 28.8844 18.4788 30.4971 16.4894 30.4971C16.1074 30.4971 15.7978 30.1875 15.7978 29.8055V21.105Z"
                  fill="white"
                />
              </g>
            </svg>
            <div className="grid w-full max-w-xs gap-6 text-center">
              <section className="w-full space-y-6">
                <div className="w-full space-y-1">
                  <h2 className="text-2xl font-semibold text-neutral-900">
                    Welcome to Inspodeck
                  </h2>
                  <p className="text-sm text-neutral-600">
                    The premium directory for design inspiration.
                  </p>
                </div>
                <div className="w-full space-y-2">
                  <Button
                    type="button"
                    className="relative inline-flex h-10 w-full shrink cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-transparent bg-neutral-800 px-3 text-sm leading-none font-medium whitespace-nowrap text-white shadow inset-shadow-2xs inset-shadow-neutral-600 hover:bg-neutral-900 disabled:pointer-events-none disabled:opacity-90 [&_svg]:pointer-events-none [&_svg]:size-3.5 [&_svg]:shrink-0"
                    onClick={handleSignin}
                  >
                    <Icon icon="logos:google-icon" />
                    Continue with Google
                  </Button>
                </div>
              </section>
              <div className="flex w-full items-center gap-4">
                <Separator className="h-px w-full bg-neutral-200" />
                <p className="text-xs whitespace-nowrap text-neutral-500">
                  or continue with
                </p>
                <Separator className="h-px w-full bg-neutral-200" />
              </div>
              <form className="w-full space-y-5">
                <div className="group border-box relative flex flex-col gap-1">
                  <input
                    placeholder="Enter your email address..."
                    className="h-10 rounded-lg border border-neutral-100 bg-neutral-50 px-3 py-1.5 text-sm text-neutral-900 placeholder:text-neutral-500 focus:outline-none disabled:text-neutral-500"
                    disabled={true}
                    type="text"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={true}
                  className="relative inline-flex h-10 w-full shrink cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-transparent bg-orange-600 px-3 text-sm leading-none font-medium whitespace-nowrap text-white shadow inset-shadow-2xs inset-shadow-orange-400 hover:bg-orange-500 disabled:pointer-events-none disabled:opacity-90 [&_svg]:pointer-events-none [&_svg]:size-3.5 [&_svg]:shrink-0"
                >
                  Continue
                </Button>
                <p className="text-xs leading-relaxed font-medium text-neutral-500">
                  By creating an account, you agree to our{" "}
                  <Link href="/" className="text-neutral-700 hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/" className="text-neutral-700 hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </form>
            </div>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
