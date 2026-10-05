"use client";

import React from "react";
import { Star } from "lucide-react";
import { cn, formatPersianNumber } from "@/lib/utils";

export interface RatingStarsProps {
  rating: number; // e.g. 4.8
  reviewCount?: number; // e.g. 142
  size?: "sm" | "md";
  showCount?: boolean;
  className?: string;
}

export function RatingStars({
  rating,
  reviewCount,
  size = "sm",
  showCount = true,
  className,
}: RatingStarsProps) {
  const iconSizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
  };

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
  };

  return (
    <div className={cn("inline-flex items-center gap-1.5 font-bold select-none", className)}>
      <span className="flex items-center gap-1 text-amber-500">
        <Star className={cn(iconSizes[size], "fill-amber-400 text-amber-400 shrink-0")} />
        <span className={cn(textSizes[size], "font-black text-foreground")}>
          {formatPersianNumber(rating)}
        </span>
      </span>

      {showCount && reviewCount !== undefined && (
        <span className="text-[11px] text-muted-foreground font-normal">
          ({formatPersianNumber(reviewCount)} نظر)
        </span>
      )}
    </div>
  );
}
