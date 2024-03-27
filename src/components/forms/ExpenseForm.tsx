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

type AddEditViewExpenseFormProps = {
  setOpen: (isOpen: boolean) => void;
  mode: FormMode;
  expense?: Expense;
};

const AddEditViewExpenseForm = ({
  setOpen,
  mode,
  expense,
}: AddEditViewExpenseFormProps) => {
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

  const renderModeButton = () => {
    if (mode === "add")
      return (
        <Button type="submit" className="w-full mt-4" disabled={isPending}>
          Add
        </Button>
      );

    if (mode === "edit")
      return (
        <Button type="submit" className="w-full mt-4" disabled={isPending}>
          Edit
        </Button>
      );

    if (mode === "view")
      return (
        <Button
          type="button"
          className="w-full mt-4"
          onClick={() => setOpen(false)}
        >
          Close
        </Button>
      );

    return null;
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
          {renderModeButton()}
        </div>
      </form>
    </Form>
  );
};

export default AddEditViewExpenseForm;
