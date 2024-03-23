import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Transaction } from "@prisma/client";
import { useViewTransaction } from "@/hooks/useViewTransaction";

type transactionProp = {
  transaction: Transaction;
};

const ViewTransaction = ({ transaction }: transactionProp) => {
  const { data } = useViewTransaction(transaction);

  console.log("data:", data);

  return (
    <div>
      <h1 className="text-2xl font-medium">
        Order #: {transaction.orderNumber}
      </h1>{" "}
      <p>
        Transaction date: {new Date(transaction.createdAt).toLocaleDateString()}
      </p>
      <div className="h-[300px] border-t border-b my-3 "></div>
      <div className="flex justify-between">
        <div>
          {" "}
          <p className="font-semibold">
            Payment method: {transaction.paymentMethod}
          </p>
          <p className="font-semibold ">Order total: ${transaction.totalAmount}</p>
        </div>
        <Button>View Member</Button>
      </div>
      {transaction?.checkAmount === null ? null : (
        <p className="text-sm text-gray-600">
          Check amount: ${transaction.checkAmount}
        </p>
      )}
      {transaction?.checkNumber === null ? null : (
        <p className="text-sm text-gray-600">
          Check number: {transaction.checkNumber}
        </p>
      )}
    </div>
  );
};

export default ViewTransaction;
