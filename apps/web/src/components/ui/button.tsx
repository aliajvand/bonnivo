"use client";

import React, { forwardRef } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive" | "gold";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-bold transition-all duration-200 select-none cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-500/50 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed active:scale-[0.98]";

    const variantStyles = {
      primary:
        "bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs shadow-emerald-950/20 active:bg-emerald-800",
      secondary:
        "bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-100 border border-stone-200/80 dark:border-stone-700",
      outline:
        "bg-transparent hover:bg-emerald-50/60 dark:hover:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border border-emerald-600/40 hover:border-emerald-600",
      ghost:
        "bg-transparent hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300",
      destructive:
        "bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800",
      gold:
        "bg-amber-500 hover:bg-amber-600 text-white shadow-xs shadow-amber-950/20 active:bg-amber-700",
    };

    const sizeStyles = {
      sm: "h-9 px-3 rounded-xl text-xs gap-1.5 min-h-[36px]",
      md: "h-11 px-5 rounded-2xl text-xs sm:text-sm gap-2 min-h-[44px]",
      lg: "h-13 px-7 rounded-2xl text-sm sm:text-base gap-2.5 min-h-[50px]",
      icon: "w-11 h-11 p-0 rounded-2xl min-h-[44px] min-w-[44px] shrink-0",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
        ) : (
          <>
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
            {children}
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
