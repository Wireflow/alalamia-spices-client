import { api } from "@/services/axiosInstance";
import { MemberType } from "@/types/member";
import { Member } from "@prisma/client";

const submitNewMember = async (member: MemberType): Promise<Member | null> => {
  try {
    const response = await api.post("/members", member);

    return response.data.data;
  } catch (error) {
    console.error("Failed to submit new member:", error);
    return null;
  }
};

export default submitNewMember;
