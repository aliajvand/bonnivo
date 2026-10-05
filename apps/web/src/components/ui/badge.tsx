"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "emerald" | "gold" | "coral" | "indigo" | "teal" | "neutral";
  size?: "sm" | "md";
  icon?: React.ReactNode;
}

export function Badge({
  className,
  variant = "emerald",
  size = "md",
  icon,
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    emerald:
      "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 border-emerald-200/80 dark:border-emerald-800/60",
    gold: "bg-amber-50 text-amber-900 dark:bg-amber-950/50 dark:text-amber-300 border-amber-200/80 dark:border-amber-800/60",
    coral:
      "bg-rose-50 text-rose-800 dark:bg-rose-950/50 dark:text-rose-300 border-rose-200/80 dark:border-rose-800/60",
    indigo:
      "bg-indigo-50 text-indigo-800 dark:bg-indigo-950/50 dark:text-indigo-300 border-indigo-200/80 dark:border-indigo-800/60",
    teal: "bg-teal-50 text-teal-800 dark:bg-teal-950/50 dark:text-teal-300 border-teal-200/80 dark:border-teal-800/60",
    neutral:
      "bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300 border-stone-200 dark:border-stone-700",
  };

  const sizeStyles = {
    sm: "px-2 py-0.5 text-[10px] gap-1",
    md: "px-2.5 py-1 text-xs gap-1.5",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-bold rounded-full border transition-colors select-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
}
