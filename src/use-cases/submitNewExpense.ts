import { api } from "@/services/axiosInstance";
import { ExpenseType } from "@/types/expense";
import { Expense } from "@prisma/client";

const submitNewExpense = async (expense: ExpenseType): Promise<Expense | null> => {
  try {
    console.log(expense);
    const response = await api.post("/expenses", expense);
    return response.data.data;
  } catch (error) {
    console.error("Failed to submit new expense:", error);
    return null;
  }
};

export default submitNewExpense;
