import {
  CandlestickChart,
  Home,
  ShoppingCart,
  UsersRound,
  WalletMinimal,
} from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../../assets/Logo.png";
import LogOutButton from "../auth/LogOutButton";
import NavLink from "./NavLink";

const Sidebar = () => {
  const navLinks = [
    {
      to: "/home",
      display: "Home",
      icon: <Home size={25} />,
    },
    {
      to: "/inventory",
      display: "Inventory",
      icon: <ShoppingCart size={25} />,
    },
    {
      to: "/transactions",
      display: "Transactions",
      icon: <WalletMinimal size={25} />,
    },
    {
      to: "/members",
      display: "Members",
      icon: <UsersRound size={25} />,
    },
    {
      to: "/financials",
      display: "Financials",
      icon: <CandlestickChart size={25} />,
    },
  ];

  return (
    <div className="bg-white h-screen flex flex-col gap-5   shadow-black shadow-lg justify-between ">
      <div className="h-full flex flex-col justify-between">
        <div className="flex flex-col  gap-5">
          <Link to={"/home"}>
            <div className="shadow-md p-3 cursor-pointer">
              <img src={logo} alt="Logo" className="w-[80px]" />
            </div>
          </Link>
          <div className="ml-2">
            {navLinks.map((link, index) => (
              <NavLink
                to={link.to}
                display={link.display}
                icon={link.icon}
                key={index}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center py-2">
          <LogOutButton />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
