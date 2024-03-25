import { SEARCH_OPTIONS, SearchOptions } from "@/constants/cart";
import useDebounce from "@/hooks/useDebouce";
import { useSearchMember } from "@/hooks/useSearchMember";
import { useSelectMemberStore } from "@/store/useSelectMemberStore";
import { Loader2 } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import SelectMemberCard from "../members/SelectMemberCard";
import { cn } from "@/lib/utils";

const SelectMemberForm = () => {
  const { searchTerm, searchType, setSearchTerm, setSearchType } =
    useSelectMemberStore();

  const debouncedSearchTerm = useDebounce(searchTerm || "", 500);

  const { data: members, isLoading } = useSearchMember({
    searchTerm: debouncedSearchTerm,
    searchType,
  });

  return (
    <div className="grid gap-4">
      <div className="flex gap-2">
        <div className="flex-1">
          <Label className="capitalize">Search Member By {searchType}</Label>
          <Input
            type={searchType === "phone number" ? "number" : "text"}
            placeholder={`Member ${searchType}`}
            className="mt-1"
            value={searchTerm}
            onChange={(e) => {
              let search = e.target.value;
              if (searchType === "phone number" && search.length > 10) {
                search = search.slice(0, 10);
              }
              setSearchTerm(search);
            }}
          />
        </div>
        <div className="flex-[0.5]">
          <Label className="capitalize">Filter By</Label>
          <Select
            onValueChange={(option) => setSearchType(option as SearchOptions)}
            defaultValue={"address"}
          >
            <SelectTrigger className="capitalize bg-white h-10 mt-1">
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
      </div>
      <div
        className={cn("h-[200px] border rounded-xl overflow-hidden p-2", {
          "flex items-center justify-center": isLoading,
        })}
      >
        {members &&
          members.length > 0 &&
          members?.map((member) => (
            <SelectMemberCard key={member.id} member={member} />
          ))}
        {isLoading && <Loader2 className="animate-spin w-10 h-10" />}
      </div>
    </div>
  );
};

export default SelectMemberForm;
