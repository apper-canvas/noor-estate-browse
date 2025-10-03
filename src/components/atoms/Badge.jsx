import { cn } from "@/utils/cn";

const Badge = ({ children, className, variant = "default" }) => {
  const variants = {
    default: "bg-gray-100 text-gray-700",
    primary: "bg-gradient-to-r from-primary/10 to-primary-light/10 text-primary",
    accent: "bg-gradient-to-r from-accent/10 to-accent-light/10 text-accent"
  };

  return (
    <span className={cn(
      "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium",
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
};

export default Badge;