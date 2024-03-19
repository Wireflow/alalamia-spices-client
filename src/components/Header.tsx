import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";

const Header = () => {
  return (
    <div className="px-5 py-2  bg-zinc-800 flex justify-between w-full border items-center rounded-lg shadow-2xl">
      <div>
        <p className="text-xl text-white font-medium">Welcome, <span className="font-black">Jamal</span></p>
      </div>
      <Avatar className="w-[40px] h-[40px]">
        <AvatarImage src="" />
        <AvatarFallback>AS</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default Header;
