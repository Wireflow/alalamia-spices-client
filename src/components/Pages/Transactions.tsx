import Header from "../Header";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const Transactions = () => {
  return (
    <div className=" w-full">
      <div className="p-4">
        <div className="bg-white  rounded-xl p-3 border border-gray-400 ">
          <h2 className="text-3xl font-medium my-5">Transactions</h2>
          <Table className="m-4">
            <TableCaption>A list of your recent Transactions.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-start w-40">Invoice</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Method</TableHead>
                <TableHead className="text-center">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="text-start">INV001</TableCell>
                <TableCell className="text-center">Paid</TableCell>
                <TableCell className="text-center">Check</TableCell>
                <TableCell className="text-center">$250.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-start">INV001</TableCell>
                <TableCell className="text-center">Paid</TableCell>
                <TableCell className="text-center">Check</TableCell>
                <TableCell className="text-center">$250.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-start">INV001</TableCell>
                <TableCell className="text-center">Paid</TableCell>
                <TableCell className="text-center">Check</TableCell>
                <TableCell className="text-center">$250.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-start">INV001</TableCell>
                <TableCell className="text-center">Paid</TableCell>
                <TableCell className="text-center">Check</TableCell>
                <TableCell className="text-center">$250.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-start">INV001</TableCell>
                <TableCell className="text-center">Paid</TableCell>
                <TableCell className="text-center">Check</TableCell>
                <TableCell className="text-center">$250.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-start">INV001</TableCell>
                <TableCell className="text-center">Paid</TableCell>
                <TableCell className="text-center">Check</TableCell>
                <TableCell className="text-center">$250.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-start">INV001</TableCell>
                <TableCell className="text-center">Paid</TableCell>
                <TableCell className="text-center">Check</TableCell>
                <TableCell className="text-center">$250.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-start">INV001</TableCell>
                <TableCell className="text-center">Paid</TableCell>
                <TableCell className="text-center">Check</TableCell>
                <TableCell className="text-center">$250.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-start">INV001</TableCell>
                <TableCell className="text-center">Paid</TableCell>
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

export default Transactions;
