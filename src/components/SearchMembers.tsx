import { useMembersStore } from "@/store/useMembersStore";
import { Input } from "./ui/input";

const SearchMembers = () => {
  const { setSearch } = useMembersStore();

  return (
    <Input
      placeholder="Search Member"
      className="w-fit border-primary"
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};

export default SearchMembers;
