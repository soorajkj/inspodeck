/* eslint-disable react-hooks/incompatible-library */

"use client";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Image from "next/image";
import {
  Link01Icon,
  Globe02Icon,
  Delete02Icon,
} from "@hugeicons/core-free-icons";
import { Button } from "@base-ui/react/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { useWebsitesQuery } from "@/hooks/useWebsitesQuery";
import { useWebsitesDeleteMutation } from "@/hooks/useWebsitesMutations";
import { TWebsite } from "@/types/response";

const columnHelper = createColumnHelper<TWebsite>();

export default function Websites() {
  const { data: websites = [] } = useWebsitesQuery();
  const { mutateAsync: deleteWebsite, isPending: isDeleting } =
    useWebsitesDeleteMutation();

  const columns = [
    columnHelper.accessor("image", {
      header: "Image",
      cell: (info) => (
        <div className="h-10 w-16 overflow-hidden rounded-md border border-gray-100 bg-gray-50">
          {info.getValue() ? (
            <Image
              src={info.getValue()!}
              alt={info.row.original.title}
              className="h-full w-full object-cover"
              width={64}
              height={40}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <HugeiconsIcon
                icon={Link01Icon}
                className="h-4 w-4 text-gray-400"
              />
            </div>
          )}
        </div>
      ),
    }),
    columnHelper.accessor("title", {
      header: "Website",
      cell: (info) => (
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-900">
            {info.getValue()}
          </span>
          <span className="line-clamp-1 text-sm text-gray-500">
            {info.row.original.description}
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
          className="inline-flex items-center gap-1.5 text-sm text-orange-500 hover:underline"
        >
          <HugeiconsIcon icon={Link01Icon} className="h-3 w-3" />
          {new URL(info.getValue()).hostname}
        </a>
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
    columnHelper.accessor("id", {
      header: "Actions",
      cell: (info) => (
        <div className="flex justify-end pr-4">
          <Button
            onClick={() => {
              if (confirm("Are you sure you want to delete this website?")) {
                deleteWebsite(info.getValue());
              }
            }}
            disabled={isDeleting}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-all hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
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
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">Websites Registry</h2>
        <span className="text-xs text-gray-500">{websites.length} total</span>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="border-b border-gray-100 px-6 py-4 text-sm font-medium"
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
            <tbody className="divide-y divide-gray-100">
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="transition-colors hover:bg-gray-50/50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!websites.length && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-3 rounded-full bg-gray-50 p-3">
              <HugeiconsIcon
                icon={Globe02Icon}
                className="h-6 w-6 text-gray-400"
              />
            </div>
            <p className="text-sm font-medium text-gray-900">
              No websites found
            </p>
            <p className="text-xs text-gray-500">
              Get started by creating your first website.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
