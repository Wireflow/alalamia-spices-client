import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const dateFormatter = new Intl.DateTimeFormat('en-US', {   year: 'numeric',   month: 'long',   day: 'numeric', });



export const MAX_VALUE = 9999999.99;

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

 const formatCurrency = (value: number) => {
  return currencyFormatter.format(value);
};

export default formatCurrency;
