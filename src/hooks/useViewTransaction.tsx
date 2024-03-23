import { Member } from "@prisma/client";
import { api } from "../services/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { Transaction } from "@prisma/client";




export const useViewTransaction = ({id} : Transaction) => {
  return useQuery({
    queryKey: ["transaction"],
    queryFn: async (): Promise<Member[]> => {
      const { data } = await api.get(
        `/transactions/${id}?products=true`
      );

      return data.product;
    },
  });
};
