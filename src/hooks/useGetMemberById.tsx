import { useQuery } from "@tanstack/react-query";
import { api } from "../services/axiosInstance";

const useGetMemberById = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: ["memberId"],
    queryFn: async () => {
      const { data } = await api.get(`/memeber/${id}`);
      return data;
    },
  });
};

export default useGetMemberById;
