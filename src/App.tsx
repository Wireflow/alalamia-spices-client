import { Route, Routes } from "react-router-dom";
import "./App.css";
import CheckoutBar from "./components/CheckoutBar";
import Sidebar from "./components/Sidebar";
import Inventory from "./components/Pages/Inventory";
import Transactions from "./components/Pages/Transactions";
import Members from "./components/Pages/Members";
import Financials from "./components/Pages/Financials";
import CheckOutPage from "./components/Pages/CheckOutPage";

function App() {
  return (
    <>
      <div className="flex  gap-2 "> 
       <Sidebar />
        <Routes>
          <Route path="/" element={<CheckoutBar/>}/>
          <Route path="/Inventory" element={<Inventory/>}/>
          <Route path="/Transactions" element={<Transactions/>}/>
          <Route path="/Members" element={<Members/>}/>
          <Route path="/financials" element={<Financials/>}/>
          <Route path="/checkOutPage" element={<CheckOutPage/>}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
