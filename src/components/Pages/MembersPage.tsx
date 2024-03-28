import MembersDataTable from "../members/MembersDataTable";

const Members = () => {
  return (
    <div className="w-full mt-4">
      <h2 className="text-2xl font-medium px-5">Manage Members</h2>
      <div className="mt-2 mx-5">
        <MembersDataTable />
      </div>
    </div>
  );
};

export default Members;
