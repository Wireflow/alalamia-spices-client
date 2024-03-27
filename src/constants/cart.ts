export const PAYMENT_METHODS: readonly ["CASH", "CHECK", "UNPAID"] = [
  "CASH",
  "CHECK",
  "UNPAID",
];

export type PaymentMethodsType = (typeof PAYMENT_METHODS)[number];

export const SEARCH_OPTIONS: readonly ["address", "phone number"] = [
  "address",
  "phone number",
];
export type SearchOptions = (typeof SEARCH_OPTIONS)[number];
