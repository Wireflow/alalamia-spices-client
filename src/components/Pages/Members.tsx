import MembersTable from "../MembersTable";
import SearchMembers from "../SearchMembers";
import NewMemberDialog from "../dialogs/NewMemberDialog";

const Members = () => {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-medium px-5">Manage Members</h2>
      <div className="flex justify-between items-center px-5 w-full mt-4">
        <SearchMembers />
        <NewMemberDialog />
      </div>
      <div className="rounded-xl border mt-4 mx-5">
        <MembersTable />
      </div>
    </div>
  );
};

export default Members;
