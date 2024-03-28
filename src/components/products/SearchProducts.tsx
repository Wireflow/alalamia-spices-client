import { Product } from "@prisma/client";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";

type SearchProductsType = {
  table: Table<Product>;
};

type FilterTypes = "price" | "grams" | "name";
const FILTER_TYPES: FilterTypes[] = ["price", "grams", "name"];

const SearchProducts = ({ table }: SearchProductsType) => {
  const [filterBy, setFilterBy] = useState<FilterTypes>("name");
  const inputType =
    filterBy === "price" || filterBy === "grams" ? "number" : "text";

  return (
    <div className="flex gap-2 w-full">
      <Input
        placeholder={`Search expenses by ${filterBy}...`}
        value={(table.getColumn(filterBy)?.getFilterValue() as string) ?? ""}
        onChange={(e) => {
          table.getColumn(filterBy)?.setFilterValue(e?.target?.value);
        }}
        className="max-w-sm"
        type={inputType}
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
              {filter}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SearchProducts;
