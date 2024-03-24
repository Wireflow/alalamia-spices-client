import { Product } from "@prisma/client";
import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import NewMemberDialog from "../dialogs/NewMemberDialog";
import { Button } from "../ui/button";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import NewProductDialog from "../dialogs/NewProductDialog";
import useGetTransactions from "@/hooks/useGetTransactions";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Transaction } from "@prisma/client";
import ViewTransaction from "./ViewTransaction";

const TransactionTable = () => {
  const { data, isLoading } = useGetTransactions();

  const columns: ColumnDef<Transaction>[] = [
    {
      accessorKey: "orderNumber",
      header: "Order number",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("orderNumber")}</div>
      ),
    },
    {
      accessorKey: "totalAmount",
      header: "Amount",
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("totalAmount"));

        const formattedAmount = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);

        return <div className="capitalize">{formattedAmount}</div>;
      },
    },
    {
      accessorKey: "paymentMethod",
      header: "Payment method",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("paymentMethod")}</div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Transaction date",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("createdAt")}</div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <Dialog>
            <DialogTrigger>
              <Button>View</Button>
            </DialogTrigger>
            <DialogContent>
              <ViewTransaction transactionId={row.original.id} />
            </DialogContent>
          </Dialog>
        );
      },
    },
  ];

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 13,
  });

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
      pagination,
    },
  });

  if (!data?.length) return <div>No Products</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div className="rounded-lg border ">
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;
