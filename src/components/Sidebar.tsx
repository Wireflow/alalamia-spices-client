import {
  CandlestickChart,
  Home,
  ShoppingCart,
  UsersRound,
  WalletMinimal,
} from "lucide-react";
import logo from "../assets/Logo.png";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const isActiveLink = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      <div className="">
          <div className="bg-white  h-screen  flex flex-col gap-5   shadow-black shadow-lg justify-between ">
            <div>
              <Link to={"/"}>
                <div className="shadow-md p-3 cursor-pointer">
                  <img src={logo} alt="Logo" className="w-[80px]" />
                </div>
              </Link>
              <div className="flex flex-col  pt-10 ml-2 gap-5">
                <Link to={"/"}>
                  <div
                    className={`flex flex-col items-center   p-3 cursor-pointer ${
                      isActiveLink("/")
                        ? "rounded-l-full bg-[#302111] text-white"
                        : ""
                    }`}
                  >
                    <Home size={25} />
                    <p className=" text-sm font-medium ">Home</p>
                  </div>
                </Link>
                <Link to={"Inventory"}>
                  <div
                    className={`flex flex-col items-center   p-3 cursor-pointer ${
                      isActiveLink("/Inventory")
                        ? "rounded-l-full bg-[#302111] text-white"
                        : ""
                    }`}
                  >
                    <ShoppingCart size={25} />
                    <p className=" text-sm font-medium">Inventory</p>
                  </div>
                </Link>
                <Link to={"Transactions"}>
                  <div
                    className={`flex flex-col items-center   p-3 cursor-pointer ${
                      isActiveLink("/Transactions")
                        ? "rounded-l-full bg-[#302111] text-white"
                        : ""
                    }`}
                  >
                    <WalletMinimal size={25} />
                    <p className=" text-sm font-medium">Transactions</p>
                  </div>
                </Link>
                <Link to={"Members"}>
                  <div
                    className={`flex flex-col items-center   p-3 cursor-pointer ${
                      isActiveLink("/Members")
                        ? "rounded-l-full bg-[#302111] text-white"
                        : ""
                    }`}
                  >
                    <UsersRound size={25} />
                    <p className=" text-sm font-medium">Members</p>
                  </div>
                </Link>
                <Link to={"financials"}>
                  <div
                    className={`flex flex-col items-center gap-1  p-3 cursor-pointer ${
                      isActiveLink("/financials")
                        ? "rounded-l-full bg-[#302111] text-white"
                        : ""
                    }`}
                  >
                    <CandlestickChart size={25} />
                    <p className="text-sm font-medium">Financials</p>
                  </div>
                </Link>
              </div>
            </div>
           
          </div>
      </div>
    </>
  );
};

export default Sidebar;
