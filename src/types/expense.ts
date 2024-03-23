import z from "zod";

export const ExpenseSchema = z.object({
  id: z.string(),
  name: z.string(),
  amount: z.number(),
  
});
export type ExpenseType = z.infer<typeof ExpenseSchema>;

export const ExpenseId = z.object({
  id: z.string(),
});

export const ExpenseName = z.object({
  name: z.string(),
});

export type ExpenseNameType = z.infer<typeof ExpenseName>;

export const ExpenseAmount = z.object({
  amount: z.number({ required_error: "Please check the amount and try again!" }),
});

export type ExpenseAmountType = z.infer<typeof ExpenseAmount>;
