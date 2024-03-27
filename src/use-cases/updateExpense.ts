import { api } from "@/services/axiosInstance";
import { ExpenseType } from "@/types/expense";
import { Expense } from "@prisma/client";

const updateExpense = async (expense: ExpenseType): Promise<Expense | null> => {
  try {
    const response = await api.put(`/expenses/${expense.id}`, expense);

    return response.data;
  } catch (error) {
    console.error("Failed to update expense:", error);
    return null;
  }
};

export default updateExpense;
