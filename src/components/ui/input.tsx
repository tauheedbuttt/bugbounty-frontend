import * as React from "react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/use-translation";

export interface InputProps extends React.ComponentProps<"input"> {
  error?: string | boolean;
  label?: string;
  helperText?: string;
  component?: "input" | "textarea";
}

const Component = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputProps
>((compProps, ref) =>
  compProps.component === "input" ? (
    <input ref={ref as React.Ref<HTMLInputElement>} {...compProps} />
  ) : (
    <textarea
      ref={ref as React.Ref<HTMLTextAreaElement>}
      {...(compProps as any)}
    />
  )
);
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, label, helperText, ...props }, ref) => {
    const { currentLanguage } = useTranslation();
    const hasError = Boolean(error);
    const errorMessage = typeof error === "string" ? error : "";
    const isArabic = currentLanguage === "ar";

    props.component = props.component ?? "input";

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={props.id}
            className={cn(
              "block text-sm font-medium mb-2",
              hasError ? "text-destructive" : "text-foreground",
              isArabic ? "text-right" : "text-left"
            )}
          >
            {label}
          </label>
        )}

        <Component
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            hasError
              ? "border-destructive focus-visible:ring-destructive"
              : "border-input focus-visible:ring-ring",
            isArabic ? "text-right dir-rtl" : "text-left",
            className
          )}
          ref={ref}
          dir={isArabic ? "rtl" : "ltr"}
          aria-invalid={hasError}
          aria-describedby={
            hasError
              ? `${props.id}-error`
              : helperText
              ? `${props.id}-helper`
              : undefined
          }
          {...props}
        />

        {hasError && errorMessage && (
          <p
            id={`${props.id}-error`}
            className={cn(
              "text-sm text-destructive mt-1",
              isArabic ? "text-right" : "text-left"
            )}
          >
            {errorMessage}
          </p>
        )}

        {!hasError && helperText && (
          <p
            id={`${props.id}-helper`}
            className={cn(
              "text-sm text-muted-foreground mt-1",
              isArabic ? "text-right" : "text-left"
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input, type InputProps };
