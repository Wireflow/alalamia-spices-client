import z from "zod";

export const TransactionSchema = z.object({
  totalAmount: z.number(),
  paymentMethod: z.enum(["CASH", "CARD", "CHECK"]),
  memberId: z.string(),
  checkNumber : z.number(),
  checkAmount: z.number(),
  products: z
    .object({
      id: z.string(),
    })
    .array(),
});
export type TransactionType = z.infer<typeof TransactionSchema>;


export const TransactionTotalAmount = z.object({
  totalAmount: z.number({
    required_error: "Please check the amount and try again!",
  }),
});

export type TransactionTotalAmountType = z.infer<typeof TransactionTotalAmount>;

export const PaymentMethod = z.object({
  paymentMethod: z.string({
    required_error: "Please check the Payment Method and try again!",
  }),
});

export type PaymentMethodType = z.infer<typeof PaymentMethod>;


// member id

export const MemberId = z.object({
  memberId: z.string({
    required_error: "Please select the Member and try again!",
  }),
});

export type MemberIdType = z.infer<typeof MemberId>;


// check number
export const CheckNumber = z.object({
  checkNumber: z.number(),
});

export type CheckNumberType = z.infer<typeof CheckNumber>;

// check amount
export const CheckAmount = z.object({
  checkAmount: z.number(),
});

export type CheckAmountType = z.infer<typeof CheckAmount>;
