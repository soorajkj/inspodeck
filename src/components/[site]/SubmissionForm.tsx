"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@base-ui/react/input";
import { Button } from "@base-ui/react/button";
import { toast } from "sonner";
import {
  CreateSubmissionSchema,
  createSubmissionSchema,
} from "@/utils/schemas/submissions";
import { useSubmissionMutation } from "@/hooks/useSubmissionMutation";

export default function SubmissionForm() {
  const { mutateAsync: submitWebsite, isPending } = useSubmissionMutation();

  const form = useForm<CreateSubmissionSchema>({
    resolver: zodResolver(createSubmissionSchema),
    mode: "onChange",
    defaultValues: {
      url: "",
      title: "",
      description: "",
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (data: CreateSubmissionSchema) => {
    try {
      await submitWebsite(data);
      form.reset();
      toast.success("Thanks for submitting!", {
        description: "We will review it soon.",
      });
    } catch (_error) {
      toast.error("Failed to submit");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="url" className="text-sm font-semibold text-neutral-700">
          Website URL
        </label>

        <Controller
          control={form.control}
          name="url"
          render={({ field }) => (
            <Input
              {...field}
              type="url"
              id="url"
              placeholder="https://example.com"
              className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-2.5 text-sm transition-all focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:outline-none"
            />
          )}
        />
        {errors.url && (
          <p className="text-xs font-medium text-red-500">
            {errors.url.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="title"
          className="text-sm font-semibold text-neutral-700"
        >
          Title
        </label>
        <Controller
          control={form.control}
          name="title"
          render={({ field }) => (
            <Input
              {...field}
              id="title"
              placeholder="e.g. Acme Landing Page"
              className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-2.5 text-sm transition-all focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:outline-none"
            />
          )}
        />
        {errors.title && (
          <p className="text-xs font-medium text-red-500">
            {errors.title.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="description"
          className="text-sm font-semibold text-neutral-700"
        >
          Comments (optional)
        </label>
        <Controller
          control={form.control}
          name="description"
          render={({ field }) => (
            <textarea
              {...field}
              id="description"
              placeholder="What makes this website stand out?"
              className="h-32 w-full resize-none rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-2.5 text-sm transition-all focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:outline-none"
            />
          )}
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
        Submit Website
      </Button>
    </form>
  );
}
