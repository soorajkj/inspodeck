"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "@base-ui/react/dialog";
import { Input } from "@base-ui/react/input";
import { Button } from "@base-ui/react/button";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  createWebsiteWithoutImageSchema,
  CreateWebsiteWithoutImageSchema,
} from "@/utils/schemas/website";
import {
  useCategoriesQuery,
  usePagesQuery,
  useTechQuery,
  useFontsQuery,
} from "@/hooks/useComponentsQuery";
import { useAdminWebsiteCreateMutation } from "@/hooks/useAdminMutations";
import UploadImageForm from "./UploadImageForm";

type Step = "details" | "thumbnail";

export default function CreateWebsite() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("details");
  const [createdId, setCreatedId] = useState<string | null>(null);

  const { mutateAsync: createWebsite, isPending: isCreating } =
    useAdminWebsiteCreateMutation();

  const { data: categories = [] } = useCategoriesQuery();
  const { data: pages = [] } = usePagesQuery();
  const { data: tech = [] } = useTechQuery();
  const { data: fonts = [] } = useFontsQuery();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<CreateWebsiteWithoutImageSchema>({
    defaultValues: {
      title: "",
      url: "",
      description: "",
      categoryIds: [],
      pageIds: [],
      techIds: [],
      fontIds: [],
    },
    resolver: zodResolver(createWebsiteWithoutImageSchema),
  });

  const handleCreate = async (data: CreateWebsiteWithoutImageSchema) => {
    try {
      const result = await createWebsite(data);
      setCreatedId(result.id);
      setStep("thumbnail");
    } catch (error) {
      console.error("Failed to create website", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    // Reset state after dialog closes (animation delay)
    setTimeout(() => {
      setStep("details");
      setCreatedId(null);
      reset();
    }, 300);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className="relative inline-flex h-9 shrink cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-transparent bg-orange-600 px-3 font-sans text-sm leading-none font-semibold whitespace-nowrap text-white shadow inset-shadow-2xs inset-shadow-orange-400 hover:bg-orange-500 disabled:pointer-events-none disabled:opacity-20">
        Create website
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/20 backdrop-blur transition-all duration-300" />
        <Dialog.Popup className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed top-1/2 left-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-gray-100 bg-white p-6 font-sans shadow transition-all duration-300">
          <div className="mb-6 space-y-1">
            <div className="flex items-center gap-2">
              <Dialog.Title className="text-2xl font-bold tracking-tight text-gray-900">
                {step === "details" ? "Create Website" : "Add Screenshot"}
              </Dialog.Title>
              <div className="ml-auto flex items-center gap-1.5">
                <div
                  className={`h-1.5 w-6 rounded-full transition-colors ${step === "details" ? "bg-orange-600" : "bg-gray-200"}`}
                />
                <div
                  className={`h-1.5 w-6 rounded-full transition-colors ${step === "thumbnail" ? "bg-orange-600" : "bg-gray-200"}`}
                />
              </div>
            </div>
            <Dialog.Description className="text-sm text-gray-500">
              {step === "details"
                ? "Fill in the basic info of the website."
                : "Upload a stunning screenshot to showcase this website."}
            </Dialog.Description>
          </div>

          {step === "details" ? (
            <form
              onSubmit={handleSubmit(handleCreate)}
              className="flex flex-col gap-6"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Title
                  </label>
                  <Input
                    {...register("title")}
                    placeholder="e.g. Acme"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-2.5 text-sm transition-all focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:outline-none"
                  />
                  {errors.title && (
                    <p className="text-xs font-medium text-red-500">
                      {errors.title.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    URL
                  </label>
                  <Input
                    {...register("url")}
                    type="url"
                    placeholder="eg: https://acme.com"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-2.5 text-sm transition-all focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:outline-none"
                  />
                  {errors.url && (
                    <p className="text-xs font-medium text-red-500">
                      {errors.url.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Description (optional)
                </label>
                <textarea
                  {...register("description")}
                  placeholder="A short description of the website..."
                  className="h-24 w-full resize-none rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-2.5 text-sm transition-all focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:outline-none"
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-700">
                    Categories
                  </label>
                  <div className="flex max-h-32 flex-wrap gap-2 overflow-y-auto pr-2">
                    {categories.map((c) => (
                      <label
                        key={c.id}
                        className="group relative flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 transition-all hover:border-orange-200 hover:bg-orange-50"
                      >
                        <input
                          type="checkbox"
                          value={c.id}
                          {...register("categoryIds")}
                          className="peer hidden"
                        />
                        <div className="h-4 w-4 rounded border border-gray-300 transition-all peer-checked:border-orange-600 peer-checked:bg-orange-600" />
                        <span className="text-xs font-medium text-gray-600 transition-colors group-hover:text-orange-900 peer-checked:text-orange-900">
                          {c.name}
                        </span>
                      </label>
                    ))}
                  </div>
                  {errors.categoryIds && (
                    <p className="text-xs font-medium text-red-500">
                      {errors.categoryIds.message}
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-700">
                    Page Types
                  </label>
                  <div className="flex max-h-32 flex-wrap gap-2 overflow-y-auto pr-2">
                    {pages.map((p) => (
                      <label
                        key={p.id}
                        className="group relative flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 transition-all hover:border-orange-200 hover:bg-orange-50"
                      >
                        <input
                          type="checkbox"
                          value={p.id}
                          {...register("pageIds")}
                          className="peer hidden"
                        />
                        <div className="h-4 w-4 rounded border border-gray-300 transition-all peer-checked:border-orange-600 peer-checked:bg-orange-600" />
                        <span className="text-xs font-medium text-gray-600 transition-colors group-hover:text-orange-900 peer-checked:text-orange-900">
                          {p.name}
                        </span>
                      </label>
                    ))}
                  </div>
                  {errors.pageIds && (
                    <p className="text-xs font-medium text-red-500">
                      {errors.pageIds.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-700">
                    Technologies
                  </label>
                  <div className="flex max-h-32 flex-wrap gap-2 overflow-y-auto pr-2">
                    {tech.map((t) => (
                      <label
                        key={t.id}
                        className="group relative flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 transition-all hover:border-orange-200 hover:bg-orange-50"
                      >
                        <input
                          type="checkbox"
                          value={t.id}
                          {...register("techIds")}
                          className="peer hidden"
                        />
                        <div className="h-4 w-4 rounded border border-gray-300 transition-all peer-checked:border-orange-600 peer-checked:bg-orange-600" />
                        <span className="text-xs font-medium text-gray-600 transition-colors group-hover:text-orange-900 peer-checked:text-orange-900">
                          {t.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-700">
                    Fonts
                  </label>
                  <div className="flex max-h-32 flex-wrap gap-2 overflow-y-auto pr-2">
                    {fonts.map((f) => (
                      <label
                        key={f.id}
                        className="group relative flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 transition-all hover:border-orange-200 hover:bg-orange-50"
                      >
                        <input
                          type="checkbox"
                          value={f.id}
                          {...register("fontIds")}
                          className="peer hidden"
                        />
                        <div className="h-4 w-4 rounded border border-gray-300 transition-all peer-checked:border-orange-600 peer-checked:bg-orange-600" />
                        <span className="text-xs font-medium text-gray-600 transition-colors group-hover:text-orange-900 peer-checked:text-orange-900">
                          {f.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-end gap-3">
                <Dialog.Close className="relative inline-flex h-9 shrink cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 text-sm leading-none font-semibold whitespace-nowrap text-neutral-950 inset-shadow-2xs inset-shadow-neutral-100 transition-all hover:bg-neutral-50 disabled:pointer-events-none disabled:opacity-20">
                  Cancel
                </Dialog.Close>
                <Button
                  type="submit"
                  disabled={isCreating}
                  className="relative inline-flex h-9 shrink cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-transparent bg-orange-600 px-3 text-sm leading-none font-semibold whitespace-nowrap text-white shadow inset-shadow-2xs inset-shadow-orange-400 transition-all hover:bg-orange-500 disabled:pointer-events-none disabled:opacity-20"
                >
                  {isCreating ? "Creating..." : "Continue"}
                  <HugeiconsIcon icon={ArrowRight01Icon} className="h-4 w-4" />
                </Button>
              </div>
            </form>
          ) : (
            <UploadImageForm
              websiteId={createdId!}
              onSuccess={handleClose}
              onSkip={handleClose}
            />
          )}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
