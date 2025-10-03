import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Button = forwardRef(({ 
  children, 
  className, 
  variant = "primary",
  size = "md",
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-primary-light text-white hover:shadow-lg hover:scale-105",
    secondary: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
    accent: "bg-gradient-to-r from-accent to-accent-light text-white hover:shadow-lg hover:scale-105",
    ghost: "text-gray-700 hover:bg-gray-100"
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <button
      ref={ref}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;