"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Input,
  Label,
  TextArea,
  TextField,
  Select,
  ListBox,
  Button,
} from "@heroui/react";
import {
  CreateWebsiteWithoutImageSchema,
  createWebsiteWithoutImageSchema,
} from "@/utils/schemas/website";
import {
  useCategoriesQuery,
  usePagesQuery,
  useTechQuery,
  useFontsQuery,
} from "@/hooks/useComponentsQuery";
import { useAdminWebsiteCreateMutation } from "@/hooks/useAdminMutations";
import { useCreateWebsiteStore } from "@/hooks/useCreateWebisteStore";

export default function CreateWebsite() {
  const { mutateAsync: createWebsite } = useAdminWebsiteCreateMutation();
  const { data: categories = [] } = useCategoriesQuery();
  const { data: pages = [] } = usePagesQuery();
  const { data: tech = [] } = useTechQuery();
  const { data: fonts = [] } = useFontsQuery();
  const nextStep = useCreateWebsiteStore((s) => s.nextStep);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createWebsiteWithoutImageSchema),
    mode: "onSubmit",
    defaultValues: {
      title: "",
      url: "",
      description: "",
      categoryIds: [],
      pageIds: [],
      techIds: [],
      fontIds: [],
    },
  });

  const onSubmit = async (data: CreateWebsiteWithoutImageSchema) => {
    const { id } = await createWebsite(data);
    nextStep(id);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <TextField name="title" type="text">
            <Label>Title</Label>
            <Input
              placeholder="Enter your title"
              variant="secondary"
              {...field}
            />
            <p className="text-red-500">{errors.title?.message}</p>
          </TextField>
        )}
      />
      <Controller
        name="url"
        control={control}
        render={({ field }) => (
          <TextField name="url" type="text">
            <Label>URL</Label>
            <Input
              type="url"
              placeholder="Enter your url"
              variant="secondary"
              {...field}
            />
            <p className="text-red-500">{errors.url?.message}</p>
          </TextField>
        )}
      />
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField name="description" type="text">
            <Label>Description</Label>
            <TextArea
              placeholder="Enter your description"
              variant="secondary"
              {...field}
            />
            <p className="text-red-500">{errors.description?.message}</p>
          </TextField>
        )}
      />
      <Controller
        name="categoryIds"
        control={control}
        render={({ field }) => (
          <Select
            placeholder="Select categories"
            selectionMode="multiple"
            variant="secondary"
            {...field}
          >
            <Label>Categories</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox selectionMode="multiple">
                {categories.map((category) => (
                  <ListBox.Item
                    key={category.id}
                    id={category.id}
                    textValue={category.name}
                  >
                    {category.name}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
        )}
      />
      <Controller
        name="pageIds"
        control={control}
        render={({ field }) => (
          <Select
            placeholder="Select page types"
            selectionMode="multiple"
            variant="secondary"
            {...field}
          >
            <Label>Page</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox selectionMode="multiple">
                {pages.map((page) => (
                  <ListBox.Item
                    key={page.id}
                    id={page.id}
                    textValue={page.name}
                  >
                    {page.name}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
        )}
      />
      <Controller
        name="techIds"
        control={control}
        render={({ field }) => (
          <Select
            placeholder="Select technologies"
            selectionMode="multiple"
            variant="secondary"
            {...field}
          >
            <Label>Technologies</Label>

            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox selectionMode="multiple">
                {tech.map((tech) => (
                  <ListBox.Item
                    key={tech.id}
                    id={tech.id}
                    textValue={tech.name}
                  >
                    {tech.name}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
        )}
      />
      <Controller
        name="fontIds"
        control={control}
        render={({ field }) => (
          <Select
            placeholder="Select fonts"
            selectionMode="multiple"
            variant="secondary"
            {...field}
          >
            <Label>Fonts</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox selectionMode="multiple">
                {fonts.map((font) => (
                  <ListBox.Item
                    key={font.id}
                    id={font.id}
                    textValue={font.name}
                  >
                    {font.name}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
        )}
      />

      <div className="flex justify-end gap-3">
        <Button type="submit" variant="primary">
          Add Website
        </Button>
      </div>
    </form>
  );
}
