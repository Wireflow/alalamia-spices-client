import { signOut } from "@/hooks/useAuth";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const LogOutButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => {
        signOut();
        navigate("/");
      }}
    >
      Log Out
    </Button>
  );
};

export default LogOutButton;
