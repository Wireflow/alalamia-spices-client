import React from "react";
import { Link, useLocation } from "react-router-dom";

type Props = {
  to: string;
  display: string;
  icon: React.ReactNode;
};

const NavLink = ({ to, display, icon }: Props) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link to={to}>
      <div
        className={`flex flex-col items-center   p-3 cursor-pointer ${
          isActive ? "rounded-l-full bg-primary text-white" : ""
        }`}
      >
        {icon}
        <p className=" text-sm font-medium ">{display}</p>
      </div>
    </Link>
  );
};

export default NavLink;
