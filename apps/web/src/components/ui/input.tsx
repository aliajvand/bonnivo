"use client";

import React, { forwardRef } from "react";
import { cn, toEnglishDigits } from "@/lib/utils";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  normalizePersianDigits?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      normalizePersianDigits = false,
      onChange,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? `input-${label.replace(/\s+/g, "-")}` : undefined);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (normalizePersianDigits) {
        e.target.value = toEnglishDigits(e.target.value);
      }
      onChange?.(e);
    };

    return (
      <div className="w-full space-y-1.5 text-right" dir="rtl">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-bold text-foreground">
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {rightIcon && (
            <div className="absolute right-3.5 flex items-center justify-center text-muted-foreground pointer-events-none">
              {rightIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            onChange={handleChange}
            className={cn(
              "w-full h-11 min-h-[44px] px-3.5 rounded-2xl bg-surface-subtle text-foreground text-xs sm:text-sm border transition-all duration-200 focus:outline-hidden focus:bg-surface focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-muted-foreground/70",
              rightIcon ? "pr-10" : "pr-3.5",
              leftIcon ? "pl-10" : "pl-3.5",
              error
                ? "border-rose-400 focus:ring-rose-400/40 focus:border-rose-500 bg-rose-50/20"
                : "border-border/80 hover:border-border",
              className
            )}
            {...props}
          />

          {leftIcon && (
            <div className="absolute left-3.5 flex items-center justify-center text-muted-foreground pointer-events-none">
              {leftIcon}
            </div>
          )}
        </div>

        {error ? (
          <p className="text-[11px] font-medium text-rose-600 dark:text-rose-400 mt-1">{error}</p>
        ) : helperText ? (
          <p className="text-[11px] text-muted-foreground mt-1">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
