export const PAYMENT_METHODS: readonly ["CASH", "CHECK", "CARD"] = [
  "CASH",
  "CHECK",
  "CARD",
];

export type PaymentMethodsType = (typeof PAYMENT_METHODS)[number];

export const SEARCH_OPTIONS: readonly ["address", "phoneNumber"] = [
  "address",
  "phoneNumber",
];
export type SearchOptions = (typeof SEARCH_OPTIONS)[number];
