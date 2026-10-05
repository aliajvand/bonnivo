"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  actionHref?: string;
  actionText?: string;
  badge?: React.ReactNode;
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  actionHref,
  actionText,
  badge,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 select-none",
        className
      )}
      dir="rtl"
    >
      <div className="space-y-1">
        <div className="flex items-center gap-2.5">
          {badge}
          <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
            {title}
          </h2>
        </div>
        {subtitle && (
          <p className="text-xs sm:text-sm text-muted-foreground font-light">{subtitle}</p>
        )}
      </div>

      {actionHref && actionText && (
        <Link
          href={actionHref}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-700 dark:text-emerald-400 hover:opacity-80 transition-opacity self-start sm:self-auto group"
        >
          <span>{actionText}</span>
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        </Link>
      )}
    </div>
  );
}
