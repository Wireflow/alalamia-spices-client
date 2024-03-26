import { useCart } from "@/State/store";
import { currencyFormatter, formatDateToString } from "@/lib/utils";
import { PurchasedProduct, Transaction } from "@prisma/client";
import { ForwardedRef } from "react";
import Logo from "../../assets/signInLogo.png";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface ReceiptToPrintProps {
  forwardedRef: ForwardedRef<HTMLDivElement>;
  data: Transaction & { purchasedProducts: PurchasedProduct[] };
}

const ReceiptToPrint = ({ forwardedRef, data }: ReceiptToPrintProps) => {
  const { cart, getTotal, selectedPaymentMethod, member } = useCart();

  const transactionData = data ? data : { purchasedProducts: cart };

  const isTransactionNotEmpty = Boolean(data);

  const CheckAmount = data?.checkAmount;

  return (
    <div
      ref={forwardedRef}
      className="p-5 flex flex-col gap-2 h-[500px] "
    >
      {/* Logo */}
      <div className="flex justify-center items-center">
        <img src={Logo} alt="seasoning" className=" h-[100px]" />
      </div>{" "}
      <div>
        {/* Member Name */}
        <p className="font-semibold">Member Name: {member?.name}</p>
        {/* Address */}
        <p className="font-semibold">Address: {member?.address}</p>
        {/* Phone */}
        <p className="font-semibold">Phone: {member?.phoneNumber}</p>
        {/* Invoice No */}
        {isTransactionNotEmpty && (
          <p className="font-semibold">Invoice #: INV-{data?.orderNumber}</p>
        )}
        {/* Transaction Date */}
        {isTransactionNotEmpty && (
          <p className="font-semibold">
            Invoice Date: {formatDateToString(data?.createdAt || new Date())}
          </p>
        )}
      </div>
      {/* Items */}
      {/* Product Name | Price | Qty | Qty Price */}
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead>Item</TableHead>
            <TableHead>Qty</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Qty Price</TableHead>
          </TableRow>
        </TableHeader>

        {transactionData.purchasedProducts.map((item) => (
          <TableBody key={item.productId} className=" ">
            <TableRow>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.purchaseQuantity}</TableCell>
              <TableCell className="text-right">
                {currencyFormatter(item.price)}
              </TableCell>
              <TableCell className="text-right">
                {currencyFormatter(
                  item.price *
                    (item.purchaseQuantity ? item.purchaseQuantity : 1)
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        ))}
        {/* Total */}
        <TableFooter>
          <TableRow>
            <TableHead colSpan={3}>Total:</TableHead>
            <TableHead className="text-right text-bold">
              {currencyFormatter(getTotal())}
            </TableHead>
          </TableRow>
        </TableFooter>
      </Table>
      {/* Payment Method */}
      <div className="">
        <p className="font-semibold">Payment Method: {selectedPaymentMethod}</p>
        {isTransactionNotEmpty && (
          <p className="font-semibold">Check Number: {data?.checkNumber}</p>
        )}
        {isTransactionNotEmpty && (
          <p className="font-semibold">
            Check Amount: {currencyFormatter(CheckAmount)}
          </p>
        )}
      </div>
    </div>
  );
};

export default ReceiptToPrint;
