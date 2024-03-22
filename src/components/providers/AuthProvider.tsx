import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const session = true;

  if (session) return navigate("/home");

  return <div>{children}</div>;
};

export default AuthProvider;
