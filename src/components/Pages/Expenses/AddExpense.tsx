import { ExpenseSchema, ExpenseType } from "@/types/expense";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../../ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import submitNewExpense from "../../../use-cases/submitNewExpense";

type NewExpenseFormProps = {
    setOpen: (isOpen: boolean) => void;
};

const NewExpenseForm = ({ setOpen }: NewExpenseFormProps) => {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: submitNewExpense,
        onSuccess: () => {
            setOpen(false);
            return queryClient.invalidateQueries({ queryKey: ["expenses"] });
        },
    });

    const form = useForm<ExpenseType>({
        resolver: zodResolver(ExpenseSchema),
        defaultValues: {
            name: undefined,
            amount: 0.0,
        },
    });

    const onSubmit = async (data: ExpenseType) => {
        mutate(data);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" w-full">
                <div className="grid gap-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input {...field} type="text" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="amount"
                        rules={{ required: true, pattern: /^[0-9]+$/ ,maxLength: 5,}}
                        
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>amount</FormLabel>
                                <FormControl>
                                    <Input {...field}
                                        type="number"
                                        onChange={(e) => field.onChange(parseFloat(e.target.value))} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full mt-4" disabled={isPending}>
                        {isPending ? "Adding..." : "Add"}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default NewExpenseForm;
