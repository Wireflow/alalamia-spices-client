import { api } from "../services/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export const useGetProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await api.get("/products?pageSize=50");

      return data.data;
    },
  });
};
