"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ServiceDockItem {
  id: string;
  label: string;
  imageSrc: string;
  href: string;
}

const DEFAULT_DOCK_ITEMS: ServiceDockItem[] = [
  {
    id: "dog",
    label: "سگ",
    imageSrc: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=300&q=80",
    href: "/shop?species=DOG",
  },
  {
    id: "cat",
    label: "گربه",
    imageSrc: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=300&q=80",
    href: "/shop?species=CAT",
  },
  {
    id: "small-pets",
    label: "جوندگان",
    imageSrc: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=300&q=80",
    href: "/shop?species=SMALL_PET",
  },
  {
    id: "birds",
    label: "پرندگان",
    imageSrc: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=300&q=80",
    href: "/shop?species=BIRD",
  },
  {
    id: "food",
    label: "غذا و تشویقی",
    imageSrc: "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?auto=format&fit=crop&w=300&q=80",
    href: "/shop?category=food",
  },
  {
    id: "toys",
    label: "اسباب‌بازی",
    imageSrc: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=300&q=80",
    href: "/shop?category=toys",
  },
  {
    id: "health",
    label: "سلامت و دارو",
    imageSrc: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=300&q=80",
    href: "/vets",
  },
  {
    id: "all",
    label: "همه ملزومات",
    imageSrc: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=300&q=80",
    href: "/shop",
  },
];

export interface ServiceDockProps {
  items?: ServiceDockItem[];
  activeId?: string;
  className?: string;
}

export function ServiceDock({
  items = DEFAULT_DOCK_ITEMS,
  activeId,
  className,
}: ServiceDockProps) {
  return (
    <div className={cn("w-full max-w-5xl mx-auto px-3 sm:px-4 select-none", className)} dir="rtl">
      <div className="glass-dock rounded-3xl p-3 sm:p-4 border border-white/70 dark:border-stone-800/80 shadow-xl shadow-emerald-950/5">
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5 sm:gap-3.5">
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
                {/* Beautiful, Bright, High-Res Photo Avatar with Squircle Ring */}
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
                </div>

                {/* Text Label Below the Photo */}
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
