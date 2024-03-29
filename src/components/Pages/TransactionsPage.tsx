import TransactionTable from "../transactions/TransactionTable";

const Transactions = () => {
  return (
    <div className=" w-full  mt-4">
      <h2 className="text-2xl font-medium px-5">Transactions</h2>
      <div className="mt-2 mx-5">
        <TransactionTable />
      </div>
    </div>
  );
};

export default Transactions;
