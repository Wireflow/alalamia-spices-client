import { z } from "zod";

export const MemberSchema = z.object({
  id: z.string().optional(),
  name: z.string({ required_error: "Name is required!" }),
  address: z.string({ required_error: "Address is required!" }),
  city: z.string({ required_error: "City is required!" }),
  state: z.string({ required_error: "State is required!" }),
  zipCode: z
    .string({ required_error: "Zip code is required!" })
    .max(5, "Zip code too long!"),
  phoneNumber: z.string().max(10, "Phone number too long!"),
  owedBalance: z
    .number({ required_error: "Please check the balance and try again!" })
    .optional(),
});

export type MemberType = z.infer<typeof MemberSchema>;

export const MemberSearch = z.string();

export type MemberSearchType = z.infer<typeof MemberSearch>;
