import { useGetProducts } from "@/hooks/useGetProducts";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import NewProductDialog from "../dialogs/NewProductDialog";
import EditInventoryDialog from "../dialogs/EditInventoryDialog";

const InventoryTable = () => {
  const { data, isLoading } = useGetProducts();

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "name",
      header: "Product Name",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("price"));

        const formattedAmount = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);

        return <div className="capitalize">{formattedAmount}</div>;
      },
    },
    {
      accessorKey: "boxQuantity",
      header: "Amount of Boxes",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("boxQuantity") || 0}</div>
      ),
    },
    {
      accessorKey: "grams",
      header: "Grams",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("grams") || 0}</div>
      ),
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("quantity") || 0}</div>
      ),
    },
    {
      id: "actions",
      header: 'Action',
      enableHiding: false,
      cell: ({row}) => {
        return <EditInventoryDialog product={row.original} />;
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
      <div className="flex items-center py-4">
        {/* <SearchMembers table={table} /> */}
        <div className="w-full flex gap-2">
          {/* <FilterMembersColumns table={table} /> */}
           <NewProductDialog /> 
          
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

export default InventoryTable;
