"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "w-full rounded-3xl border border-dashed border-border/80 bg-surface-subtle/50 p-8 sm:p-12 text-center flex flex-col items-center justify-center space-y-4 select-none",
        className
      )}
      dir="rtl"
    >
      {icon && (
        <div className="w-16 h-16 rounded-2xl bg-surface border border-border/60 flex items-center justify-center text-muted-foreground shadow-xs mb-1">
          {icon}
        </div>
      )}

      <div className="space-y-1.5 max-w-md">
        <h3 className="text-base sm:text-lg font-black text-foreground">{title}</h3>
        {description && (
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {action && <div className="pt-2">{action}</div>}
    </div>
  );
}
