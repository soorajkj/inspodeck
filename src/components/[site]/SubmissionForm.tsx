"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@base-ui/react/input";
import { Button } from "@base-ui/react/button";
import { toast } from "sonner";
import { ComponentIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { SubmissionData, submissionSchema } from "@/utils/schemas/submissions";
import { useSubmissionMutation } from "@/hooks/useSubmissionMutation";

export default function SubmissionForm() {
  const { mutateAsync: submitWebsite, isPending } = useSubmissionMutation();

  const form = useForm<SubmissionData>({
    resolver: zodResolver(submissionSchema),
    defaultValues: {
      url: "",
      title: "",
      description: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (data: SubmissionData) => {
    try {
      await submitWebsite(data);
      toast.success("Website submitted!", {
        description: "Thank you for your submission. We will review it soon.",
      });
      form.reset();
    } catch (error) {
      console.log(error);
      toast.error("Failed to submit");
    }
  };

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-neutral-700">
            Website URL
          </label>
          <Input
            {...register("url")}
            type="url"
            placeholder="https://example.com"
            className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-2.5 text-sm transition-all focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:outline-none"
          />
          {errors.url && (
            <p className="text-xs font-medium text-red-500">
              {errors.url.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-neutral-700">
            Title
          </label>
          <Input
            {...register("title")}
            placeholder="e.g. Acme Landing Page"
            className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-2.5 text-sm transition-all focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:outline-none"
          />
          {errors.title && (
            <p className="text-xs font-medium text-red-500">
              {errors.title.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-neutral-700">
            Comments (optional)
          </label>
          <textarea
            {...register("description")}
            placeholder="What makes this website stand out?"
            className="h-32 w-full resize-none rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-2.5 text-sm transition-all focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:outline-none"
          />
          {errors.description && (
            <p className="text-xs font-medium text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className="relative inline-flex h-11 w-full shrink cursor-pointer items-center justify-center gap-2 rounded-xl border border-transparent bg-orange-600 px-3 py-2.5 text-sm font-semibold text-white shadow inset-shadow-2xs inset-shadow-orange-400 transition hover:bg-orange-500 disabled:pointer-events-none disabled:opacity-50"
        >
          {isPending ? (
            "Submitting..."
          ) : (
            <>
              <HugeiconsIcon
                icon={ComponentIcon}
                fill="white"
                className="h-4 w-4 text-white"
              />
              Submit Website
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
