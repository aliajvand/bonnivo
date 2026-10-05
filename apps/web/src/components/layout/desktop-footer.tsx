"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BonyoLogo } from "@/components/brand/bonyo-logo";
import {
  ShieldCheck,
  Phone,
  Mail,
  Heart,
  Send,
  Check,
  Headphones,
  CreditCard,
  Truck
} from "lucide-react";

export function DesktopFooter() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setNewsletterEmail("");
    }
  };

  return (
    <footer className="mt-14 border-t border-emerald-950/80 bg-gradient-to-b from-[#0A1A13] via-[#07130E] to-[#040907] text-stone-300 relative overflow-hidden select-none" dir="rtl">
      {/* Subtle Ambient Emerald Backlight */}
      <div className="absolute top-0 start-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 md:pt-14 pb-32 md:pb-16 relative z-10">
        
        {/* Top Feature Trust Strip (Mobile & Desktop) */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 pb-8 mb-8 border-b border-emerald-950/70 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 p-2 rounded-xl bg-white/[0.03] border border-white/5">
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0" />
            <span className="text-[10px] sm:text-xs font-bold text-stone-200">ضمانت اصالت ۱۰۰٪</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 p-2 rounded-xl bg-white/[0.03] border border-white/5">
            <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0" />
            <span className="text-[10px] sm:text-xs font-bold text-stone-200">ارسال اکسپرس شهری</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 p-2 rounded-xl bg-white/[0.03] border border-white/5">
            <Headphones className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0" />
            <span className="text-[10px] sm:text-xs font-bold text-stone-200">پشتیبانی شبانه‌روزی</span>
          </div>
        </div>

        {/* Main Grid: Brand + 2-Col Mobile Links + Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          
          {/* Brand & Mission (2 cols on Desktop) */}
          <div className="lg:col-span-2 space-y-4">
            <BonyoLogo variant="horizontal" size="md" themeMode="dark" showSubtitle={false} />
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-sm mt-2 font-light">
              بنیوو، اکوسیستم یکپارچه سرپرستی، سلامت و خرید ملزومات پت در ایران. دسترسی فوری به بهترین پت‌شاپ‌ها، پرونده پزشکی ابری و متخصصین معتمد.
            </p>

            {/* Quick Contact Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <a
                href="tel:02191015566"
                className="inline-flex items-center gap-2 py-2 px-3 rounded-xl bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 text-xs font-bold hover:bg-emerald-900/60 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-mono" dir="ltr">۰۲۱-۹۱۰۱۵۵۶۶</span>
              </a>

              <a
                href="mailto:support@bonnivo.ir"
                className="inline-flex items-center gap-2 py-2 px-3 rounded-xl bg-white/5 border border-white/10 text-stone-300 text-xs font-medium hover:bg-white/10 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-stone-400" />
                <span className="font-mono">support@bonnivo.ir</span>
              </a>
            </div>
          </div>

          {/* Mobile: 2-Column Side-by-side Links Matrix | Desktop: Columns 3 & 4 */}
          <div className="grid grid-cols-2 gap-4 lg:contents">
            {/* Nav Column 1: Services */}
            <div className="space-y-3">
              <h4 className="text-xs font-black tracking-wider text-white">خدمات اکوسیستم</h4>
              <ul className="space-y-2 text-xs text-stone-400">
                <li>
                  <Link href="/shop" className="hover:text-emerald-300 transition-colors">
                    فروشگاه و غذای پت
                  </Link>
                </li>
                <li>
                  <Link href="/vets" className="hover:text-emerald-300 transition-colors">
                    دامپزشکی و اورژانس
                  </Link>
                </li>
                <li>
                  <Link href="/trainers" className="hover:text-emerald-300 transition-colors">
                    مربیان رفتارشناسی
                  </Link>
                </li>
                <li>
                  <Link href="/boarding" className="hover:text-emerald-300 transition-colors">
                    پانسیون و ریزورت هتل
                  </Link>
                </li>
                <li>
                  <Link href="/events" className="hover:text-emerald-300 transition-colors">
                    رویدادها و دورهمی‌ها
                  </Link>
                </li>
              </ul>
            </div>

            {/* Nav Column 2: Pet Owners / Guide */}
            <div className="space-y-3">
              <h4 className="text-xs font-black tracking-wider text-white">راهنمای سرپرستان</h4>
              <ul className="space-y-2 text-xs text-stone-400">
                <li>
                  <Link href="/dashboard/pets" className="hover:text-emerald-300 transition-colors">
                    شناسنامه ابری پت
                  </Link>
                </li>
                <li>
                  <Link href="/cart" className="hover:text-emerald-300 transition-colors">
                    سبد خرید و سفارشات
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-emerald-300 transition-colors">
                    حفظ حریم خصوصی
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-emerald-300 transition-colors">
                    شرایط استفاده
                  </Link>
                </li>
                <li>
                  <Link href="/return-policy" className="hover:text-emerald-300 transition-colors">
                    شرایط بازگشت کالا
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 3: Sleek Inline Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs font-black tracking-wider text-white">خبرنامه تخصصی</h4>
            <p className="text-xs text-stone-400 leading-relaxed font-light">
              تازه‌ترین نکات سلامت، تخفیف‌های هفتگی و رویدادهای فصلی را دریافت کنید.
            </p>

            <form onSubmit={handleSubscribe} className="relative flex items-center rounded-xl bg-white/5 border border-white/10 p-1 focus-within:border-emerald-500/80 transition-colors">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="ایمیل خود را وارد کنید..."
                className="w-full bg-transparent px-3 py-1.5 text-xs text-white placeholder:text-stone-500 focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                {subscribed ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  <>
                    <Send className="w-3 h-3" />
                    <span>عضویت</span>
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-5 border-t border-emerald-950/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-400">
          <div className="flex items-center gap-1.5 text-center">
            <span>توسعه‌یافته با</span>
            <Heart className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500 inline shrink-0" />
            <span>برای ارتقای کیفیت زندگی حیوانات خانگی ایران • تمامی حقوق محفوظ است.</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-stone-400">
            <span>نسخه ۳.۰.۰</span>
            <span>•</span>
            <span className="text-emerald-400 font-bold">بنیوو | Bonnivo</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
