import { api } from "@/services/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export const useGetTransactions = () => {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const { data } = await api.get(`/transactions?pageSize=30&page=1`);
      return data.data;
    },
  });
};

export default useGetTransactions;
