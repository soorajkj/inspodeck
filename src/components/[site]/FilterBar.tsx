"use client";

import { useMemo, useState } from "react";
import { Accordion } from "@base-ui/react/accordion";
import { Checkbox } from "@base-ui/react/checkbox";
import { CheckboxGroup } from "@base-ui/react/checkbox-group";
import { ArrowDown01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useWebsitesFilters } from "@/hooks/useWebsitesFilters";
import { useCategoriesQuery } from "@/hooks/useCategoriesQuery";

export default function FilterBar() {
  return (
    <aside className="scrollbar-none flex h-full flex-col overflow-y-auto px-1 py-12">
      <Accordion.Root
        multiple={true}
        defaultValue={["category"]}
        className="grid divide-y divide-neutral-200"
      >
        <CategoryFilter />
      </Accordion.Root>
    </aside>
  );
}

function CategoryFilter() {
  const [search, setSearch] = useState("");
  const { data: categories = [] } = useCategoriesQuery();
  const { categories: selectedCategories, setCategories } =
    useWebsitesFilters();

  const handleValueChange = (values: string[]) => {
    setCategories(values.length > 0 ? values : null);
  };

  const filteredCategories = useMemo(() => {
    return categories.filter((category) =>
      category.name.toLowerCase().trim().includes(search.toLowerCase().trim())
    );
  }, [categories, search]);

  return (
    <Accordion.Item value="category">
      <Accordion.Header>
        <Accordion.Trigger className="group flex w-full items-center justify-between py-4">
          <span className="text-sm font-medium">Category</span>
          <div className="transition group-data-panel-open:rotate-180 [&_svg]:size-4">
            <HugeiconsIcon icon={ArrowDown01Icon} strokeWidth={2} />
          </div>
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Panel>
        <div className="space-y-4 pb-4">
          <div className="relative inline-flex w-full items-center">
            <input
              type="text"
              placeholder="Search text in screenshots"
              className="w-full rounded-xl border border-neutral-100 bg-neutral-100 px-3 py-2.5 text-sm text-neutral-800 transition-all focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:outline-none"
              autoComplete="off"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <CheckboxGroup
              value={selectedCategories}
              onValueChange={handleValueChange}
              className="flex flex-col items-start gap-2"
            >
              {filteredCategories.map((category) => (
                <label
                  key={category.slug}
                  className="flex w-full items-center gap-2 text-neutral-600"
                >
                  <Checkbox.Root
                    name={category.name}
                    value={category.slug}
                    className="flex size-4 items-center justify-center rounded-md border border-neutral-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800 data-checked:border-neutral-950 data-checked:bg-neutral-950 data-checked:text-white"
                  >
                    <Checkbox.Indicator className="flex size-3 [&_svg]:size-3">
                      <HugeiconsIcon icon={Tick02Icon} strokeWidth={3} />
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  <span className="flex flex-1 text-sm font-medium">
                    {category.name}
                  </span>
                  <span className="text-sm font-medium text-neutral-400">
                    {category.count}
                  </span>
                </label>
              ))}
            </CheckboxGroup>
          </div>
        </div>
      </Accordion.Panel>
    </Accordion.Item>
  );
}
