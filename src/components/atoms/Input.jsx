import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Input = forwardRef(({ 
  className,
  type = "text",
  ...props 
}, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        "w-full px-4 py-3 border-2 border-gray-300 rounded-lg transition-all duration-200",
        "focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
        "placeholder:text-gray-400",
        "disabled:bg-gray-100 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;