import { useCart } from "@/State/store";
import { currencyFormatter, formatDateToString } from "@/lib/utils";
import { PurchasedProduct, Transaction } from "@prisma/client";
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
  data: Transaction & { purchasedProducts: PurchasedProduct[] };
}

const ReceiptToPrint = ({ forwardedRef, data }: ReceiptToPrintProps) => {
  const { cart, getTotal, selectedPaymentMethod, member } = useCart();

  const transactionData = data ? data : { purchasedProducts: cart };

  const isTransactionNotEmpty = Boolean(data);

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
      {isTransactionNotEmpty && <p>Invoice#: INV-{data?.orderNumber}</p>}
      {/* Transaction Date */}
      {isTransactionNotEmpty && (
        <p>{formatDateToString(data?.createdAt || new Date())}</p>
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
