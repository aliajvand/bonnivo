"use client";

import React from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export interface ShopCategoryItem {
  id: string;
  slug: string;
  titleFa: string;
  subtitleFa: string;
  icon: string;
  accentBg: string;
  itemCount: number;
}

export const SHOP_CATEGORIES: ShopCategoryItem[] = [
  {
    id: "cat-food",
    slug: "cat",
    titleFa: "غذای گربه",
    subtitleFa: "خشک، پوچ و کنسرو",
    icon: "🐱",
    accentBg: "from-amber-50 to-orange-100 dark:from-amber-950/40 dark:to-orange-950/30 text-amber-700 dark:text-amber-300",
    itemCount: 42,
  },
  {
    id: "dog-food",
    slug: "dog",
    titleFa: "غذای سگ",
    subtitleFa: "پاپی، ادالت و نژاد بزرگ",
    icon: "🐶",
    accentBg: "from-emerald-50 to-teal-100 dark:from-emerald-950/40 dark:to-teal-950/30 text-emerald-700 dark:text-emerald-300",
    itemCount: 38,
  },
  {
    id: "treats",
    slug: "treats",
    titleFa: "تشویقی و اسنک",
    subtitleFa: "بیسکویت و مغزیجات",
    icon: "🍖",
    accentBg: "from-rose-50 to-pink-100 dark:from-rose-950/40 dark:to-pink-950/30 text-rose-700 dark:text-rose-300",
    itemCount: 26,
  },
  {
    id: "accessories",
    slug: "accessories",
    titleFa: "قلاده و جای خواب",
    subtitleFa: "طبی، چرمی و ارگونومیک",
    icon: "🛋️",
    accentBg: "from-purple-50 to-indigo-100 dark:from-purple-950/40 dark:to-indigo-950/30 text-purple-700 dark:text-purple-300",
    itemCount: 19,
  },
  {
    id: "health",
    slug: "health",
    titleFa: "مکمل و دارویی",
    subtitleFa: "مولتی‌ویتامین و مالت",
    icon: "💊",
    accentBg: "from-blue-50 to-sky-100 dark:from-blue-950/40 dark:to-sky-950/30 text-blue-700 dark:text-blue-300",
    itemCount: 15,
  },
  {
    id: "hygiene",
    slug: "hygiene",
    titleFa: "خاک و بهداشت",
    subtitleFa: "کربن فعال و ضد بو",
    icon: "🛁",
    accentBg: "from-cyan-50 to-teal-100 dark:from-cyan-950/40 dark:to-teal-950/30 text-cyan-700 dark:text-cyan-300",
    itemCount: 22,
  },
  {
    id: "toys",
    slug: "toys",
    titleFa: "اسباب‌بازی و بازی",
    subtitleFa: "چوب‌پر، توپ و لیزر",
    icon: "🎾",
    accentBg: "from-yellow-50 to-amber-100 dark:from-yellow-950/40 dark:to-amber-950/30 text-yellow-700 dark:text-yellow-300",
    itemCount: 18,
  },
  {
    id: "all",
    slug: "all",
    titleFa: "همه دسته‌ها",
    subtitleFa: "کل کاتالوگ فروشگاه",
    icon: "✨",
    accentBg: "from-stone-100 to-stone-200 dark:from-stone-850 dark:to-stone-800 text-stone-700 dark:text-stone-300",
    itemCount: 180,
  },
];

interface ShopCategoriesBannerProps {
  activeCategory?: string;
  onSelectCategory?: (slug: string) => void;
}

export function ShopCategoriesBanner({ activeCategory, onSelectCategory }: ShopCategoriesBannerProps) {
  return (
    <div className="space-y-3" dir="rtl">
      <div className="flex items-center justify-between">
        <h3 className="text-sm sm:text-base font-black text-foreground">
          دسته‌بندی‌های محبوب محصولات
        </h3>
        <span className="text-xs text-stone-400">انتخاب سریع دسته کالا</span>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5 sm:gap-3">
        {SHOP_CATEGORIES.map((cat) => {
          const isSelected = activeCategory === cat.slug;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory?.(cat.slug)}
              className={`p-2.5 sm:p-3 rounded-2xl sm:rounded-3xl border transition-all duration-200 flex flex-col items-center justify-center text-center group cursor-pointer ${
                isSelected
                  ? "bg-emerald-600 text-white border-emerald-600 shadow-md scale-[1.02]"
                  : "bg-surface hover:bg-surface-subtle border-border/80 hover:border-emerald-500/40 shadow-2xs hover:shadow-xs"
              }`}
            >
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl mb-1.5 transition-transform group-hover:scale-110 ${
                  isSelected ? "bg-white/20" : `bg-gradient-to-br ${cat.accentBg}`
                }`}
              >
                {cat.icon}
              </div>

              <span
                className={`text-[11px] sm:text-xs font-bold leading-tight line-clamp-1 ${
                  isSelected ? "text-white" : "text-foreground group-hover:text-emerald-600"
                }`}
              >
                {cat.titleFa}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
