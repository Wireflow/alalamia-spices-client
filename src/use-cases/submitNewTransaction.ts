import { api } from "@/services/axiosInstance";
import { TransactionType } from "@/types/transaction";
import { Transaction } from "@prisma/client";

const submitNewTransaction = async (
  transaction: TransactionType
): Promise<Transaction | null> => {
  try {
    console.log(transaction);
    const response = await api.post("/transactions", transaction);
    return response.data.data;
  } catch (error) {
    console.error("Failed to submit new transaction:", error);
    return null;
  }
};

export default submitNewTransaction;
