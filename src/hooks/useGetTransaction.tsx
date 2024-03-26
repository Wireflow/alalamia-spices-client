import { api } from "@/services/axiosInstance";
import { Transaction, PurchasedProduct } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

type TransactionWithProducts = Transaction & {
  purchasedProducts: PurchasedProduct[];
};

export const useGetTransaction = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: [id],
    queryFn: async (): Promise<TransactionWithProducts | null> => {
      if (!id) return null;

      const { data } = await api.get(`/transactions/${id}?products=true`);
      return data.data;
    },
  });
};

export default useGetTransaction;
