import { useCart } from "@/State/store";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "../ui/sheet";
import ConfirmCheckoutItemCard from "./ConfirmCheckoutItemCard";
import { Check, Loader2 } from "lucide-react";
import { currencyFormatter } from "@/lib/utils";
import { TransactionSchema, TransactionType } from "@/types/transaction";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { QueryClient, useMutation } from "@tanstack/react-query";
import submitNewTransaction from "@/use-cases/submitNewTransaction";
import React, { forwardRef, Ref, useRef } from 'react';

import ReceiptToPrint from "../transactions/Receipt";
import ReactToPrint, { useReactToPrint } from 'react-to-print';

const ConfirmCheckoutSheet = () => {
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
  
  
  const { mutate, isPending } = useMutation({
    mutationFn: submitNewTransaction,
    onSuccess: () => {
      resetCart();
      return queryClient.invalidateQueries({ queryKey: ["transactions"] });
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
      purchasedProducts: cart,
    },
  });



  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  // });


  const onSubmit = (data: TransactionType) => {
    mutate(data);
    // handlePrint();

  };

  const reactToPrintContent = React.useCallback(() => {
    console.log(componentRef);
    return componentRef.current;
  }, [componentRef.current]);

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
        <ReceiptToPrint forwardedRef={componentRef} />

        <ReactToPrint 
            trigger = {()=><Button>Print</Button>}
            content= {reactToPrintContent}
            
            removeAfterPrint
            pageStyle={pageStyle}



            />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="h-full flex flex-col justify-between"
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
              {selectedPaymentMethod == "CHECK" && (
                <div className="flex flex-col gap-2">
                  <div>
                    <FormField
                      control={form.control}
                      name="checkNumber"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Checkout Number</FormLabel>
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
                          <FormLabel>Checkout Amount</FormLabel>
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
              <SheetFooter className="mt-2">
                <Button
                  type="submit"
                  className="w-full h-14 text-lg"
                  disabled={isPending}
                >
                  {isPending ? (
                    <Loader2 className="animate-spin w-6 h-6" />
                  ) : (
                    <>
                      Confirm Checkout ({currencyFormatter(getTotal())})
                      <Check className="ml-2" />
                    </>
                  )}
                </Button>
              </SheetFooter>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default ConfirmCheckoutSheet;
