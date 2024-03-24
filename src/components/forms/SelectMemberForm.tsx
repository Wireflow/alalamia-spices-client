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
  const [isSearching, setIsSearching] = useState(false);
  const {
    data: members,
    refetch,
    isLoading,
  } = useSearchMember({
    address: searchType === "address" ? searchTerm : "",
    phoneNumber: searchType === "phoneNumber" ? searchTerm : "",
    isSearching,
  });

  const search = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
    }, 2000);
  };

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
      <Button
        className="w-full mt-4"
        disabled={isLoading}
        onClick={() => search()}
      >
        {isLoading ? "Searching..." : "Search"}
      </Button>
    </div>
  );
};

export default SelectMemberForm;
