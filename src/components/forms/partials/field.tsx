"use client";

import { InputHTMLAttributes, ReactNode } from "react";
import { FieldPath, RegisterOptions } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { twMerge } from "tailwind-merge";
import { RegisterUser } from "@/types/RegisterUser";
import { NewPassword } from "@/types/ResetPassword";

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  control: any;
  name: FieldPath<RegisterUser | NewPassword>;
  label?: string;
  size?: number;
  description?: string;
  labelStyle?: string;
  className?: string;
  rules?:
    | Omit<
        RegisterOptions<RegisterUser | NewPassword>,
        "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
      >
    | undefined;
}

const Field = ({
  control,
  name,
  label,
  rules,
  description,
  labelStyle,
  className,
  ...props
}: FieldProps) => {
  return (
    <FormField
      control={control}
      rules={rules}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className={labelStyle}>{label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              {...props}
              className={twMerge(
                "px-0 outline-none shadow-none border-x-0 border-t-0 rounded-none border-b-1 focus-visible:ring-0",
                className
              )}
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default Field;
