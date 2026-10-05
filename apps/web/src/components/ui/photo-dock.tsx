"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface PhotoDockItem {
  id: string;
  label: string;
  imageSrc: string;
  href: string;
  badge?: string | number;
}

export interface PhotoDockProps {
  items: PhotoDockItem[];
  activeId?: string;
  columns?: 4 | 6 | 8;
  title?: string;
  className?: string;
}

export function PhotoDock({
  items,
  activeId,
  columns = 8,
  title,
  className,
}: PhotoDockProps) {
  const gridColsClass = {
    4: "grid-cols-2 sm:grid-cols-4",
    6: "grid-cols-3 sm:grid-cols-6",
    8: "grid-cols-4 sm:grid-cols-8",
  }[columns];

  return (
    <div className={cn("w-full max-w-5xl mx-auto px-3 sm:px-4 select-none", className)} dir="rtl">
      {title && (
        <h3 className="text-xs sm:text-sm font-bold text-stone-500 dark:text-stone-400 mb-2 px-1">
          {title}
        </h3>
      )}

      <div className="glass-dock rounded-3xl p-3 sm:p-4 border border-white/70 dark:border-stone-800/80 shadow-xl shadow-emerald-950/5">
        <div className={cn("grid gap-2.5 sm:gap-3.5", gridColsClass)}>
          {items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center p-1.5 sm:p-2 rounded-2xl transition-all duration-300 group active:scale-95",
                  isActive
                    ? "bg-emerald-600/10 text-emerald-700 dark:text-emerald-300 font-black"
                    : "hover:bg-emerald-50/50 dark:hover:bg-stone-800/50 text-stone-700 dark:text-stone-300"
                )}
              >
                {/* Photo Squircle with Active Indicator & Badge */}
                <div
                  className={cn(
                    "relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl overflow-hidden shadow-xs ring-2 transition-all duration-300 group-hover:scale-105 group-hover:shadow-md bg-stone-100 dark:bg-stone-800",
                    isActive
                      ? "ring-emerald-600 shadow-emerald-500/25 ring-offset-2"
                      : "ring-stone-200/90 dark:ring-stone-700 group-hover:ring-emerald-500/80"
                  )}
                >
                  <Image
                    src={item.imageSrc}
                    alt={item.label}
                    fill
                    sizes="(max-width: 640px) 48px, 64px"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {item.badge && (
                    <span className="absolute top-1 start-1 bg-rose-500 text-white text-[9px] font-black rounded-full px-1.5 py-0.5 shadow-xs">
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* Category / Service Label */}
                <span
                  className={cn(
                    "text-[11px] sm:text-xs font-bold truncate text-center w-full mt-1.5 transition-colors",
                    isActive
                      ? "text-emerald-700 dark:text-emerald-400 font-black"
                      : "group-hover:text-emerald-700 dark:group-hover:text-emerald-400 text-stone-800 dark:text-stone-200"
                  )}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
