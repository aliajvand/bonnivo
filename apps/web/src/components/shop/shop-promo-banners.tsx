"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, ArrowLeft, Clock, ShieldCheck, Flame } from "lucide-react";

export function ShopPromoBanners() {
  const [activeSlide, setActiveSlide] = useState(0);

  const BANNERS = [
    {
      id: "promo-1",
      badge: "تخفیف شگفت‌انگیز پاییزه",
      title: "تا ۳۰٪ تخفیف روی غذای خشک و مکمل‌های وارداتی",
      desc: "تضمین کمترین قیمت در جعبه خرید (Buy Box) + ارسال اکسپرس ۳ ساعته در تهران",
      cta: "مشاهده تخفیف‌ها",
      link: "#deals",
      gradient: "from-emerald-800 via-teal-900 to-stone-900",
      accent: "bg-amber-400 text-stone-950",
      emoji: "🍖",
    },
    {
      id: "promo-2",
      badge: "پیشنهاد اختصاصی اعضای بونیو",
      title: "ارسال رایگان برای تمام خریدهای بالای ۶۰۰ هزار تومان",
      desc: "مستقیم از انبارهای مرکزی نیاوران، میرداماد و سعادت‌آباد",
      cta: "خرید فوری",
      link: "#bestsellers",
      gradient: "from-stone-900 via-emerald-950 to-stone-900",
      accent: "bg-emerald-400 text-stone-950",
      emoji: "⚡",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % BANNERS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [BANNERS.length]);

  const current = BANNERS[activeSlide];

  return (
    <div className="relative rounded-3xl sm:rounded-4xl overflow-hidden shadow-lg select-none" dir="rtl">
      <div className={`p-5 sm:p-8 bg-gradient-to-r ${current.gradient} text-white transition-all duration-700 relative`}>
        {/* Ambient background decoration */}
        <div className="absolute top-0 end-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -start-10 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black shadow-xs bg-white/15 backdrop-blur-md border border-white/20">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>{current.badge}</span>
            </div>

            <h2 className="text-lg sm:text-2xl font-black tracking-tight leading-snug">
              {current.title}
            </h2>

            <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
              {current.desc}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden sm:flex text-5xl">
              {current.emoji}
            </div>

            <a
              href={current.link}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black shadow-md transition-transform hover:scale-105 active:scale-95 ${current.accent}`}
            >
              <span>{current.cta}</span>
              <ArrowLeft className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Carousel Dots */}
        <div className="flex items-center gap-1.5 justify-center mt-4">
          {BANNERS.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeSlide === idx ? "w-6 bg-white" : "w-1.5 bg-white/40"
              }`}
              aria-label={`اسلاید ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
