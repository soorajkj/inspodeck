/* eslint-disable react-hooks/incompatible-library */

"use client";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Image from "next/image";
import { Button, Table } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useAdminWebsiteDeleteMutation } from "@/hooks/useAdminMutations";
import { AdminWebsite } from "@/types/response";
import { useAdminWebsitesQuery } from "@/hooks/useAdminQuery";

const columnHelper = createColumnHelper<AdminWebsite>();

export default function WebsitesTable() {
  const { data: websites = [] } = useAdminWebsitesQuery();
  const { mutateAsync: deleteWebsite, isPending: isDeleting } =
    useAdminWebsiteDeleteMutation();

  const columns = [
    columnHelper.accessor("name", {
      header: "Website",
      cell: (info) => (
        <div className="flex items-center gap-2">
          <div className="overflow-hidden rounded-lg border border-neutral-100">
            <Image
              src={info.row.original.icon || "https://placehold.co/28.png"}
              alt={info.row.original.name}
              width={28}
              height={28}
            />
          </div>
          <p>{info.getValue()}</p>
        </div>
      ),
    }),
    columnHelper.accessor("baseUrl", {
      header: "Link",
      cell: (info) => (
        <a
          href={info.getValue()}
          target="_blank"
          rel="noopener noreferrer"
          className="text-orange-600 hover:underline"
        >
          {new URL(info.getValue()).hostname}
        </a>
      ),
    }),
    columnHelper.accessor("categories", {
      header: "Categories",
      cell: (info) => info.getValue().join(", "),
    }),
    columnHelper.accessor("id", {
      header: undefined,
      cell: (info) => (
        <div className="flex items-center justify-end gap-2">
          <Button
            onClick={() => deleteWebsite(info.getValue())}
            isDisabled={isDeleting}
            isIconOnly={true}
            variant="ghost"
            size="sm"
          >
            <Icon icon="hugeicons:delete-01" />
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
    <Table>
      <Table.ScrollContainer>
        <Table.Content aria-label="Websites">
          <Table.Header>
            {table.getHeaderGroups()[0]!.headers.map((header) => (
              <Table.Column
                key={header.id}
                allowsSorting={header.column.getCanSort()}
                id={header.id}
                isRowHeader={header.id === "name"}
              >
                {() =>
                  flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )
                }
              </Table.Column>
            ))}
          </Table.Header>
          <Table.Body>
            {table.getRowModel().rows.map((row) => (
              <Table.Row key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Table.Cell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}
