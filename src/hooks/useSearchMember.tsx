import { Member } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { api } from "../services/axiosInstance";

type SearchMemberProps = {
  address?: string;
  phoneNumber?: string;
};

export const useSearchMember = (options: SearchMemberProps) => {
  const { address, phoneNumber } = options;
  const searchOption =
    address && address.length >= 3
      ? `get-by-address?address=${address}`
      : phoneNumber && phoneNumber.length >= 4
      ? `get-by-phone?phoneNumber=${phoneNumber}`
      : null;

  return useQuery({
    queryKey: ["searchMember", searchOption],
    queryFn: async (): Promise<Member[]> => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const { data } = await api.get(`/members/${searchOption}`);
      return data.data;
    },
    enabled: Boolean(searchOption),
  });
};
