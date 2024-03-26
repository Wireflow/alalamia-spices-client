import { useCart } from "@/State/store";
import { currencyFormatter } from "@/lib/utils";
import { TransactionSchema, TransactionType } from "@/types/transaction";
import submitNewTransaction from "@/use-cases/submitNewTransaction";
import { zodResolver } from "@hookform/resolvers/zod";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { Check, Loader2, ReceiptTextIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import ConfirmCheckoutItemCard from "./ConfirmCheckoutItemCard";

import { Transaction } from "@prisma/client";
import ReactToPrint from "react-to-print";
import ReceiptToPrint from "../transactions/Receipt";

const ConfirmCheckoutSheet = () => {
  const [transactionData, setTransactionData] = useState<Transaction | null>(
    null
  );
  const {
    cart,
    getTotal,
    selectedPaymentMethod,
    getTotalQuantity,
    memberId,
    resetCart,
  } = useCart();
  const isCartEmpty = cart.length > 0;

  const queryClient = new QueryClient();
  const componentRef = useRef(null);

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: submitNewTransaction,
    onSuccess: (data) => {
      resetCart();
      form.reset();
      data?.id && setTransactionData(data);
      data?.id && queryClient.setQueryData([data.id], data);
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });

  const form = useForm<TransactionType>({
    resolver: zodResolver(TransactionSchema),
    defaultValues: {
      totalAmount: Number(getTotal().toFixed(2)),
      paymentMethod: selectedPaymentMethod,
      checkAmount: undefined,
      checkNumber: undefined,
      totalQuantityPurchased: getTotalQuantity(),
      memberId: memberId,
      purchasedProducts: [],
    },
  });

  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  // });

  const onSubmit = (data: TransactionType) => {
    if (
      selectedPaymentMethod === "CHECK" &&
      !form.getValues("checkNumber") &&
      !form.getValues("checkAmount")
    ) {
      form.setError("checkAmount", { message: "Please include check amount" });
      return form.setError("checkNumber", {
        message: "Please include check number",
      });
    }

    mutate(data);
    setTransactionData(null);
    // handlePrint();
  };

  const reactToPrintContent = React.useCallback(() => {
    return componentRef.current;
  }, [componentRef]);
  useEffect(() => {
    form.setValue("purchasedProducts", [...cart]);
  }, [cart, form]);
  
  const pageStyle = `@page {
    size: 85mm 50mm;
    }
    @media print {
        @page {   size: a5 ;
          margin: 0mm !important;
      }
    @media all {
                    .pagebreak {
                      overflow: visible; 
                    }
                }
            }
        }`;

  const renderConfirmButton = () => {
    if (form.formState.isSubmitting)
      return (
        <Button
          type="submit"
          className="w-full h-14 text-lg"
          disabled={isPending}
        >
          <Loader2 className="animate-spin w-6 h-6" />{" "}
        </Button>
      );
    if (isSuccess)
      return (
        <ReactToPrint
          trigger={() => (
            <Button
              type="submit"
              className="w-full h-14 text-lg bg-green-700 "
              disabled={isPending}
            >
              Print Reciept
              <ReceiptTextIcon className="ml-2" />
            </Button>
          )}
          content={reactToPrintContent}
          removeAfterPrint
          pageStyle={pageStyle}
        />
      );
    return (
      <Button
        type="submit"
        className="w-full h-14 text-lg"
        disabled={isPending}
      >
        Confirm Checkout ({currencyFormatter(getTotal())})
        <Check className="ml-2" />
      </Button>
    );
  };
  return (
    <Sheet>
      <SheetTrigger className="p-2 w-full" disabled={!isCartEmpty}>
        <Button
          disabled={!isCartEmpty}
          size={"lg"}
          className="flex-1 w-full h-14 text-xl "
        >
          Checkout ({cart.length})
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[500px] h-full">
        {/* <ReceiptToPrint /> */}
        <ReceiptToPrint
          forwardedRef={componentRef}
          transactionId={transactionData && transactionData?.id}
        <ReceiptToPrint forwardedRef={componentRef} data={transaction} />

        <ReactToPrint
          trigger={() => <Button>Print</Button>}
          content={reactToPrintContent}
          removeAfterPrint
          pageStyle={pageStyle}
        />

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="h-full flex flex-col "
          >
            <div className="grid gap-4 py-4">
              <div className="mt-4">
                <p className="text-lg font-bold">Confirm Products</p>
                <div className="grid gap-8 mt-4">
                  {cart.map((product) => (
                    <ConfirmCheckoutItemCard
                      key={product.productId}
                      product={product}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div>
              {/* {JSON.stringify(transaction)} */}
              {selectedPaymentMethod == "CHECK" && (
                <div className="flex flex-col gap-2">
                  <div>
                    <FormField
                      control={form.control}
                      name="checkNumber"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Check Number</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="number"
                              onChange={(e) =>
                                field.onChange(parseFloat(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="checkAmount"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Check Amount</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="number"
                              onChange={(e) =>
                                field.onChange(parseFloat(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}
              <div className="flex items-center justify-between mt-4">
                <p className="text-lg font-semibold">Final Total</p>
                <p className="text-lg font-semibold">
                  {currencyFormatter(getTotal())}
                </p>
              </div>
              <div>{renderConfirmButton()}</div>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default ConfirmCheckoutSheet;
