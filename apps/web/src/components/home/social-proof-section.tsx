"use client";

import React, { useState, useEffect, useRef } from "react";
import { Star, ShieldCheck, CheckCircle, Quote, ChevronRight, ChevronLeft } from "lucide-react";

interface ReviewItem {
  id: string;
  author: string;
  petInfo: string;
  text: string;
  rating: number;
  productOrService: string;
}

const REVIEWS: ReviewItem[] = [
  {
    id: "rev-1",
    author: "فرناز موسوی",
    petInfo: "سرپرست میلو (گربه بریتیش)",
    text: "خرید غذای رویال کنین با تضمین اصالت و تحویل دقیق در بازه ۳ ساعته در نیاوران. بسته‌بندی عالی و پشتیبانی فوق‌العاده سریع بود.",
    rating: 5,
    productOrService: "خرید غذای تخصصی گربه",
  },
  {
    id: "rev-2",
    author: "امیرحسین رضایی",
    petInfo: "سرپرست تدی (پامرانین)",
    text: "رزرو آنلاین بیمارستان پایتخت در شب تعطیل جان تدی رو نجات داد. بدون معطلی و با دسترسی کامل دکتر به پرونده آنلاین واکسن‌ها.",
    rating: 5,
    productOrService: "نوبت اورژانس دامپزشکی",
  },
  {
    id: "rev-3",
    author: "سارا کریمی",
    petInfo: "سرپرست بارفی (هاسکی)",
    text: "جلسه اصلاح رفتار با استاد شایان عالی بود. مشکل پارس آپارتمانی بارفی در دو جلسه با روش تشویقی کاملاً برطرف شد.",
    rating: 5,
    productOrService: "آموزش و اصلاح رفتار",
  },
  {
    id: "rev-4",
    author: "دکتر مهران کاظمی",
    petInfo: "سرپرست کوکو و لئو (ژرمن و ژپیز)",
    text: "پت‌هتل آرمانی رو برای سفر ۵ روزه انتخاب کردیم. ارسال ویدیوهای روزانه و رسیدگی غذایی دقیق آرامش خیال کامل بهمون داد.",
    rating: 5,
    productOrService: "پانسیون و ریزورت هتل",
  },
];

export function SocialProofSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-advance timer (every 4 seconds) on mobile/desktop
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % REVIEWS.length;
        if (scrollContainerRef.current) {
          const container = scrollContainerRef.current;
          const cardWidth = container.offsetWidth > 640 ? 340 : container.offsetWidth * 0.85;
          container.scrollTo({
            left: -(next * cardWidth),
            behavior: "smooth",
          });
        }
        return next;
      });
    }, 4200);

    return () => clearInterval(timer);
  }, [isPaused]);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cardWidth = container.offsetWidth > 640 ? 340 : container.offsetWidth * 0.85;
    const scrollLeft = Math.abs(container.scrollLeft);
    const newIdx = Math.round(scrollLeft / cardWidth);
    if (newIdx >= 0 && newIdx < REVIEWS.length && newIdx !== activeIndex) {
      setActiveIndex(newIdx);
    }
  };

  const scrollToIndex = (index: number) => {
    setActiveIndex(index);
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.offsetWidth > 640 ? 340 : container.offsetWidth * 0.85;
      container.scrollTo({
        left: -(index * cardWidth),
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full select-none" dir="rtl">
      <div className="space-y-5">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
              تجربه واقعی سرپرستان پت بنیوو
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-0.5 font-light">
              رضایت بیش از ۲۴,۰۰۰ سرپرست با امتیاز رضایت ۹۸.۴٪
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-200/50">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>نظرات ۱۰۰٪ تاییدشده خریداران</span>
            </span>

            {/* Carousel navigation indicators */}
            <div className="flex items-center gap-1.5 mr-2">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => scrollToIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeIndex === i
                      ? "w-6 bg-emerald-600 dark:bg-emerald-400"
                      : "w-2 bg-stone-300 dark:bg-stone-700 hover:bg-stone-400"
                  }`}
                  aria-label={`دیدگاه ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Side-by-side Horizontal Scrollable Track with Auto-advance Timer */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setTimeout(() => setIsPaused(false), 3000)}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="flex gap-3.5 sm:gap-4 overflow-x-auto pb-4 pt-1 -mx-1 px-1 no-scrollbar snap-x snap-mandatory"
        >
          {REVIEWS.map((rev, idx) => {
            const isActive = activeIndex === idx;
            return (
              <div
                key={rev.id}
                className="w-[82vw] sm:w-[340px] md:w-[380px] shrink-0 snap-center transition-all duration-300"
              >
                <div
                  className={`h-full rounded-3xl p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-4 border transition-all duration-300 ${
                    isActive
                      ? "bg-surface border-emerald-600/40 shadow-md scale-[1.01]"
                      : "bg-surface/80 border-border/70 opacity-90 hover:opacity-100"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-amber-500">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                        ))}
                      </div>
                      <span className="text-[10px] text-muted-foreground font-light bg-stone-100 dark:bg-stone-800/80 px-2 py-0.5 rounded-full">
                        {rev.productOrService}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-light">
                      «{rev.text}»
                    </p>
                  </div>

                  <div className="pt-3 border-t border-border/50 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-foreground">
                        {rev.author}
                      </h4>
                      <span className="text-[11px] text-muted-foreground font-light">
                        {rev.petInfo}
                      </span>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
