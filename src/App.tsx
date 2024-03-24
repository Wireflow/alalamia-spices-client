import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import CheckoutBar from "./components/CheckoutBar";
import Header from "./components/Header";
import Sidebar from "./components/layout/Sidebar";
import Expenses from "./components/pages/Expenses/ExpensesList";
import Financials from "./components/pages/Financials";
import Inventory from "./components/pages/Inventory";
import Members from "./components/pages/Members";
import SignIn from "./components/pages/SignIn";
import Transactions from "./components/pages/Transactions";
import { getSession } from "./hooks/useAuth";

function App() {
  const session = getSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!session) {
      navigate("/");
    }
  }, [session, navigate]);

  return (
    <>
      <div className="flex max-h-[1300px] overflow-hidden gap-2 ">
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
            <Route path="/expenses" element={<Expenses />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
