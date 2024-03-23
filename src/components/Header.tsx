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
      <div className="px-5 py-4  bg-[#302111] flex justify-between w-full  items-center rounded-lg shadow-2xl  ">
        <div>
          <p className="text-xl text-white font-medium">
            Welcome, <span className="font-black">Jamal</span>
          </p>
        </div>
      
      </div>
    </div>
  );
};

export default Header;
