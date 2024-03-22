import { Pencil, Plus } from "lucide-react";
import Header from "../Header";
import { Product } from "@prisma/client";
import { useGetInventory } from "@/hooks/useGetInventory";

const Inventory = () => {
  const { data } = useGetInventory();
  if (!data) return <div>No Data</div>;

  const inventory = data;
  return (
    <div className="w-full ">
      <div className="flex flex-col gap-5">
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
      <div className="py-1 m-5 border rounded h-[750px]  border-black flex flex-col gap-5 ">
        <div className="grid grid-cols-8 gap-10 p-4 border-b bg-white ">
          <p className="text-sm font-medium">Product Name</p>
          <p className="text-sm font-medium">Boxes</p>
          <p className="text-sm font-medium">Boxes</p>
          <p className="text-sm font-medium">Quantity</p>
          <p className="text-sm font-medium">Grams</p>
          <p className="text-sm font-medium">SKU</p>
          <p className="text-sm font-medium">Supplier</p>
          <div className="">
            <p className="text-sm font-medium pr-5 ">Edit</p>
          </div>
        </div>
        <div className="overflow-y-scroll">
          {inventory.map((product: Product) => {
            return (
              <>
                <div key={product.id}>
                  <div className="grid grid-cols-8 gap-10 p-4 border-b bg-white ">
                    <p className="text-sm font-normal ">{product.name}</p>
                    <p className="text-sm font-normal">{product.price}</p>
                    <p className="text-sm font-normal">{product.boxQuantity}</p>
                    <p className="text-sm font-normal">{product.quantity}</p>
                    <p className="text-sm font-normal">{product.grams}</p>
                    <p className="text-sm font-normal">{product.sku}</p>
                    <p className="text-sm font-normal">{product.supplierId}</p>
                    <p className="text-sm font-normal pr-5">
                      <Pencil size={18} />
                    </p>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Inventory;
