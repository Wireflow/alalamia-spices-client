import { useCart } from "@/State/store";
import { currencyFormatter } from "@/lib/utils";
import { ForwardedRef, forwardRef } from "react";
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

interface ReceiptToPrintProps {
  forwardedRef: ForwardedRef<HTMLDivElement>;
}

const ReceiptToPrint = ({ forwardedRef }: ReceiptToPrintProps) => {
  const { cart, getTotal, selectedPaymentMethod, member } = useCart();
  return (
    <div ref={forwardedRef}>
      {/* Logo */}
      <div className="flex justify-center items-center">
        <img src={Logo} alt="seasoning" className="2xl:h-[100px] h-[100px]" />
      </div>
      {/* Address */}
      <p>Address: {member?.address}</p>
      {/* Phone */}
      <p>Phone: {member?.phoneNumber}</p>
      {/* Invoice No */}
      <p>Invoice#: INV902</p>
      {/* Transaction Date */}
      <p>Date: 2024-10-09</p>
      {/* Member Name */}
      <p>{member?.name}</p>
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
      <p>{selectedPaymentMethod}</p>
    </div>
  );
};

export const FunctionalComponentToPrint = forwardRef<HTMLDivElement>(
  (_, ref) => <ReceiptToPrint forwardedRef={ref} />
);

export default ReceiptToPrint;
