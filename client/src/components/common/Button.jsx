import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const Button = forwardRef(
  (
    {
      children,
      variant = "primary",
      size = "md",
      className,
      isLoading,
      as: Component = "button",
      ...props
    },
    ref
  ) => {
    const variants = {
      primary:
        "bg-primary-600 hover:bg-primary-700 text-white dark:bg-primary-500 dark:hover:bg-primary-600",
      secondary:
        "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700",
      success: "btn-success",
      error: "btn-error",
      outline: "btn-outline",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-sm",
      lg: "px-5 py-2.5 text-base",
    };

    return (
      <Component
        ref={ref}
        className={twMerge(variants[variant], sizes[size], className)}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center">
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4"
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
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Loading...
          </div>
        ) : (
          children
        )}
      </Component>
    );
  }
);

Button.displayName = "Button";

export default Button;
