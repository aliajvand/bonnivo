"use client";

import React from "react";
import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BenefitItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  badge?: string;
  href?: string;
  theme?: "emerald" | "amber" | "blue" | "purple" | "rose";
}

export interface BenefitGridProps {
  items: BenefitItem[];
  title?: string;
  subtitle?: string;
  columns?: 2 | 3 | 4;
  className?: string;
}

const BENEFIT_THEMES = {
  emerald: {
    bg: "bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
    badge: "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-300/40",
  },
  amber: {
    bg: "bg-amber-500/10 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/20",
    badge: "bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border-amber-300/40",
  },
  blue: {
    bg: "bg-sky-500/10 dark:bg-sky-500/15 text-sky-700 dark:text-sky-400 border-sky-500/20",
    badge: "bg-sky-100 dark:bg-sky-950/80 text-sky-800 dark:text-sky-300 border-sky-300/40",
  },
  purple: {
    bg: "bg-purple-500/10 dark:bg-purple-500/15 text-purple-700 dark:text-purple-400 border-purple-500/20",
    badge: "bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 border-purple-300/40",
  },
  rose: {
    bg: "bg-rose-500/10 dark:bg-rose-500/15 text-rose-700 dark:text-rose-400 border-rose-500/20",
    badge: "bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border-rose-300/40",
  },
};

export function BenefitGrid({
  items,
  title,
  subtitle,
  columns = 4,
  className,
}: BenefitGridProps) {
  const desktopCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
  }[columns];

  return (
    <section className={cn("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full select-none", className)} dir="rtl">
      {(title || subtitle) && (
        <div className="text-center mb-6">
          {title && <h2 className="text-xl sm:text-2xl font-black text-foreground">{title}</h2>}
          {subtitle && <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">{subtitle}</p>}
        </div>
      )}

      {/* Responsive Grid: 2x2 in Mobile, 4 columns on Desktop */}
      <div className={cn("grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6", desktopCols)}>
        {items.map((item) => {
          const Icon = item.icon;
          const theme = BENEFIT_THEMES[item.theme || "emerald"];
          const CardContent = (
            <div className="h-full rounded-2xl bg-white/70 dark:bg-stone-900/60 backdrop-blur-xl border border-stone-200/80 dark:border-stone-800/80 p-3 sm:p-5 flex flex-col justify-between hover:border-emerald-500/40 hover:shadow-lg transition-all duration-300 group">
              <div>
                <div className="flex items-center justify-between gap-1 mb-2.5 sm:mb-3">
                  <div
                    className={cn(
                      "w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center border shadow-xs group-hover:scale-105 transition-transform",
                      theme.bg
                    )}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>

                  {item.badge && (
                    <span
                      className={cn(
                        "text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full border",
                        theme.badge
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-xs sm:text-sm md:text-base font-black text-foreground group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                  {item.title}
                </h3>

                <p className="text-[11px] sm:text-xs text-stone-500 dark:text-stone-400 font-light leading-relaxed mt-1 line-clamp-2 sm:line-clamp-none">
                  {item.description}
                </p>
              </div>
            </div>
          );

          return item.href ? (
            <Link key={item.id} href={item.href} className="block active:scale-98 transition-transform">
              {CardContent}
            </Link>
          ) : (
            <div key={item.id}>{CardContent}</div>
          );
        })}
      </div>
    </section>
  );
}
