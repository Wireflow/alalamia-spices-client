import { useExpensesStore } from "@/store/useExpensesStore";
import { Input } from "../../ui/input";

const SearchExpenses = () => {
  const { setSearch } = useExpensesStore();

  return (
    <Input
      placeholder="Search Expense"
      className="w-fit border-primary"
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};

export default SearchExpenses;
