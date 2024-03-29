import { api } from "../services/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export const useGetExpenses = () => {
  return useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      const { data } = await api.get("/expenses");

      return data.data;
    },
  });
};
