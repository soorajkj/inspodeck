"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@base-ui/react/input";
import { Button } from "@base-ui/react/button";
import { Login01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { SigninSchema, signinSchema } from "@/utils/schemas/auth";
import { useSigninMutation } from "@/hooks/useAuthMutations";

export default function SigninForm() {
  const { mutateAsync: signin, isPending } = useSigninMutation();

  const form = useForm<SigninSchema>({
    resolver: zodResolver(signinSchema),
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

  const onSubmit = async (data: SigninSchema) => {
    await signin(data);
    form.reset();
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
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-gray-700">
            Password
          </label>
          <a
            href="#"
            className="text-sm font-medium text-orange-600 transition hover:text-orange-600 hover:underline"
          >
            Forgot password?
          </a>
        </div>
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

      <Button
        type="submit"
        disabled={isPending}
        className="relative inline-flex h-11 w-full shrink cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-transparent bg-orange-600 px-3 py-2.5 font-sans text-sm leading-none font-semibold whitespace-nowrap text-white shadow inset-shadow-2xs inset-shadow-orange-400 transition hover:bg-orange-500 disabled:pointer-events-none disabled:opacity-50"
      >
        {isPending ? "Signing in..." : "Sign In"}
        <HugeiconsIcon icon={Login01Icon} className="h-4 w-4" />
      </Button>
    </form>
  );
}
