import {  Transaction } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { api } from "../services/axiosInstance";

export const useViewTransaction = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: ["transaction", id],
    queryFn: async (): Promise<Transaction> => {
      const { data } = await api.get(`/transactions/${id}?products=true`);
      return data.data;
    },
  });
};
