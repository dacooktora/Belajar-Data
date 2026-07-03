import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils/helpers';

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-sm hover:shadow",
        secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400",
        success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 shadow-sm hover:shadow",
        danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm hover:shadow",
        warning: "bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-400 shadow-sm hover:shadow",
        outline: "border-2 border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 focus:ring-gray-400",
        ghost: "bg-transparent text-gray-600 hover:bg-gray-100 focus:ring-gray-300",
        link: "bg-transparent text-blue-600 hover:underline hover:text-blue-700 p-0 h-auto focus:ring-0",
        gradient: "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-sm hover:shadow",
        dark: "bg-gray-800 text-white hover:bg-gray-900 focus:ring-gray-700 shadow-sm hover:shadow",
        light: "bg-white text-gray-800 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 shadow-sm hover:shadow",
      },
      size: {
        xs: "px-2.5 py-1.5 text-xs",
        sm: "px-3 py-2 text-sm",
        md: "px-4 py-2.5 text-sm",
        lg: "px-6 py-3 text-base",
        xl: "px-8 py-4 text-lg",
        icon: "w-9 h-9 p-0",
        "icon-sm": "w-7 h-7 p-0 text-xs",
        "icon-lg": "w-11 h-11 p-0 text-lg",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded",
        md: "rounded-lg",
        lg: "rounded-xl",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
      rounded: "md",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  asChild?: boolean;
}

export function Button({
  children,
  className,
  variant,
  size,
  fullWidth,
  rounded,
  isLoading = false,
  loadingText,
  leftIcon,
  rightIcon,
  disabled,
  type = "button",
  ...props
}: ButtonProps) {
  const content = isLoading ? (
    <>
      <svg
        className="mr-2 h-4 w-4 animate-spin"
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
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      {loadingText || "Loading..."}
    </>
  ) : (
    <>
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </>
  );

  return (
    <button
      type={type}
      className={cn(
        buttonVariants({ variant, size, fullWidth, rounded }),
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {content}
    </button>
  );
}

export default Button;
