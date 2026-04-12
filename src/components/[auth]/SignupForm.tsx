"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@base-ui/react/input";
import { Button } from "@base-ui/react/button";
import { UserAdd01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { SignupSchema, signupSchema } from "@/utils/schemas/auth";

export default function SignupForm() {
  const form = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = (data: SignupSchema) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">Email</label>
        <div className="group relative">
          <Input
            type="email"
            {...register("email")}
            placeholder="name@example.com"
            className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-3 py-2.5 text-sm transition-all focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:outline-none"
          />
        </div>
        {errors.email && (
          <p className="text-xs font-medium text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">Password</label>
        <div className="group relative">
          <Input
            type="password"
            {...register("password")}
            placeholder="••••••••"
            className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-3 py-2.5 text-sm transition-all focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:outline-none"
          />
        </div>
        {errors.password && (
          <p className="text-xs font-medium text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>

      <p className="text-xs leading-relaxed text-gray-500">
        By creating an account, you agree to our{" "}
        <a href="" className="font-medium text-gray-600 hover:underline">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="" className="font-medium text-gray-600 hover:underline">
          Privacy Policy
        </a>
        .
      </p>

      <Button
        type="submit"
        className="relative inline-flex h-11 w-full shrink cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-transparent bg-neutral-900 px-3 py-2.5 font-sans text-sm leading-none font-semibold whitespace-nowrap text-white shadow inset-shadow-2xs inset-shadow-neutral-700 transition hover:bg-neutral-800 disabled:pointer-events-none disabled:opacity-20"
      >
        Create Account
        <HugeiconsIcon icon={UserAdd01Icon} className="h-4 w-4" />
      </Button>
    </form>
  );
}
