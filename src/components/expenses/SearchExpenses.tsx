import { Expense } from "@prisma/client";
import { Table } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

type SearchExpensesType = {
  table: Table<Expense>;
};

type FilterTypes = "name" | "amount";
const FILTER_TYPES: FilterTypes[] = ["name", "amount"];

const SearchExpenses = ({ table }: SearchExpensesType) => {
  const [filterBy, setFilterBy] = useState<FilterTypes>("name");
  const renderFilterBy = filterBy === "name" ? "amount" : filterBy;

  return (
    <div className="flex gap-2 w-full">
      <Input
        placeholder={`Search expenses by ${renderFilterBy}...`}
        value={(table.getColumn(filterBy)?.getFilterValue() as string) ?? ""}
        onChange={(e) => {
          table.getColumn(filterBy)?.setFilterValue(e?.target?.value);
        }}
        className="max-w-sm"
        type={filterBy === "amount" ? "number" : "text"}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size={"lg"}>
            Search By
            <ChevronDownIcon className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[9.5rem]">
          {FILTER_TYPES.map((filter, index) => (
            <DropdownMenuCheckboxItem
              key={index}
              className="capitalize"
              checked={filter === filterBy}
              onCheckedChange={() => {
                table.resetColumnFilters();
                setFilterBy(filter);
              }}
            >
              {filter === "amount" ? "amount" : filter}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SearchExpenses;
