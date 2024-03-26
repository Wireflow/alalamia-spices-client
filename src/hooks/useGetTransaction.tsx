import { api } from "@/services/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export const useGetTransaction = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: [id],
    queryFn: async () => {
      if (!id) return;

      const { data } = await api.get(`/transactions/${id}`);
      return data.data;
    },
  });
};

export default useGetTransaction;
