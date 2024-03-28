import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import HomePage from "./components/pages/HomePage";
import ExpensesPage from "./components/expenses/ExpensesDataTable";
import FinancialsPage from "./components/pages/FinancialsPage";
import InventoryPage from "./components/pages/InventoryPage";
import MembersPage from "./components/pages/MembersPage";
import SignInPage from "./components/pages/SignInPage";
import TransactionsPage from "./components/pages/TransactionsPage";
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
      <div className="flex overflow-hidden gap-2 ">
        {session ? <Sidebar /> : null}

        <div className="w-full h-full">
          {session ? <Header /> : null}

          <Routes>
            <Route path="/" element={<SignInPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/members" element={<MembersPage />} />
            <Route path="/financials" element={<FinancialsPage />} />
            <Route path="/expenses" element={<ExpensesPage />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
