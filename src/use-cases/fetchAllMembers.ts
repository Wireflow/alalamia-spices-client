import { api } from "@/services/axiosInstance";
import { Member } from "@prisma/client";

const fetchAllMembers = async (): Promise<Member[] | null> => {
  try {
    const response = await api.get("/members");

    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch members:", error);
    return null;
  }
};

export default fetchAllMembers;
