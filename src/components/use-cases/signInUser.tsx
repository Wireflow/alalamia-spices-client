import { api } from "@/services/axiosInstance";
import { SignInType } from "@/types/user";
import { User } from "@prisma/client";

const signInUser = async (User: SignInType): Promise<User | null> => {
  try {
    const response = await api.post("/auth/login", User);
  
    return response.data.data;
  } catch (error) {
    console.error("Failed to login Successfully", error);
    return null;
  }
};

export default signInUser;
