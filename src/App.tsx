import { Route, Routes } from "react-router-dom";
import "./App.css";
import CheckoutBar from "./components/CheckoutBar";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Financials from "./components/pages/Financials";
import Inventory from "./components/pages/Inventory";
import Members from "./components/pages/Members";
import SignIn from "./components/pages/SignIn";
import Transactions from "./components/pages/Transactions";

function App() {
  return (
    <>
      <div className="flex max-h-[1300px] overflow-y-hidden gap-2 ">
        <Sidebar />
        <div className="w-full h-full">
          <Header />
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
