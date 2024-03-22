import { Session, Token } from "@/hooks/useAuth";
import { api } from "@/services/axiosInstance";
import { SignInType } from "@/types/user";

type UserSignInReturnType = {
  token: Token;
  auth: boolean;
  session: Session;
};

const signInUser = async (
  User: SignInType
): Promise<UserSignInReturnType | null> => {
  try {
    const response = await api.post("/auth/login", User);

    return response.data;
  } catch (error) {
    console.error("Failed to login Successfully", error);
    return null;
  }
};

export default signInUser;
