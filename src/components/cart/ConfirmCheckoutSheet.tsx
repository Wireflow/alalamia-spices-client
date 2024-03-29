import { useCart } from "@/State/store";
import { useGetProducts } from "@/hooks/useGetProducts";
import useGetTransaction from "@/hooks/useGetTransaction";
import { handlePrint } from "@/lib/print";
import { currencyFormatter } from "@/lib/utils";
import { TransactionSchema, TransactionType } from "@/types/transaction";
import submitNewTransaction from "@/use-cases/submitNewTransaction";
import { zodResolver } from "@hookform/resolvers/zod";
import { Transaction } from "@prisma/client";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { Check, Loader2, ReceiptTextIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import ReactToPrint from "react-to-print";
import ReceiptToPrint from "../transactions/Receipt";
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

const ConfirmCheckoutSheet = () => {
  const [transactionData, setTransactionData] = useState<Transaction | null>(
    null
  );
  const { data: transaction } = useGetTransaction({
    id: transactionData?.id ? transactionData?.id : "",
  });
  const {
    cart,
    getTotal,
    selectedPaymentMethod,
    getTotalQuantity,
    memberId,
    resetCart,
    setIsCheckingOut,
  } = useCart();

  const { refetch } = useGetProducts();

  const queryClient = new QueryClient();
  const componentRef = useRef(null);

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: submitNewTransaction,
    onSuccess: (data) => {
      form.reset();
      data?.id && setTransactionData(data);
      data?.id && queryClient.setQueryData([data.id], data);
      refetch();
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
        <>
          <Button
            type="submit"
            className="w-full h-14 text-lg "
            disabled={isPending}
          >
            <Loader2 className="animate-spin w-6 h-6" />{" "}
          </Button>
        </>
      );
    return (
      !isSuccess && (
        <>
          <Button
            type="submit"
            className="w-full h-14 text-lg"
            disabled={isPending}
            onClick={() => setIsCheckingOut(true)}
          >
            Confirm Checkout ({currencyFormatter(getTotal())})
            <Check className="ml-2" />
          </Button>
          <Button
            className="h-14 text-lg w-full mt-3"
            onClick={() => setIsCheckingOut(false)}
          >
            Go Back
          </Button>
        </>
      )
    );
  };
  return (
    <div className="shadow-2xl flex flex-col  border-black shadow-black w-[600px] ">
      {isSuccess ? (
        <div className="p-5">
          <ReactToPrint
            trigger={() => (
              <Button
                type="button"
                className="w-full h-14 text-lg bg-green-700 "
                disabled={isPending}
              >
                Print Reciept
                <ReceiptTextIcon className="ml-2" />
              </Button>
            )}
            content={reactToPrintContent}
            pageStyle={pageStyle}
            print={handlePrint}
            documentTitle="Testing"
          />
          <Button
            className="h-14 text-lg w-full mt-2"
            onClick={() => {
              setIsCheckingOut(false);
              resetCart();
            }}
          >
            Done
          </Button>
        </div>
      ) : null}

      {/* <ReceiptToPrint /> */}
      <ReceiptToPrint forwardedRef={componentRef} data={transaction} />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" flex flex-col p-5  "
        >
          <div>
            {selectedPaymentMethod == "CHECK" && !isSuccess && (
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
            {/* <div className="flex items-center justify-between my-4">
              <p className="text-lg font-semibold">Final Total</p>
              <p className="text-lg font-semibold">
                {currencyFormatter(getTotal())}
              </p>
            </div> */}
            <div className="mt-5">{renderConfirmButton()}</div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ConfirmCheckoutSheet;
