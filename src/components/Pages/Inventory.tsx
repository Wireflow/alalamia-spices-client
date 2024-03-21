import { Pencil, Plus } from "lucide-react";
import Header from "../Header";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../services/axiosInstance";
import { useEffect } from "react";

const Inventory = () => {
  useEffect(() => {
    async function getInventory() {
      return await api.get("/products");
    }
    getInventory();
  }, []);

  return (
    <div className="w-full ">
      <div className="flex flex-col gap-5">
        <Header />
        <h2 className="text-2xl font-medium px-5">Manage Inventory</h2>
        <div className="flex justify-between items-center px-5">
          <div className="flex  items-center gap-2 bg-[#896a3c] text-white py-2 px-3 rounded-full">
            {" "}
            Add New Item <Plus />
          </div>
          <input
            placeholder="Search Inventory"
            className="rounded-full px-5 py-2 border-2 border-yellow-950 shadow-2xl"
          />
        </div>
      </div>
      <div className="py-1 m-5 border rounded h-[750px] border-black flex flex-col gap-5 overflow-y-scroll">
        <div className="flex items-center justify-between p-4 border-b bg-white ">
          <p className="text-lg font-medium">Product Name</p>
          <p className="text-lg font-medium">Boxes</p>
          <p className="text-lg font-medium">Quantity</p>
          <p className="text-lg font-medium">Grams</p>
          <p className="text-lg font-medium">Supplier</p>
          <p className="text-lg font-medium pr-5">Edit</p>
        </div>
        <div>
          <div className="flex items-center justify-between p-4 border-b bg-white ">
            <p className="text-sm font-normal">Product Name</p>
            <p className="text-sm font-normal">Boxes</p>
            <p className="text-sm font-normal">Quantity</p>
            <p className="text-sm font-normal">Grams</p>
            <p className="text-sm font-normal">Supplier</p>
            <p className="text-sm font-normal pr-5">
              <Pencil size={20} />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
