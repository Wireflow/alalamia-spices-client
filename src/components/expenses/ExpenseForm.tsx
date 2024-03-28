import { ExpenseSchema, ExpenseType } from "@/types/expense";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import submitNewExpense from "../../use-cases/submitNewExpense";
import { FormMode } from "@/types/form";
import { Expense } from "@prisma/client";
import updateExpense from "@/use-cases/updateExpense";
import FormButton from "../forms/FormButton";

type ExpenseFormProps = {
  setOpen: (isOpen: boolean) => void;
  mode: FormMode;
  expense?: Expense;
};

const ExpenseForm = ({ setOpen, mode, expense }: ExpenseFormProps) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: mode === "edit" ? updateExpense : submitNewExpense,
    onSuccess: () => {
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });

  const form = useForm<ExpenseType>({
    resolver: zodResolver(ExpenseSchema),
    defaultValues: {
      name: expense?.name ? expense.name : undefined,
      amount: expense?.amount ? expense.amount : 0.0,
    },
  });

  const onSubmit = async (data: ExpenseType) => {
    mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} type="text" mode={mode} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            rules={{ required: true, pattern: /^[0-9]+$/, maxLength: 5 }}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>amount</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    mode={mode}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormButton mode={mode} isPending={isPending} setOpen={setOpen} />
        </div>
      </form>
    </Form>
  );
};

export default ExpenseForm;
