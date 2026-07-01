import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-base text-brand-navy ring-offset-background transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-brand-navy/40 focus-visible:outline-none focus-visible:border-brand-yellow focus-visible:ring-2 focus-visible:ring-brand-yellow/60 focus-visible:ring-offset-0 focus-visible:shadow-[0_0_0_4px_rgba(255,193,7,0.12)] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
