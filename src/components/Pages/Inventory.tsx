import InventoryTable from "../inventory/InventoryTable";

const Inventory = () => {
  return (
    <div className="w-full  mt-4">
      <h2 className="text-2xl font-medium px-5">Manage Inventory</h2>
      <div className="mt-2 mx-5 ">
        <InventoryTable />
      </div>
    </div>
  );
};

export default Inventory;
