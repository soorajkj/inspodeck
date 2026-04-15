/* eslint-disable react-hooks/incompatible-library */

"use client";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Delete02Icon } from "@hugeicons/core-free-icons";
import { Button } from "@base-ui/react/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { useAdminWebsiteDeleteMutation } from "@/hooks/useAdminMutations";
import { AdminWebsite } from "@/types/response";
import { useAdminWebsitesQuery } from "@/hooks/useAdminQuery";

const columnHelper = createColumnHelper<AdminWebsite>();

export default function WebsitesTable() {
  const { data: websites = [] } = useAdminWebsitesQuery();
  const { mutateAsync: deleteWebsite, isPending: isDeleting } =
    useAdminWebsiteDeleteMutation();

  const columns = [
    columnHelper.accessor("title", {
      header: "Website",
      cell: (info) => (
        <div className="flex flex-col">
          <span className="text-sm font-medium text-neutral-900">
            {info.getValue()}
          </span>
        </div>
      ),
    }),
    columnHelper.accessor("url", {
      header: "Link",
      cell: (info) => (
        <a
          href={info.getValue()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-orange-600 hover:underline"
        >
          {new URL(info.getValue()).hostname}
        </a>
      ),
    }),
    columnHelper.accessor("pages", {
      header: "Page",
      cell: (info) => (
        <div className="flex flex-wrap gap-1">
          {info.getValue().map((page) => (
            <span
              key={page}
              className="rounded-full bg-orange-50 px-2 py-0.5 text-xs text-orange-700"
            >
              {page}
            </span>
          ))}
        </div>
      ),
    }),
    columnHelper.accessor("categories", {
      header: "Categories",
      cell: (info) => (
        <div className="flex flex-wrap gap-1">
          {info.getValue().map((cat) => (
            <span
              key={cat}
              className="rounded-full bg-orange-50 px-2 py-0.5 text-xs text-orange-700"
            >
              {cat}
            </span>
          ))}
        </div>
      ),
    }),
    columnHelper.accessor("tech", {
      header: "Tech Stack",
      cell: (info) => (
        <div className="flex flex-wrap gap-1">
          {info.getValue().map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-orange-50 px-2 py-0.5 text-xs text-orange-700"
            >
              {tech}
            </span>
          ))}
        </div>
      ),
    }),
    columnHelper.accessor("fonts", {
      header: "Fonts",
      cell: (info) => (
        <div className="flex flex-wrap gap-1">
          {info.getValue().map((font) => (
            <span
              key={font}
              className="rounded-full bg-orange-50 px-2 py-0.5 text-xs text-orange-700"
            >
              {font}
            </span>
          ))}
        </div>
      ),
    }),
    columnHelper.accessor("likes", {
      header: "Likes",
      cell: (info) => (
        <span className="text-neutral-500">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("id", {
      header: undefined,
      cell: (info) => (
        <div className="flex justify-end">
          <Button
            onClick={() => {
              if (confirm("Are you sure you want to delete this website?")) {
                deleteWebsite(info.getValue());
              }
            }}
            disabled={isDeleting}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 transition-all hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
          >
            <HugeiconsIcon icon={Delete02Icon} className="h-4 w-4" />
          </Button>
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data: websites,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="w-full border-collapse text-left">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className="border-b border-neutral-100 bg-neutral-100 px-4 py-2 text-sm font-medium"
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className="divide-y divide-neutral-100">
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className="transition-colors hover:bg-neutral-50/50">
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                className="border-r border-neutral-100 px-4 py-2 last:border-r-0"
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
