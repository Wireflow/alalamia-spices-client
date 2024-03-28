import { Product } from "@prisma/client";
import { api } from "../services/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export const useGetProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async (): Promise<Product[]> => {
      const { data } = await api.get("/products?pageSize=50&sort=asc");

      return data.data;
    },
  });
};
