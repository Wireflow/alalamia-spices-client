import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";

const Header = () => {
  return (
    <div className="p-1">
      <div className="px-5 py-2  bg-[#302111] flex justify-between w-full  items-center rounded-lg shadow-2xl  ">
        <div>
          <p className="text-xl text-white font-medium">Welcome, <span className="font-black">Jamal</span></p>
        </div>
        <Link to={'/signIn'} >
          <Avatar className="w-[40px] h-[40px]">
            <AvatarImage src="" />
            <AvatarFallback>AS</AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </div>
  );
};

export default Header;
