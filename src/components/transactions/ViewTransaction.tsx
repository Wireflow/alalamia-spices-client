import { useViewTransaction } from "@/hooks/useViewTransaction";
import { Button } from "../ui/button";

type transactionProp = {
  transactionId: string;
};

const ViewTransaction = ({ transactionId }: transactionProp) => {
  const { data: transaction } = useViewTransaction({ id: transactionId });

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };

  if (!transaction) return <p>Unable to obtain transaction info</p>;

  const createdAtDate = new Date(transaction?.createdAt);

  return (
    <div>
      <h1 className="text-2xl font-medium">
        Invoice #{transaction?.orderNumber}
      </h1>
      <p>Completed on {createdAtDate.toLocaleString("en-US", options)}</p>
      <div className="flex justify-between">
        <div>
          <p className="font-semibold">
            Payment method: {transaction?.paymentMethod}
          </p>
          <p className="font-semibold ">
            Order total: ${transaction?.totalAmount}
          </p>
        </div>
        <Button>View Member</Button>
      </div>
      {transaction?.checkAmount === null ? null : (
        <p className="text-sm text-gray-600">
          Check amount: ${transaction?.checkAmount}
        </p>
      )}
      {transaction?.checkNumber === null ? null : (
        <p className="text-sm text-gray-600">
          Check number: {transaction?.checkNumber}
        </p>
      )}
    </div>
  );
};

export default ViewTransaction;
