"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Input,
  Label,
  TextArea,
  TextField,
  ListBox,
  Select,
} from "@heroui/react";
import {
  CreateWebsiteSchema,
  createWebsiteSchema,
} from "@/utils/schemas/website";
import { useAdminWebsiteCreateMutation } from "@/hooks/useAdminMutations";
import { useAdminCategoriesQuery } from "@/hooks/useAdminQuery";
import { useCreateWebsiteModalStore } from "@/hooks/useCreateWebsiteModalStore";

export default function CreateWebsiteForm() {
  const form = useForm({
    resolver: zodResolver(createWebsiteSchema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      baseUrl: "",
      description: "",
      categories: [],
    },
  });

  const { data: categories } = useAdminCategoriesQuery();
  const { mutateAsync: createWebsite, isPending } =
    useAdminWebsiteCreateMutation();

  const setStage = useCreateWebsiteModalStore((s) => s.setStage);
  const setWebsiteId = useCreateWebsiteModalStore((s) => s.setWebsiteId);

  const onSubmit = async (data: CreateWebsiteSchema) => {
    const result = await createWebsite(data);
    setStage("assets");
    setWebsiteId(result.id);
    form.reset();
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
    >
      <Controller
        name="name"
        control={form.control}
        render={({ field }) => (
          <TextField name="name" type="text">
            <Label>Name</Label>
            <Input placeholder="Enter website name" {...field} />
            <p className="text-red-500">
              {form.formState.errors.name?.message}
            </p>
          </TextField>
        )}
      />
      <Controller
        name="baseUrl"
        control={form.control}
        render={({ field }) => (
          <TextField name="url" type="text">
            <Label>URL</Label>
            <Input type="url" placeholder="Enter your url" {...field} />
            <p className="text-red-500">
              {form.formState.errors.baseUrl?.message}
            </p>
          </TextField>
        )}
      />
      <Controller
        name="description"
        control={form.control}
        render={({ field }) => (
          <TextField name="description" type="text">
            <Label>Description</Label>
            <TextArea placeholder="Enter your description" {...field} />
            <p className="text-red-500">
              {form.formState.errors.description?.message}
            </p>
          </TextField>
        )}
      />
      <Controller
        name="categories"
        control={form.control}
        render={({ field }) => (
          <Select
            {...field}
            placeholder="Select countries"
            selectionMode="multiple"
          >
            <Label>Categories</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox selectionMode="multiple">
                {categories?.map(({ name, id }) => (
                  <ListBox.Item key={id} id={id} textValue={name}>
                    {name}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
        )}
      />

      <div className="flex justify-end gap-3">
        <Button
          type="submit"
          variant="primary"
          isDisabled={!form.formState.isValid || isPending}
          isPending={isPending}
        >
          Add Website
        </Button>
      </div>
    </form>
  );
}
