import { Route, Routes } from "react-router-dom";
import "./App.css";
import CheckoutBar from "./components/CheckoutBar";
import Sidebar from "./components/Sidebar";

import Header from "./components/Header";
import SignIn from "./components/Pages/SignIn";
import Inventory from "./components/Pages/Inventory";
import Transactions from "./components/Pages/Transactions";
import Members from "./components/Pages/Members";
import Financials from "./components/Pages/Financials";

function App() {
  
  return (
    <>
      <div className="flex max-h-[1300px] overflow-y-hidden gap-2 ">
        <Sidebar />
        <div className="w-full h-full">
          <Header />
          <Routes>
            <Route path="/" element={<CheckoutBar />} />
            <Route path="/Inventory" element={<Inventory />} />
            <Route path="/Transactions" element={<Transactions />} />
            <Route path="/Members" element={<Members />} />
            <Route path="/financials" element={<Financials />} />
            <Route path="/signIn" element={<SignIn />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
