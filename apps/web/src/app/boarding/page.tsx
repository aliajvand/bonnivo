"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Home, 
  Camera, 
  HeartPulse, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  Calendar, 
  Sun, 
  Waves,
  Bath
} from "lucide-react";
import { FeatureFlagGuard } from "@/components/common/feature-flag-guard";
import { BoardingCard } from "@/cards/boarding-card";
import { FeaturedPromoBanner } from "@/components/ui/featured-promo-banner";
import { PhotoDock, PhotoDockItem } from "@/components/ui/photo-dock";
import { BenefitGrid, BenefitItem } from "@/components/ui/benefit-grid";
import { cn } from "@/lib/utils";

const BOARDING_PHOTO_DOCK: (PhotoDockItem & { amenityKey: string })[] = [
  {
    id: "amen-vip",
    label: "سوئیت VIP",
    imageSrc: "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=400&q=80",
    href: "#boarding-list",
    amenityKey: "VIP",
    badge: "لوکس",
  },
  {
    id: "amen-cam",
    label: "دوربین آنلاین",
    imageSrc: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=400&q=80",
    href: "#boarding-list",
    amenityKey: "دوربین",
    badge: "۲۴h",
  },
  {
    id: "amen-cat",
    label: "پانسیون گربه",
    imageSrc: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80",
    href: "#boarding-list",
    amenityKey: "گربه",
  },
  {
    id: "amen-grass",
    label: "زمین چمن",
    imageSrc: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=400&q=80",
    href: "#boarding-list",
    amenityKey: "چمن",
  },
  {
    id: "amen-pool",
    label: "استخر آب‌بازی",
    imageSrc: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=400&q=80",
    href: "#boarding-list",
    amenityKey: "استخر",
  },
  {
    id: "amen-vet",
    label: "دامپزشک مقیم",
    imageSrc: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=400&q=80",
    href: "#boarding-list",
    amenityKey: "دامپزشک",
  },
  {
    id: "amen-daycare",
    label: "مهدکودک روزانه",
    imageSrc: "https://images.unsplash.com/photo-1591160690555-5debfba289f0?auto=format&fit=crop&w=400&q=80",
    href: "#boarding-list",
    amenityKey: "مهدکودک",
  },
  {
    id: "amen-spa",
    label: "اسپا و گرومینگ",
    imageSrc: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=400&q=80",
    href: "#boarding-list",
    amenityKey: "اسپا",
  },
];

const BOARDING_BENEFITS: BenefitItem[] = [
  {
    id: "bb-1",
    title: "دوربین زنده اختصاصی برای سرپرست",
    description: "امکان مشاهده وضعیت پت در هر ساعت از شبانه‌روز از طریق اپلیکیشن با اتصال امن و باکیفیت",
    icon: Camera,
    badge: "زنده",
    theme: "amber",
  },
  {
    id: "bb-2",
    title: "حضور مقیم و پایش مداوم دامپزشکی",
    description: "ویزیت روزانه وضعیت عمومی، چکاب اشتها و آمادگی رسیدگی به موارد نیازمند داروی خاص",
    icon: HeartPulse,
    badge: "پزشکی",
    theme: "emerald",
  },
  {
    id: "bb-3",
    title: "تغذیه مطابق عادت غذایی منزل",
    description: "سرو وعده‌های غذایی با همان برند و طعمی که پت شما در خانه دوست دارد بدون تغییر جیره",
    icon: Sparkles,
    badge: "تغذیه",
    theme: "blue",
  },
  {
    id: "bb-4",
    title: "سوئیت‌های عایق صدا و دما",
    description: "تهویه مطبوع با فیلتراسیون ضدعفونی‌کننده هوا، دمای استاندارد و محیط آرام برای خواب شیرین",
    icon: Home,
    badge: "آرامش",
    theme: "purple",
  },
];

