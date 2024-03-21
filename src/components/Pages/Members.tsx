import {  Plus } from "lucide-react";
import Header from "../Header";
import MembersTable from "../MembersTable";

const Members = () => {
  return (
    <div className="w-full ">
      <div className="flex flex-col gap-5">
        <Header />
        <h2 className="text-2xl font-medium px-5">Manage Members</h2>
        <div className="flex justify-between items-center px-5">
          <div className="flex  items-center gap-2 bg-[#896a3c] text-white py-2 px-3 rounded-full">
            Add New Member <Plus />
          </div>
          <input
            placeholder="Search Members"
            className="rounded-full px-5 py-2 border-2 border-yellow-950 shadow-2xl"
          />
        </div>
      </div>
      <div className="py-1 px-2 m-5 border rounded h-[750px] border-black flex flex-col gap-5 overflow-y-scroll">
        <MembersTable />
      </div>
    </div>
  );
};

export default Members;
