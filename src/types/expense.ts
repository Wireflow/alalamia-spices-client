import z from "zod";

export const ExpenseSchema = z.object({
  name: z.string(),
  amount: z.number(),
});
