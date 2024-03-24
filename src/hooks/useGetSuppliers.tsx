import { api } from "../services/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export const useGetProducts = () => {
  return useQuery({
    queryKey: ["suppliers"],
    queryFn: async () => {
      const { data } = await api.get("/suppliers");
      return data.data;
    },
  });
};
