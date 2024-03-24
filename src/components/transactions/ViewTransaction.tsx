import { useViewTransaction } from "@/hooks/useViewTransaction";
import { Button } from "../ui/button";

type transactionProp = {
  transactionId: string;
};

const ViewTransaction = ({ transactionId }: transactionProp) => {
  const { data: transaction } = useViewTransaction({ id: transactionId });

  console.log("data:", transaction?.createdAt.toLocaleDateString());

  return (
    <div>
      <h1 className="text-2xl font-medium">
        Invoice #{transaction?.orderNumber}
      </h1>
      {/* <p>Transaction? date: {transaction?.createdAt.toLocaleDateString()}</p> */}
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
