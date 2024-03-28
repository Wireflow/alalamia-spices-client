import { Member, PurchasedProduct, Transaction } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { api } from "../services/axiosInstance";

type TransactionWithProductsAndMember = Transaction & {
  purchasedProducts: PurchasedProduct[];
  member: Member;
};

export const useViewTransaction = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: ["transaction", id],
    queryFn: async (): Promise<TransactionWithProductsAndMember> => {
      const { data } = await api.get(`/transactions/${id}?products=true`);
      return data.data;
    },
  });
};
