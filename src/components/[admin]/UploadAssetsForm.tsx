"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Label } from "@heroui/react";
import {
  UpdateWebsiteAssetsSchema,
  updateWebsiteAssetsSchema,
} from "@/utils/schemas/website";
import { useAdminWebsiteAssetsUpdateMutation } from "@/hooks/useAdminMutations";
import { useCreateWebsiteModalStore } from "@/hooks/useCreateWebsiteModalStore";

export default function UploadAssetsForm() {
  const form = useForm({
    resolver: zodResolver(updateWebsiteAssetsSchema),
    mode: "onSubmit",
    defaultValues: {
      icon: undefined,
      thumbnail: undefined,
    },
  });

  const websiteId = useCreateWebsiteModalStore((s) => s.websiteId);
  const setIsOpen = useCreateWebsiteModalStore((s) => s.setOpen);
  const setWebsiteId = useCreateWebsiteModalStore((s) => s.setWebsiteId);
  const setStage = useCreateWebsiteModalStore((s) => s.setStage);

  const { mutateAsync: updateWebsiteAssets, isPending } =
    useAdminWebsiteAssetsUpdateMutation();

  const onSubmit = async (data: UpdateWebsiteAssetsSchema) => {
    if (!websiteId) return;
    await updateWebsiteAssets({ id: websiteId, data });
    form.reset();
    setWebsiteId(null);
    setStage("basic");
    setIsOpen();
  };

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Controller
        name="icon"
        control={form.control}
        render={({ field }) => (
          <div className="flex flex-col gap-1">
            <Label htmlFor="icon">Icon</Label>
            <Input
              id="icon"
              type="file"
              accept="image/*"
              onChange={(e) => field.onChange(e.target.files?.[0])}
            />
          </div>
        )}
      />
      <Controller
        name="thumbnail"
        control={form.control}
        render={({ field }) => (
          <div className="flex flex-col gap-1">
            <Label htmlFor="thumbnail">Thumbnail</Label>
            <Input
              id="thumbnail"
              type="file"
              accept="image/*"
              onChange={(e) => field.onChange(e.target.files?.[0])}
            />
          </div>
        )}
      />
      <Button
        type="submit"
        isDisabled={!form.formState.isValid || isPending}
        isPending={isPending}
      >
        Upload
      </Button>
    </form>
  );
}
