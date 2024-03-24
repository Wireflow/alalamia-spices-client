import { Supplier } from "@prisma/client";
import { api } from "../services/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export const useGetSuppliers = () => {
  return useQuery({
    queryKey: ["suppliers"],
    queryFn: async (): Promise<Supplier[]> => {
      const { data } = await api.get("/suppliers");
      return data.data;
    },
  });
};
