import useGetTransactions from "@/hooks/useGetTransactions";
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
import { Transaction } from "@prisma/client";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";

const Transactions = () => {
  const { data } = useGetTransactions();
  if (!data) return <div>No Data</div>;

  console.log(data);
  return (
    <div className=" w-full">
      <div className="p-4">
        <div className="bg-white  rounded-xl p-3 border border-gray-400 ">
          <h2 className="text-3xl font-medium my-5">Transactions</h2>
          <Table className="m-4 ">
            <TableCaption>A list of your recent Transactions.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-start ">Invoice</TableHead>
                <TableHead className="text-center">Amount</TableHead>
                <TableHead className="text-center">Method</TableHead>
                <TableHead className="text-center">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((transaction: Transaction) => {
                return (
                  <>
                    <TableRow key={transaction.id}>
                      <TableCell className="text-start">
                        {transaction.orderNumber}
                      </TableCell>
                      <TableCell className="text-center">
                        {transaction.totalAmount}
                      </TableCell>{" "}
                      <TableCell className="text-center">
                        {transaction.paymentMethod}
                      </TableCell>
                      <TableCell className="text-center">
                        {transaction.createdAt}
                      </TableCell>
                      <Dialog>
                        <DialogTrigger>
                          <Button className="text-center">View</Button>
                        </DialogTrigger>
                        <DialogContent>

                        </DialogContent>
                      </Dialog>
                    </TableRow>
                  </>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
