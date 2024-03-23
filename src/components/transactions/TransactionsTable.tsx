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
import useGetTransactions from "@/hooks/useGetTransactions";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { useState } from "react";
import ViewTransaction from "./ViewTransaction";
import { Button } from "../ui/button";

const TransactionsTable = () => {
  const { data } = useGetTransactions();
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const handleTransactionClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
  };

  return (
    <div>
      <Table className="m-4">
        <TableCaption>A list of your recent Transactions.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-start">Invoice</TableHead>
            <TableHead className="text-center">Amount</TableHead>
            <TableHead className="text-center">Method</TableHead>
            <TableHead className="text-center">Date</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((transaction: Transaction) => (
            <TableRow key={transaction.id}>
              <TableCell className="text-start h-12">
                {transaction.orderNumber}
              </TableCell>
              <TableCell className="text-center">
                {transaction.totalAmount}
              </TableCell>
              <TableCell className="text-center">
                {transaction.paymentMethod}
              </TableCell>
              <TableCell className="text-center">
                {new Date(transaction.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-center">
                <Dialog>
                  <DialogTrigger>
                    {" "}
                    <Button onClick={() => handleTransactionClick(transaction)}>
                      View
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    {selectedTransaction && (
                      <ViewTransaction transaction={selectedTransaction} />
                    )}
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionsTable;
