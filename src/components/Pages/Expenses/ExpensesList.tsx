
import { Link } from "react-router-dom";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../ui/table";
import { Button } from "@/components/ui/button";
import SearchBox from "./SearchBox";
import AddExpenseDialog from "@/components/dialogs/AddExpenseDialog";

const Expenses = () => {

    const tableBody = document.querySelector('TableBody'); // Get the table body element

fetch('api/expenses')
  .then(response => response.json()) // Assuming the API response is in JSON format
  .then(data => {
    // Assuming the API response data is an array of expenses
    data.forEach((expense: { id: string | null; date: string | null; name: string | null; amount: any; }) => {
      const newRow = document.createElement('TableRow'); // Create a new table row for each expense

      // Create and populate the table cells with expense data
      const idCell = document.createElement('TableCell');
      idCell.textContent = expense.id;
      newRow.appendChild(idCell);

      const dateCell = document.createElement('TableCell');
      dateCell.textContent = expense.date;
      newRow.appendChild(dateCell);

      const nameCell = document.createElement('TableCell');
      nameCell.textContent = expense.name;
      newRow.appendChild(nameCell);

      const amountCell = document.createElement('TableCell');
      amountCell.textContent = `$${expense.amount}`;
      newRow.appendChild(amountCell);

      tableBody?.appendChild(newRow); // Append the new row to the table body
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });
    return (
        <div className=" w-full">
            <div className="p-4">
                <div className="bg-white  rounded-xl p-3 border border-gray-400 ">
                    <Link to="/financials">
                        <Button>Back</Button>
                    </Link>
                    <h2 className="text-3xl font-medium my-5">Expenses</h2>
                    <div className="flex justify-between items-center px-5">
                        <SearchBox />
                        <AddExpenseDialog />
                    </div>
                    <Table className="m-4">
                        <TableCaption> Expenses List</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-start w-40">Id</TableHead>
                                {/* <TableHead className="text-start w-40">Id</TableHead> */}
                                <TableHead className="text-center">Date</TableHead>
                                <TableHead className="text-center">Name</TableHead>
                                <TableHead className="text-center">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="text-start">EXP001</TableCell>
                                <TableCell className="text-center">2024-31-03</TableCell>
                                <TableCell className="text-center">Check</TableCell>
                                <TableCell className="text-center">$250.00</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-start">EXP001</TableCell>
                                <TableCell className="text-center">2024-31-03</TableCell>
                                <TableCell className="text-center">Check</TableCell>
                                <TableCell className="text-center">$250.00</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-start">EXP001</TableCell>
                                <TableCell className="text-center">2024-31-03</TableCell>
                                <TableCell className="text-center">Check</TableCell>
                                <TableCell className="text-center">$250.00</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-start">EXP001</TableCell>
                                <TableCell className="text-center">2024-31-03</TableCell>
                                <TableCell className="text-center">Check</TableCell>
                                <TableCell className="text-center">$250.00</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-start">EXP001</TableCell>
                                <TableCell className="text-center">2024-31-03</TableCell>
                                <TableCell className="text-center">Check</TableCell>
                                <TableCell className="text-center">$250.00</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-start">EXP001</TableCell>
                                <TableCell className="text-center">2024-31-03</TableCell>
                                <TableCell className="text-center">Check</TableCell>
                                <TableCell className="text-center">$250.00</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-start">EXP001</TableCell>
                                <TableCell className="text-center">2024-31-03</TableCell>
                                <TableCell className="text-center">Check</TableCell>
                                <TableCell className="text-center">$250.00</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-start">EXP001</TableCell>
                                <TableCell className="text-center">2024-31-03</TableCell>
                                <TableCell className="text-center">Check</TableCell>
                                <TableCell className="text-center">$250.00</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-start">EXP001</TableCell>
                                <TableCell className="text-center">2024-31-03</TableCell>
                                <TableCell className="text-center">Check</TableCell>
                                <TableCell className="text-center">$250.00</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default Expenses;
