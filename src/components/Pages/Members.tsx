import { Pencil, Plus } from "lucide-react"
import Header from "../Header"




const Members = () => {
  return (
    <div className="w-full ">
    <div className="flex flex-col gap-5">
      <Header />
      <h2 className="text-2xl font-medium px-5">Manage Members</h2>
      <div className="flex justify-between items-center px-5">
        <div className="flex  items-center gap-2 bg-[#896a3c] text-white py-2 px-3 rounded-full">
          {" "}
          Add New Member <Plus />
        </div>
        <input
          placeholder="Search Members"
          className="rounded-full px-5 py-2 border-2 border-yellow-950 shadow-2xl"
        />
      </div>
    </div>
    <div className="py-1 m-5 border rounded h-[750px] border-black flex flex-col gap-5 overflow-y-scroll">
      <div className="flex items-center justify-between p-4 border-b bg-white ">
        <p className="text-lg font-medium">Member Name</p>
        <p className="text-lg font-medium">Address</p>
        <p className="text-lg font-medium">Phone #</p>
        <p className="text-lg font-medium">Balance</p>
        <p className="text-lg font-medium">Invoices</p>
        <p className="text-lg font-medium pr-5">Edit</p>
      </div>
      <div>
        <div className="flex items-center justify-between p-4 border-b bg-white ">
          <p className="text-sm font-normal">Mustafa</p>
          <p className="text-sm font-normal">4700b white plains road,<br/>Bronx NY 10470</p>
          <p className="text-sm font-normal">3476159904</p>
          <p className="text-sm font-normal">$600</p>
          <p className="text-sm font-normal">View</p>
          <p className="text-sm font-normal pr-5">
            <Pencil size={20} />
          </p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Members