import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

type TooltipPosition = "top" | "bottom" | "left" | "right";

// Enhanced Tooltip component with positioning and button-like styling
const Tooltip: React.FC<{
  className: string;
  title: string;
  children: React.ReactNode;
  position?: TooltipPosition;
}> = ({ className, title, children, position = "top" }) => {
  const getTooltipClasses = () => {
    const baseClasses =
      "pointer-events-none absolute z-10 whitespace-nowrap rounded-md border border-input bg-popover px-3 py-1.5 text-xs text-popover-foreground shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200";

    switch (position) {
      case "top":
        return `${baseClasses} left-1/2 bottom-full mb-2 -translate-x-1/2`;
      case "bottom":
        return `${baseClasses} left-1/2 top-full mt-2 -translate-x-1/2`;
      case "left":
        return `${baseClasses} right-full top-1/2 mr-2 -translate-y-1/2`;
      case "right":
        return `${baseClasses} left-full top-1/2 ml-2 -translate-y-1/2`;
      default:
        return `${baseClasses} left-1/2 bottom-full mb-2 -translate-x-1/2`;
    }
  };

  const getArrowClasses = () => {
    const baseArrowClasses = "absolute border-4";

    switch (position) {
      case "top":
        return `${baseArrowClasses} left-1/2 top-full -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-popover`;
      case "bottom":
        return `${baseArrowClasses} left-1/2 bottom-full -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-popover`;
      case "left":
        return `${baseArrowClasses} left-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-popover`;
      case "right":
        return `${baseArrowClasses} right-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-popover`;
      default:
        return `${baseArrowClasses} left-1/2 top-full -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-popover`;
    }
  };

  return (
    <span
      className={cn(
        "relative group",
        className,
        "bg-transparent p-0 hover:bg-gray-200 cursor-pointer"
      )}
    >
      {children}
      <span className={getTooltipClasses()}>
        {title}
        <span className={getArrowClasses()} />
      </span>
    </span>
  );
};

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// Loader component
const Loader = ({ className }: { className?: string }) => (
  <svg
    className={cn("animate-spin", className)}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="m4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  title?: string;
  titlePosition?: TooltipPosition;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading = false,
      loadingText,
      children,
      disabled,
      title,
      titlePosition = "top",
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    const buttonContent = (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading || disabled}
        title={title}
        {...props}
      >
        {isLoading ? <Loader className="h-4 w-4" /> : children}
      </Comp>
    );

    return title ? (
      <Tooltip
        className={cn(buttonVariants({ variant, size, className }))}
        title={title}
        position={titlePosition}
      >
        {buttonContent}
      </Tooltip>
    ) : (
      buttonContent
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
