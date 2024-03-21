import { Member } from "@prisma/client";
import { Table, TableHeader, TableRow } from "./ui/table";

const MembersTable = () => {
  const headers = ["Name", "Address", "Phone Number", "Balance"];
  const data: Member[] = [
    {
      id: "cltz5uanj000012tyfi3qbi9c",
      name: "1234 Deli Grocery",
      address: "123 Street Ave",
      city: "Bronx",
      state: "New York",
      zipCode: "123456",
      phoneNumber: "9188182182",
      owedBalance: 123.49,
    },
  ];

  return (
    <Table>
      <TableHeader>
        {headers.map((header, index) => (
          <TableRow></TableRow>
        ))}
      </TableHeader>
    </Table>
  );
};

export default MembersTable;