export default function BoardingPage() {
  const [selectedAmenity, setSelectedAmenity] = useState<string>("همه");

  const boardingPlaces = [
    {
      id: "board-1",
      name: "ریزورت هتل حیوانات خانگی آرمانی",
      location: "تهران، الهیه",
      rating: 4.9,
      reviewCount: 64,
      features: ["اتاق‌های اختصاصی با کنترل دما", "پایش تصویری ۲۴ ساعته اختصاصی سرپرست", "حضور مقیم دامپزشک", "فضای باز چمن طبیعی"],
      pricePerNight: "شبی ۹۵۰,۰۰۰ تومان",
    },
    {
      id: "board-2",
      name: "پانسیون تخصصی گربه‌های اشرافی پرشین",
      location: "تهران، شهرک غرب",
      rating: 4.8,
      reviewCount: 42,
      features: ["محیط بدون صدا و بدون سگ (کاملاً گربه‌محور)", "درخت‌های بازی چوبی و کمدهای لوکس", "تغذیه مطابق رژیم غذایی خانه"],
      pricePerNight: "شبی ۶۵۰,۰۰۰ تومان",
    },
    {
      id: "board-3",
      name: "باغ پانسیون و نگهداری سگ‌های مهرشهر",
      location: "البرز، مهرشهر",
      rating: 4.9,
      reviewCount: 88,
      features: ["استخر اختصاصی آب‌درمانی سگ‌ها", "زمین بازی ۲۰۰۰ متری محصور", "برنامه بازی و پیاده‌روی گروهی و انفرادی"],
      pricePerNight: "شبی ۸۰۰,۰۰۰ تومان",
    },
  ];

  return (
    <FeatureFlagGuard
      moduleKey="boarding"
      moduleTitleFa="پانسیون و هتل حیوانات خانگی"
      descriptionFa="خدمات رزرو آنلاین هتل و پانسیون حیوانات خانگی پس از پایان بازرسی‌های بهداشتی و میدانی مراکز همکار فعال خواهد شد."
    >
      <div className="w-full py-4 sm:py-6 space-y-8 select-none" dir="rtl">
        
        {/* 1. Header Promo Banner using FeaturedPromoBanner */}
        <FeaturedPromoBanner
          imageSrc="https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=1200&q=80"
          imageAlt="نگهداری و هتل اقامت امن حیوانات خانگی بونیو"
          badge={{
            text: "هتل‌ها و اقامتگاه‌های لوکس و تاییدصلاحیت‌شده بونیو",
            pulse: true,
          }}
          meta={[
            { text: "دوربین آنلاین اختصاصی ۲۴ ساعته", icon: Camera },
            { text: "پایش سلامت توسط دامپزشک مقیم", icon: HeartPulse },
            { text: "سوئیت‌های اختصاصی با تهویه مطبوع", icon: Home },
          ]}
          title="نگهداری، پانسیون و هتل اقامت امن حیوانات خانگی"
          description="با خیالی آسوده به سفر بروید. تمام پانسیون‌های همکار بونیو مجهز به دوربین مداربسته آنلاین برای سرپرست، نظارت دامپزشکی، زمین بازی چمن و تغذیه خانگی هستند."
          primaryCta={{
            label: "مشاهده هتل‌ها و رزرو اقامت",
            href: "#boarding-list",
          }}
          secondaryCta={{
            label: "چکاپ مدارک و واکسن پت",
            href: "/dashboard/pets",
          }}
          note="پذیرش تنها با ارائه شناسنامه واکسیناسیون معتبر امکان‌پذیر است"
          colorTheme="amber"
        />

        {/* 2. Photo Dock for Hotel Amenities */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-sm font-black text-foreground">
                امکانات رفاهی و انواع سوئیت‌های اقامت
              </h2>
              <span className="text-[11px] text-stone-500 font-light">
                کلیک برای مشاهده اقامتگاه‌های دارای این ویژگی
              </span>
            </div>

            <div className="w-full max-w-5xl mx-auto select-none" dir="rtl">
              <div className="rounded-3xl p-3 sm:p-4 bg-white/95 dark:bg-[#0c1813]/95 backdrop-blur-2xl border border-stone-200/90 dark:border-emerald-950/80 shadow-lg">
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5 sm:gap-3.5">
                  {BOARDING_PHOTO_DOCK.map((item) => {
                    const isSelected = selectedAmenity === item.amenityKey;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setSelectedAmenity(isSelected ? "همه" : item.amenityKey);
                        }}
                        className={cn(
                          "flex flex-col items-center justify-center p-1.5 sm:p-2 rounded-2xl transition-all duration-300 group active:scale-95 cursor-pointer",
                          isSelected
                            ? "bg-amber-600/10 text-amber-700 dark:text-amber-300 font-black scale-105"
                            : "hover:bg-amber-50/50 dark:hover:bg-stone-800/50 text-stone-700 dark:text-stone-300"
                        )}
                      >
                        <div
                          className={cn(
                            "relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden shadow-xs ring-2 transition-all duration-300 group-hover:scale-105 bg-stone-100 dark:bg-stone-800",
                            isSelected
                              ? "ring-amber-600 shadow-md shadow-amber-500/25 ring-offset-2"
                              : "ring-stone-200 dark:ring-stone-700 group-hover:ring-amber-500/80"
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
                            <span className="absolute top-1 start-1 bg-amber-600 text-white text-[9px] font-black rounded-full px-1.5 py-0.5">
                              {item.badge}
                            </span>
                          )}
                        </div>

                        <span
                          className={cn(
                            "text-[11px] sm:text-xs font-bold truncate text-center w-full mt-1.5 transition-colors",
                            isSelected
                              ? "text-amber-700 dark:text-amber-400 font-black"
                              : "group-hover:text-amber-700 dark:group-hover:text-amber-400 text-stone-800 dark:text-stone-200"
                          )}
                        >
                          {item.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Boarding Places Grid */}
        <section id="boarding-list" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Home className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <h2 className="text-base font-black text-foreground">لیست اقامتگاه‌ها و هتل‌های تاییدشده</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {boardingPlaces.map((b) => (
              <BoardingCard
                key={b.id}
                id={b.id}
                nameFa={b.name}
                locationFa={b.location}
                rating={b.rating}
                reviewCount={b.reviewCount}
                pricePerNightText={b.pricePerNight}
                features={b.features}
              />
            ))}
          </div>
        </section>

        {/* 4. Benefits Grid using BenefitGrid */}
        <BenefitGrid
          items={BOARDING_BENEFITS}
          title="چرا اقامتگاه‌های بونیو را انتخاب کنیم؟"
          subtitle="استانداردهای بهداشتی سخت‌گیرانه، پایش ویدیویی زنده و نگهداری با عشق در فضایی شبیه به خانه"
          columns={4}
          className="pt-8"
        />

      </div>
    </FeatureFlagGuard>
  );
}
