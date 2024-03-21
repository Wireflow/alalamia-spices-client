import { api } from "../services/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export const useGetMembers = () => {
  return useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const { data } = await api.get("/members");

      return data.data;
    },
  });
};
