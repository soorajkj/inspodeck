/* eslint-disable react-hooks/incompatible-library */

"use client";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
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
    columnHelper.accessor("title", {
      header: "Website",
    }),
    columnHelper.accessor("url", {
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
    columnHelper.accessor("pages", {
      header: "Page",
    }),
    columnHelper.accessor("categories", {
      header: "Categories",
      cell: (info) => info.getValue().join(", "),
    }),
    columnHelper.accessor("tech", {
      header: "Tech Stack",
      cell: (info) => info.getValue().join(", "),
    }),
    columnHelper.accessor("fonts", {
      header: "Fonts",
      cell: (info) => info.getValue().join(", "),
    }),
    columnHelper.accessor("likes", {
      header: "Likes",
    }),
    columnHelper.accessor("id", {
      header: undefined,
      cell: (info) => (
        <Button
          onClick={() => deleteWebsite(info.getValue())}
          isDisabled={isDeleting}
          isIconOnly={true}
          variant="ghost"
          size="sm"
        >
          <Icon icon="hugeicons:delete-01" />
        </Button>
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
                isRowHeader={header.id === "title"}
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
