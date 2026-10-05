"use client";

import React from "react";
import { cn, formatPersianNumber } from "@/lib/utils";

export interface PriceTagProps {
  priceTomans: number;
  discountedPriceTomans?: number;
  isFree?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function PriceTag({
  priceTomans,
  discountedPriceTomans,
  isFree = false,
  size = "md",
  className,
}: PriceTagProps) {
  if (isFree || priceTomans === 0) {
    return (
      <div className={cn("inline-flex items-center", className)}>
        <span className="text-xs sm:text-sm font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-lg border border-emerald-200/80 dark:border-emerald-800/60">
          رایگان
        </span>
      </div>
    );
  }

  const hasDiscount =
    discountedPriceTomans !== undefined &&
    discountedPriceTomans > 0 &&
    discountedPriceTomans < priceTomans;

  const discountPercent = hasDiscount
    ? Math.round(((priceTomans - (discountedPriceTomans || 0)) / priceTomans) * 100)
    : 0;

  const effectivePrice = hasDiscount ? discountedPriceTomans : priceTomans;

  const sizeClasses = {
    sm: {
      price: "text-xs font-black",
      unit: "text-[10px]",
      strikethrough: "text-[10px]",
      badge: "text-[9px] px-1 py-0.5",
    },
    md: {
      price: "text-sm sm:text-base font-black",
      unit: "text-xs",
      strikethrough: "text-[11px] sm:text-xs",
      badge: "text-[10px] px-1.5 py-0.5",
    },
    lg: {
      price: "text-lg sm:text-xl font-black",
      unit: "text-xs sm:text-sm",
      strikethrough: "text-xs sm:text-sm",
      badge: "text-xs px-2 py-0.5",
    },
  };

  return (
    <div
      className={cn(
        "flex flex-row items-center justify-between gap-1.5 w-full select-none",
        className
      )}
    >
      {/* Final Effective Price (Toman) */}
      <div className="flex items-baseline gap-1 shrink-0">
        <span className={cn("text-foreground font-black tracking-tight", sizeClasses[size].price)}>
          {formatPersianNumber(effectivePrice)}
        </span>
        <span className={cn("text-muted-foreground font-medium", sizeClasses[size].unit)}>
          تومان
        </span>
      </div>

      {/* Discount Badge & Strikethrough Price in the SAME single row */}
      {hasDiscount && (
        <div className="flex items-center gap-1.5 shrink-0">
          <span
            className={cn(
              "font-black bg-rose-500 text-white rounded-md leading-none shadow-2xs",
              sizeClasses[size].badge
            )}
          >
            ٪{formatPersianNumber(discountPercent)}
          </span>
          <span
            className={cn(
              "line-through text-muted-foreground/80 font-medium",
              sizeClasses[size].strikethrough
            )}
          >
            {formatPersianNumber(priceTomans)}
          </span>
        </div>
      )}
    </div>
  );
}
