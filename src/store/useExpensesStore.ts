import { Expense } from "@prisma/client";
import { create } from "zustand";

type useExpensesStoreType = {
  search: string;
  setSearch: (newSearch: string) => void;
  Expenses: Expense[];
  setExpenses: (Expenses: Expense[]) => void;
  setFilteredExpenses: (Expenses: Expense[]) => void;
  filteredExpenses: Expense[];
  filterExpenses: () => void;
};

export const useExpensesStore = create<useExpensesStoreType>((set, get) => ({
  search: "",
  setSearch: (newSearch) => set({ search: newSearch }),
  Expenses: [],
  setExpenses: (Expenses) => set({ Expenses: Expenses }),
  filteredExpenses: [],
  setFilteredExpenses: (Expenses) => set({ Expenses: Expenses }),
  filterExpenses: () => {
    const search = get().search.toLowerCase();
    const filteredExpenses = get().Expenses.filter(
      (Expense) =>
        Expense.name.toLowerCase().includes(search) 
        
    );

    const searchDelay = setTimeout(() => {
      set({ filteredExpenses });
    }, 1500);

    return () => clearTimeout(searchDelay);
  },
}));
