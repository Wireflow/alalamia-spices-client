import * as React from "react";

import { cn } from "@/lib/utils";
import { FormMode } from "@/types/form";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  mode: FormMode;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, mode, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-white px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className,
          {
            "bg-transparent": mode === "view",
          }
        )}
        ref={ref}
        readOnly={mode === "view"}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
