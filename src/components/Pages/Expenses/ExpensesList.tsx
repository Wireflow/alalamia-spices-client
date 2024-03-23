
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

import { ExpenseType } from "@/types/expense";

const Expenses = () => {

    
    var tableBody = (<> no expenses yet</>);
    fetch('api/expenses')
        .then(response => response.json()) // Assuming the API response is in JSON format
        .then(data => {
            // Assuming the API response data is an array of expenses
            // Dynamically build the table body
            tableBody = data.map((row: ExpenseType, index: number) => (
                <TableRow key={index}>
                    <TableCell className="text-center">{row.id}</TableCell>
                    <TableCell className="text-center">{row.name}</TableCell>
                    <TableCell className="text-center">{row.amount}</TableCell>
                </TableRow>
            ));
        })
        .catch(error => {
            console.error('Error:', error);
        });
    return (
        <div className=" w-full h-full">
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
                                {/* <TableHead className="text-center">Date</TableHead> */}
                                <TableHead className="text-center">Name</TableHead>
                                <TableHead className="text-center">Amount</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>{tableBody}</TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default Expenses;
