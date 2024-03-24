import { SEARCH_OPTIONS, SearchOptions } from "@/constants/cart";
import { useSearchMember } from "@/hooks/useSearchMember";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const SelectMemberForm = () => {
  const [searchType, setSearchType] = useState<SearchOptions>();
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
  const { data: members, isPending } = useSearchMember({
    address: searchType === "address" ? searchTerm : "",
    phoneNumber: searchType === "phoneNumber" ? searchTerm : "",
  });

  useEffect(() => {
    console.log(members);
  }, [members]);

  return (
    <div className="grid gap-4">
      <Input
        type="text"
        placeholder="Member Address"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button className="w-full mt-4" disabled={isPending}>
        {isPending ? "Searching..." : "Search"}
      </Button>
      <Select
        onValueChange={(option) => setSearchType(option as SearchOptions)}
        defaultValue={"address"}
      >
        <SelectTrigger className="capitalize bg-white">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {SEARCH_OPTIONS.map((option) => (
            <SelectItem key={option} className="capitalize" value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectMemberForm;
