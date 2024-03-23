import { Member } from "@prisma/client";
import { Table } from "@tanstack/react-table";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";

type SearchMembersType = {
  table: Table<Member>;
};

type FilterTypes = "address" | "name" | "phoneNumber";
const FILTER_TYPES: FilterTypes[] = ["address", "name", "phoneNumber"];

const SearchMembers = ({ table }: SearchMembersType) => {
  const [filterBy, setFilterBy] = useState<FilterTypes>("address");
  const renderFilterBy = filterBy === "phoneNumber" ? "phone number" : filterBy;

  return (
    <div className="flex gap-2 w-full">
      <Input
        placeholder={`Search members by ${renderFilterBy}...`}
        value={(table.getColumn(filterBy)?.getFilterValue() as string) ?? ""}
        onChange={(event) => {
          table.getColumn(filterBy)?.setFilterValue(event.target.value);
        }}
        className="max-w-sm"
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

export default SearchMembers;
