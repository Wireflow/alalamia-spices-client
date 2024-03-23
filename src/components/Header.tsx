import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { getSession, signOut } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const session = getSession();

  return (
    <div className="p-1">
      <div className="px-5 py-2  bg-[#302111] flex justify-between w-full  items-center rounded-lg shadow-2xl  ">
        <div>
          <p className="text-xl text-white font-medium">
            Welcome, <span className="font-black">Jamal</span>
          </p>
        </div>
        <Popover>
          <PopoverTrigger>
            <Avatar className="w-[40px] h-[40px]">
              <AvatarImage src="" />
              <AvatarFallback>AS</AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent className="flex flex-col gap-3 ">
            <div>
              <p className="font-medium text-center">{session?.email}</p>
            </div>{" "}
            <Button
              onClick={() => {
                signOut();
                navigate("/");
              }}
            >
              Log Out
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Header;
