import { Member } from "@prisma/client";
import { api } from "../services/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export const useGetMembers = () => {
  return useQuery({
    queryKey: ["members"],
    queryFn: async (): Promise<Member[]> => {
      const { data } = await api.get("/members?pageSize=20");

      return data.data;
    },
  });
};
