import { useCart } from "@/State/store";
import {
  currencyFormatter,
  dateFormatter,
  formatDateToString,
} from "@/lib/utils";
import { ForwardedRef, forwardRef, useRef } from "react";
import Logo from "../../assets/Logo.png";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Transaction } from "@prisma/client";

interface ReceiptToPrintProps {
  forwardedRef: ForwardedRef<HTMLDivElement>;
  data: Transaction;
}

const ReceiptToPrint = ({ forwardedRef, data }: ReceiptToPrintProps) => {
  const { cart, getTotal, selectedPaymentMethod, member } = useCart();

  return (
    <div ref={forwardedRef} className="p-5">
      {/* Logo */}
      <div className="flex justify-center items-center">
        <img src={Logo} alt="seasoning" className="2xl:h-[100px] h-[100px]" />
      </div>
      {/* Member Name */}
      <p>Member Name: {member?.name}</p>
      {/* Address */}
      <p>Member Address: {member?.address}</p>
      {/* Phone */}
      <p>Member Phone: {member?.phoneNumber}</p>
      {/* Invoice No */}
      <p>Invoice#: {data?.orderNumber}</p>
      {/* Transaction Date */}
      <p>Date: {formatDateToString(data?.createdAt)}</p>
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

        {cart.map((item) => (
          <TableBody key={item.productId}>
            <TableRow>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.purchaseQuantity}</TableCell>
              <TableCell className="text-right">
                {currencyFormatter(item.price)}
              </TableCell>
              <TableCell className="text-right">
                {currencyFormatter(item.price * item.purchaseQuantity)}
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
      <div className="p-5">
        <p>{selectedPaymentMethod}</p>
      </div>
    </div>
  );
};

export const FunctionalComponentToPrint = forwardRef<HTMLDivElement>(
  (_, ref) => <ReceiptToPrint  forwardedRef={ref} />
);

export default ReceiptToPrint;
