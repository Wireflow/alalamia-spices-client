import { Member } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { api } from "../services/axiosInstance";
import { SearchOptions } from "@/constants/cart";

type SearchMemberProps = {
  searchTerm?: string;
  searchType?: SearchOptions;
};

export const useSearchMember = (options: SearchMemberProps) => {
  const { searchTerm, searchType } = options;

  const searchOption =
    searchTerm && searchTerm.length >= 3
      ? `get-by-address?address=${searchTerm}`
      : searchType === "phone number" && searchTerm && searchTerm.length >= 4
      ? `get-by-phone?phoneNumber=${searchTerm}`
      : null;

  return useQuery<Member[]>({
    queryKey: ["searchMember", searchOption],
    queryFn: async () => {
      if (!searchOption) {
        return null;
      }
      const { data } = await api.get(`/members/${searchOption}`);
      return data.data;
    },
  });
};
