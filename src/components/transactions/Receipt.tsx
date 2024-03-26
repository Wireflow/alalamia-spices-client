import { useCart } from "@/State/store";
import useGetTransaction from "@/hooks/useGetTransaction";
import { currencyFormatter, formatDateToString } from "@/lib/utils";
import { ForwardedRef } from "react";
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
  transactionId: string;
}

const ReceiptToPrint = ({
  forwardedRef,
  transactionId,
}: ReceiptToPrintProps) => {
  const { cart, getTotal, selectedPaymentMethod, member } = useCart();
  const { data: transaction } = useGetTransaction({ id: transactionId });

  const transactionData = transaction
    ? transaction
    : { purchasedProducts: cart };

  const isTransactionNotEmpty = Boolean(transaction);

  return (
    <div ref={forwardedRef} className="p-5">
      {/* Logo */}
      <div className="flex justify-center items-center">
        <img src={Logo} alt="seasoning" className="2xl:h-[100px] h-[100px]" />
      </div>
      {/* Address */}
      <p>Address: {member?.address}</p>
      {/* Phone */}
      <p>Phone: {member?.phoneNumber}</p>
      {/* Invoice No */}
      {isTransactionNotEmpty && <p>Invoice#: INV-{transaction?.orderNumber}</p>}
      {/* Transaction Date */}
      {isTransactionNotEmpty && (
        <p>{formatDateToString(transaction?.createdAt || new Date())}</p>
      )}
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

        {transactionData.purchasedProducts.map((item) => (
          <TableBody key={item.productId}>
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
      <div className="p-5">
        <p>{selectedPaymentMethod}</p>
      </div>
    </div>
  );
};

export default ReceiptToPrint;
