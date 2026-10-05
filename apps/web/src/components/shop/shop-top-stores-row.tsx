"use client";

import React from "react";
import Link from "next/link";
import { Store, ShieldCheck, Zap, ChevronLeft } from "lucide-react";

export interface PartnerStore {
  id: string;
  nameFa: string;
  subtitleFa: string;
  badgeFa: string;
  rating: number;
  deliveryTimeFa: string;
  logoEmoji: string;
}

export const TOP_STORES: PartnerStore[] = [
  {
    id: "seller-tehran-pet",
    nameFa: "پت‌شاپ نیاوران",
    subtitleFa: "نمایندگی رسمی رویال کنین",
    badgeFa: "ارسال ۲ ساعته",
    rating: 4.9,
    deliveryTimeFa: "۲ ساعت",
    logoEmoji: "🏪",
  },
  {
    id: "seller-pet-center",
    nameFa: "پت سنتر تهران",
    subtitleFa: "تضمین کمترین قیمت",
    badgeFa: "ضمانت اصالت",
    rating: 4.8,
    deliveryTimeFa: "۳ ساعت",
    logoEmoji: "🏬",
  },
  {
    id: "seller-dr-rad",
    nameFa: "داروخانه دکتر راد",
    subtitleFa: "مکمل و داروی تخصصی",
    badgeFa: "داروخانه رسمی",
    rating: 4.9,
    deliveryTimeFa: "۴ ساعت",
    logoEmoji: "💊",
  },
  {
    id: "seller-mirdamad",
    nameFa: "پت رویال میرداماد",
    subtitleFa: "تخفیف‌های هفتگی",
    badgeFa: "تخفیف شگفت‌انگیز",
    rating: 4.7,
    deliveryTimeFa: "۲ ساعت",
    logoEmoji: "🎪",
  },
  {
    id: "seller-bonnivo-hub",
    nameFa: "انبار مرکزی بونیو",
    subtitleFa: "پخش عمده و خرده مستقیم",
    badgeFa: "ارسال مستقیم",
    rating: 5.0,
    deliveryTimeFa: "امروز",
    logoEmoji: "📦",
  },
];

export function ShopTopStoresRow() {
  return (
    <div className="space-y-3" dir="rtl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Store className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <h3 className="text-sm sm:text-base font-black text-foreground">
            برترین پت‌شاپ‌های همکار بونیو
          </h3>
        </div>
        <span className="text-xs text-stone-400 font-medium">ارسال مستقیم از معتبرترین فروشگاه‌ها</span>
      </div>

      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 pt-1 px-1 -mx-1 snap-x touch-pan-x">
        {TOP_STORES.map((store) => (
          <div
            key={store.id}
            className="w-[155px] sm:w-[175px] shrink-0 snap-start p-3 rounded-2xl bg-surface border border-border/80 hover:border-emerald-500/50 hover:shadow-md transition-all duration-200 flex flex-col justify-between select-none group"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/50 dark:border-emerald-800/40 flex items-center justify-center text-xl shadow-2xs group-hover:scale-105 transition-transform">
                {store.logoEmoji}
              </div>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                {store.deliveryTimeFa}
              </span>
            </div>

            <div>
              <h4 className="text-xs font-bold text-foreground truncate group-hover:text-emerald-600 transition-colors">
                {store.nameFa}
              </h4>
              <p className="text-[10px] text-stone-400 truncate mt-0.5">
                {store.subtitleFa}
              </p>
            </div>

            <div className="mt-2.5 pt-2 border-t border-border/50 flex items-center justify-between text-[10px]">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-0.5">
                <Zap className="w-3 h-3" />
                {store.badgeFa}
              </span>
              <span className="font-mono text-stone-500 font-bold">
                ⭐ {store.rating.toLocaleString("fa-IR")}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
