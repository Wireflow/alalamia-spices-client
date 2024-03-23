import { useGetMembers } from "@/hooks/useGetMembers";
import { Member } from "@prisma/client";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import FilterMembersColumns from "./FilterMembersColumns";
import SearchMembers from "./SearchMembers";
import EditMemberDialog from "./dialogs/EditMemberDialog";
import NewMemberDialog from "./dialogs/NewMemberDialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const MembersTable = () => {
  const { data, isLoading } = useGetMembers();

  const columns: ColumnDef<Member>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "address",
      header: "Address",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("address")}</div>
      ),
    },
    {
      accessorKey: "phoneNumber",
      header: "Phone Number",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("phoneNumber")}</div>
      ),
    },
    {
      accessorKey: "owedBalance",
      header: "Balance",
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("owedBalance"));

        const formattedAmount = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);

        return <div className="capitalize">{formattedAmount}</div>;
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        return <EditMemberDialog member={row.original} />;
      },
    },
  ];

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  if (!data?.length) return <div>No Members</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex items-center py-4">
        <SearchMembers table={table} />
        <div className="w-full flex gap-2">
          <FilterMembersColumns table={table} />
          <NewMemberDialog />
        </div>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center relative"
                >
                  <p>No results found.</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MembersTable;
