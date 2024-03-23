import { Route, Routes } from "react-router-dom";
import "./App.css";
import CheckoutBar from "./components/CheckoutBar";
import Header from "./components/Header";
import Sidebar from "./components/layout/Sidebar";
import Financials from "./components/Pages/Financials";
import Inventory from "./components/Pages/Inventory";
import Members from "./components/Pages/Members";
import SignIn from "./components/Pages/SignIn";
import Transactions from "./components/Pages/Transactions";
import { getSession } from "./hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const session = getSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      console.log("logged in");
    }
    if (!session) {
      navigate("/");
    }
  }, [session, navigate]);

  return (
    <>
      <div className="flex max-h-[1300px] overflow-y-hidden gap-2 ">
        {session ? <Sidebar /> : null}

        <div className="w-full h-full">
          {session ? <Header /> : null}

          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/home" element={<CheckoutBar />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/members" element={<Members />} />
            <Route path="/financials" element={<Financials />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
