import * as React from "react";

import { cn } from "@/lib/utils";
import { FormMode } from "@/types/form";
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  mode?: FormMode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, mode, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex  h-10 w-full rounded-md border border-input bg-white px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className,
          {
            "bg-transparent  px-0": mode === "view",
          }
        )}
        ref={ref}
        disabled={mode === "view" ? true : props.disabled}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
