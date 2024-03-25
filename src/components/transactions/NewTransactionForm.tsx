import { PurchasedProductType, TransactionSchema, TransactionType } from "@/types/transaction";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
// import { Input } from "@components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import submitNewTransaction from "@/use-cases/submitNewTransaction";
// import { Button } from "@components/ui/button";
import { HandCoins } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useCart } from "@/State/store";


type NewTransactionFormProps = {
  setOpen: (isOpen: boolean) => void;


  memberId: string;

};

const NewTransactionForm = ({ setOpen, }: NewTransactionFormProps) => {
  const queryClient = useQueryClient();
  const { getProducts, selectedPaymentMethod, totalAmount } = useCart();
  const { mutate, isPending } = useMutation({
    mutationFn: submitNewTransaction,
    onSuccess: () => {
      setOpen(false);
      return queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });

  const form = useForm<TransactionType>({
    resolver: zodResolver(TransactionSchema),
    defaultValues: {
      totalAmount: totalAmount(),
      paymentMethod: selectedPaymentMethod,
      memberId: "",
      checkNumber: 0,
      checkAmount: 0,
      purchasedProducts: getProducts()

    },
  });

  const onSubmit = async (data: TransactionType) => {
    console.log(data);
    mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" w-full">
        <div className="grid gap-4">
          {/* payment method */}
          <FormField
            control={form.control}
            name="paymentMethod"
            // disabled
            rules={{ required: true, pattern: /^[0-9]+$/, maxLength: 5 }}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Payment Method</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    readOnly
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* total amount */}
          <FormField
            control={form.control}
            name="totalAmount"
            // disabled

            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Total Amount</FormLabel>
                <FormControl>
                  <Input {...field} type="number"
                    // defaultValue={totalAmount}
                    readOnly
                    onChange={(e) => field.onChange(parseFloat(e.target.value))} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* check number */}
          {selectedPaymentMethod == "CHECK" && (<FormField
            control={form.control}
            name="checkNumber"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Check Number</FormLabel>
                <FormControl>
                  <Input {...field} type="number"
                    onChange={(e) => e.target.value? field.onChange(parseFloat(e.target.value)) : field.onChange(0)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          )}
          {selectedPaymentMethod == "CHECK" && (<FormField
            control={form.control}
            name="checkAmount"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Check Amount</FormLabel>
                <FormControl>
                  <Input {...field} type="number"
                    onChange={(e) => e.target.value? field.onChange(parseFloat(e.target.value)) : field.onChange(0)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          )}
          <Button className="w-full mt-4" disabled={isPending}>
            <div className="lex items-center justify-center space-x-2">
              <span className="mr-2">{isPending ? "Validating..." : "Pay"}</span>
            </div>
            <HandCoins color="white" />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default NewTransactionForm;