"use client";

import { Tabs } from "@base-ui/react/tabs";
import SigninForm from "./SigninForm";
import SignupForm from "./SignupForm";

export default function AuthForms() {
  return (
    <Tabs.Root defaultValue="signin" className="w-full space-y-4">
      <Tabs.List className="flex items-center gap-x-px rounded-2xl bg-gray-100 p-1">
        <Tabs.Tab
          value="signin"
          className="flex-1 cursor-pointer rounded-xl py-2.5 text-sm font-semibold text-gray-800 transition-all outline-none hover:text-gray-900 data-active:bg-white data-active:text-orange-600 data-active:shadow-sm"
        >
          Sign In
        </Tabs.Tab>
        <Tabs.Tab
          value="signup"
          className="flex-1 cursor-pointer rounded-xl py-2.5 text-sm font-semibold text-gray-800 transition-all outline-none hover:text-gray-900 data-active:bg-white data-active:text-orange-600 data-active:shadow-sm"
        >
          Sign Up
        </Tabs.Tab>
      </Tabs.List>
      <div className="rounded-3xl border border-neutral-100 bg-white p-6 shadow-2xs">
        <Tabs.Panel value="signin" className="focus:outline-none">
          <SigninForm />
        </Tabs.Panel>
        <Tabs.Panel value="signup" className="focus:outline-none">
          <SignupForm />
        </Tabs.Panel>
      </div>
    </Tabs.Root>
  );
}
