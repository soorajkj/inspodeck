"use client";

import { useState } from "react";
import { Button } from "@base-ui/react/button";
import { Input } from "@base-ui/react/input";
import {
  useCategoryCreateMutation,
  usePageCreateMutation,
  useTechCreateMutation,
  useFontCreateMutation,
} from "@/hooks/useComponentsMutations";
import {
  useCategoriesQuery,
  usePagesQuery,
  useTechQuery,
  useFontsQuery,
} from "@/hooks/useComponentsQuery";

function Section({
  title,
  data,
  mutate,
}: {
  title: string;
  data: { id: string; name: string }[];
  mutate: (data: { name: string }) => void;
}) {
  const [name, setName] = useState("");

  return (
    <div className="flex flex-col gap-6 rounded-lg border border-neutral-200 bg-white p-4">
      <h3 className="text-md font-bold text-gray-800">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {data?.map((item) => (
          <span
            key={item.id}
            className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
          >
            {item.name}
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder={`Add ${title.toLowerCase()}...`}
          className="flex-1 rounded border px-3 py-1 text-sm focus:border-rose-500 focus:outline-none"
        />
        <Button
          onClick={() => {
            if (name.trim()) {
              mutate({ name });
              setName("");
            }
          }}
          className="rounded-lg bg-rose-500 px-3 py-1 text-xs font-semibold text-white hover:bg-rose-500 disabled:opacity-50"
        >
          Add
        </Button>
      </div>
    </div>
  );
}

export default function ComponentManager() {
  const { data: categories = [] } = useCategoriesQuery();
  const { data: pages = [] } = usePagesQuery();
  const { data: tech = [] } = useTechQuery();
  const { data: fonts = [] } = useFontsQuery();

  const createCategory = useCategoryCreateMutation();
  const createPage = usePageCreateMutation();
  const createTech = useTechCreateMutation();
  const createFont = useFontCreateMutation();

  return (
    <div className="grid grid-cols-4 gap-4">
      <Section
        title="Categories"
        data={categories}
        mutate={createCategory.mutate}
      />
      <Section title="Pages" data={pages} mutate={createPage.mutate} />
      <Section title="Tech Stack" data={tech} mutate={createTech.mutate} />
      <Section title="Fonts" data={fonts} mutate={createFont.mutate} />
    </div>
  );
}
