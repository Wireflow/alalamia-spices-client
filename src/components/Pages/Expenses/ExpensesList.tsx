import { useGetExpenses } from "@/hooks/useGetExpenses";
import { Expense } from "@prisma/client";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import FilterExpensesColumns from "./FilterExpensesColumns";
// import SearchExpenses from "./SearchExpenses";
// import EditMemberDialog from "../dialogs/EditMemberDialog";
// import NewMemberDialog from "../dialogs/NewMemberDialog";
import NewExpenseDialog from "@/components/dialogs/AddExpenseDialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import SearchExpenses from "./SearchExpenses";

// import SearchExpenses from "./SearchExpenses";

const ExpensesTable = () => {
  const { data, isLoading } = useGetExpenses();

  const columns: ColumnDef<Expense>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },

    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("amount"));

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
      //   cell: ({ row }) => {
      //     return <EditMemberDialog member={row.original} />;
      //   },
    },
  ];

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const table = useReactTable<Expense>({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  if (!data?.length) return <div>No Expenses</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex items-center py-4">
        <SearchExpenses table={table} />
        <div className="w-full flex gap-2">
          <FilterExpensesColumns table={table} />
          <NewExpenseDialog />
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

export default ExpensesTable;
