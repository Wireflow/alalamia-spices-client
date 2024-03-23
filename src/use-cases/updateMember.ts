import { api } from "@/services/axiosInstance";
import { MemberType } from "@/types/member";
import { Member } from "@prisma/client";

const updateMember = async (member: MemberType): Promise<Member | null> => {
  try {
    const response = await api.put(`/members/${member.id}`, member);

    return response.data;
  } catch (error) {
    console.error("Failed to update member:", error);
    return null;
  }
};

export default updateMember;
