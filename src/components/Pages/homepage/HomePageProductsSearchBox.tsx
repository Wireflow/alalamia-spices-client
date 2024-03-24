import { Input } from "@/components/ui/input";
import { useHomeProductFilter } from "@/store/useHomeProductFilterStore";

const HomePageProductsSearchBox = () => {
  const setSearch = useHomeProductFilter((state) => state.setSearch);

  return (
    <Input
      placeholder="Search Inventory"
      className="w-fit border-primary"
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};

export default HomePageProductsSearchBox;
