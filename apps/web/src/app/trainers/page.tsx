"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  GraduationCap,
  Star,
  ShieldCheck,
  MapPin,
  CalendarCheck,
  Sparkles,
  Heart,
  Award,
  CheckCircle2,
  Clock,
  ChevronLeft,
} from "lucide-react";
import { FeatureFlagGuard } from "@/components/common/feature-flag-guard";
import { FeaturedPromoBanner } from "@/components/ui/featured-promo-banner";
import { PhotoDock, PhotoDockItem } from "@/components/ui/photo-dock";
import { BenefitGrid, BenefitItem } from "@/components/ui/benefit-grid";
import { cn } from "@/lib/utils";

const TRAINER_SPECIALTIES_DOCK: (PhotoDockItem & { specialtyKey: string })[] = [
  {
    id: "spec-basic",
    label: "فرمان‌های پایه",
    imageSrc: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=400&q=80",
    href: "#trainers-list",
    specialtyKey: "پایه",
  },
  {
    id: "spec-leash",
    label: "همقدم با قلاده",
    imageSrc: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=400&q=80",
    href: "#trainers-list",
    specialtyKey: "همقدم",
  },
  {
    id: "spec-anxiety",
    label: "رفع اضطراب",
    imageSrc: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=400&q=80",
    href: "#trainers-list",
    specialtyKey: "اضطراب",
    badge: "مهم",
  },
  {
    id: "spec-potty",
    label: "جای دستشویی",
    imageSrc: "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=400&q=80",
    href: "#trainers-list",
    specialtyKey: "دستشویی",
  },
  {
    id: "spec-puppy",
    label: "تربیت توله‌ها",
    imageSrc: "https://images.unsplash.com/photo-1591160690555-5debfba289f0?auto=format&fit=crop&w=400&q=80",
    href: "#trainers-list",
    specialtyKey: "توله‌ها",
  },
  {
    id: "spec-social",
    label: "مهارت اجتماعی",
    imageSrc: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=400&q=80",
    href: "#trainers-list",
    specialtyKey: "اجتماعی",
  },
  {
    id: "spec-aggression",
    label: "اصلاح پرخاش",
    imageSrc: "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=400&q=80",
    href: "#trainers-list",
    specialtyKey: "پرخاشگرانه",
  },
  {
    id: "spec-guard",
    label: "سگ‌های کار",
    imageSrc: "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?auto=format&fit=crop&w=400&q=80",
    href: "#trainers-list",
    specialtyKey: "کار",
  },
];

const TRAINER_BENEFITS: BenefitItem[] = [
  {
    id: "tb-1",
    title: "متدهای ۱۰۰٪ تشویقی R+",
    description: "آموزش علمی بدون تنبیه بدنی، خفه‌کن و شوک، مبتنی بر تقویت مثبت رفتار و ارتباط عاطفی",
    icon: Heart,
    badge: "علمی",
    theme: "blue",
  },
  {
    id: "tb-2",
    title: "اعزام مستقیم مربی به محل",
    description: "تمرین در محیط واقعی زندگی پت (منزل، راه‌پله و پارک محله شما) برای تثبیت قطعی رفتار",
    icon: MapPin,
    badge: "حضوری",
    theme: "emerald",
  },
  {
    id: "tb-3",
    title: "مربیان تاییدصلاحیت‌شده",
    description: "دارای گواهی‌نامه بین‌المللی مربیگری، ارزیابی سوءپیشینه و آزمون‌های عملی نظام دامپزشکی",
    icon: Award,
    badge: "معتبر",
    theme: "amber",
  },
  {
    id: "tb-4",
    title: "پشتیبانی و ثبت در شناسنامه",
    description: "ثبت دوره‌های گذرانده‌شده در پرونده هوشمند پت به همراه ویدیوهای یادآوری هفتگی تمرینات",
    icon: ShieldCheck,
    badge: "هوشمند",
    theme: "purple",
  },
];

export default function TrainersPage() {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("همه");

  const trainers = [
    {
      id: "tr-1",
      name: "استاد پوریا شایان",
      specialty: "اصلاح رفتارهای پرخاشگرانه، پارس در آپارتمان و اضطراب جدایی",
      experience: "۱۲ سال سابقه بین‌المللی",
      rating: 4.9,
      reviewCount: 78,
      location: "تهران، سعادت‌آباد، شهرک غرب و نیاوران (اعزام به محل)",
      price: "جلسه‌ای ۸۵۰,۰۰۰ تومان",
      photo: "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=800&q=80",
      badges: ["رفتارشناس ارشد", "متد تشویقی R+"],
    },
    {
      id: "tr-2",
      name: "مهندس نسترن فراهانی",
      specialty: "آموزش مقدماتی، همقدم بدون کشش، جای دستشویی و فرامین پایه‌ای توله‌ها",
      experience: "۷ سال سابقه حرفه‌ای",
      rating: 4.8,
      reviewCount: 45,
      location: "تهران، پاسداران، ولنجک و یوسف‌آباد",
      price: "جلسه‌ای ۶۵۰,۰۰۰ تومان",
      photo: "https://images.unsplash.com/photo-1591160690555-5debfba289f0?auto=format&fit=crop&w=800&q=80",
      badges: ["متخصص توله‌ها", "مربی رسمی فدراسیون"],
    },
    {
      id: "tr-3",
      name: "دکتر حامد توکلی",
      specialty: "تربیت سگ‌های کار، جستجو، دفاع شهری و رفتاردرمانی استرس شدید",
      experience: "۱۵ سال سابقه درخشان",
      rating: 5.0,
      reviewCount: 110,
      location: "تهران و حومه (میدان ونک و انقلاب)",
      price: "جلسه‌ای ۱,۲۰۰,۰۰۰ تومان",
      photo: "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?auto=format&fit=crop&w=800&q=80",
      badges: ["دکتری رفتارشناسی", "داور مسابقات کاری"],
    },
  ];

  const filteredTrainers = trainers.filter((tr) => {
    if (selectedSpecialty === "همه") return true;
    return tr.specialty.includes(selectedSpecialty);
  });

  return (
    <FeatureFlagGuard
      moduleKey="trainers"
      moduleTitleFa="مربیان و رفتارشناسی پت"
      descriptionFa="شبکه مربیان تخصصی بونیو پس از تکمیل ارزیابی‌های میدانی و تاییدیه رسمی فدراسیون فعال خواهد شد."
    >
      <div className="w-full py-4 sm:py-6 space-y-8 select-none" dir="rtl">
        
        {/* 1. Header Promo Banner using FeaturedPromoBanner */}
        <FeaturedPromoBanner
          imageSrc="https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1200&q=80"
          imageAlt="آموزش و تربیت علمی حیوانات خانگی بونیو"
          badge={{
            text: "شبکه مربیان و رفتارشناسان معتمد بونیو",
            pulse: true,
          }}
          meta={[
            { text: "متد ۱۰۰٪ تشویقی و بدون خشونت", icon: Heart },
            { text: "اعزام مستقیم به محل زندگی شما", icon: MapPin },
            { text: "تضمین رضایت و پیگیری هفتگی", icon: ShieldCheck },
          ]}
          title="آموزش، تربیت و اصلاح رفتار علمی حیوانات خانگی"
          description="دسترسی به مربیان تاییدصلاحیت‌شده برای دوره‌های همقدم، آموزش جای دستشویی، رفع اضطراب جدایی آپارتمانی و همزیستی شاد با پت."
          primaryCta={{
            label: "مشاهده مربیان برتر",
            href: "#trainers-list",
          }}
          secondaryCta={{
            label: "پرونده سلامت و رفتار پت",
            href: "/dashboard/care",
          }}
          note="مشاوره اولیه تلفنی با مربی رایگان است"
          colorTheme="blue"
        />

        {/* 2. Specialties Photo Dock */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-sm font-black text-foreground">
                دوره‌های تخصصی و حوزه‌های رفتاری
              </h2>
              <span className="text-[11px] text-stone-500 font-light">
                کلیک برای مشاهده مربیان متخصص در هر حوزه
              </span>
            </div>

            <div className="w-full max-w-5xl mx-auto select-none" dir="rtl">
              <div className="rounded-3xl p-3 sm:p-4 bg-white/95 dark:bg-[#0c1813]/95 backdrop-blur-2xl border border-stone-200/90 dark:border-emerald-950/80 shadow-lg">
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5 sm:gap-3.5">
                  {TRAINER_SPECIALTIES_DOCK.map((item) => {
                    const isSelected = selectedSpecialty === item.specialtyKey;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setSelectedSpecialty(isSelected ? "همه" : item.specialtyKey);
                        }}
                        className={cn(
                          "flex flex-col items-center justify-center p-1.5 sm:p-2 rounded-2xl transition-all duration-300 group active:scale-95 cursor-pointer",
                          isSelected
                            ? "bg-sky-600/10 text-sky-700 dark:text-sky-300 font-black scale-105"
                            : "hover:bg-sky-50/50 dark:hover:bg-stone-800/50 text-stone-700 dark:text-stone-300"
                        )}
                      >
                        <div
                          className={cn(
                            "relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden shadow-xs ring-2 transition-all duration-300 group-hover:scale-105 bg-stone-100 dark:bg-stone-800",
                            isSelected
                              ? "ring-sky-600 shadow-md shadow-sky-500/25 ring-offset-2"
                              : "ring-stone-200 dark:ring-stone-700 group-hover:ring-sky-500/80"
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
                            <span className="absolute top-1 start-1 bg-sky-600 text-white text-[9px] font-black rounded-full px-1.5 py-0.5">
                              {item.badge}
                            </span>
                          )}
                        </div>

                        <span
                          className={cn(
                            "text-[11px] sm:text-xs font-bold truncate text-center w-full mt-1.5 transition-colors",
                            isSelected
                              ? "text-sky-700 dark:text-sky-400 font-black"
                              : "group-hover:text-sky-700 dark:group-hover:text-sky-400 text-stone-800 dark:text-stone-200"
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

        {/* 3. Trainers List Grid */}
        <section id="trainers-list" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-sky-600 dark:text-sky-400" />
              <h2 className="text-base font-black text-foreground">لیست مربیان مجرب و دارای مجوز</h2>
            </div>
            {selectedSpecialty !== "همه" && (
              <button
                type="button"
                onClick={() => setSelectedSpecialty("همه")}
                className="text-xs text-sky-600 dark:text-sky-400 font-bold hover:underline"
              >
                نمایش همه مربیان
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredTrainers.map((tr) => (
              <div
                key={tr.id}
                className="group rounded-3xl p-5 bg-white dark:bg-[#0f1d17] border border-stone-200/90 dark:border-sky-950/80 hover:border-sky-500/60 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Photo & Top Rating Bar */}
                  <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-800">
                    <Image
                      src={tr.photo}
                      alt={tr.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                    <div className="absolute top-3 end-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xs text-white text-[10px] font-black flex items-center gap-1 border border-white/20">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{tr.rating}</span>
                      <span className="text-stone-300">({tr.reviewCount})</span>
                    </div>

                    <div className="absolute bottom-3 start-3 px-2.5 py-0.5 rounded-lg bg-sky-600/90 backdrop-blur-xs text-white text-xs font-bold">
                      {tr.experience}
                    </div>
                  </div>

                  {/* Title & Specialties */}
                  <div>
                    <h3 className="text-base font-black text-foreground group-hover:text-sky-700 dark:group-hover:text-sky-400 transition-colors">
                      {tr.name}
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 line-clamp-2 font-light leading-relaxed">
                      {tr.specialty}
                    </p>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {tr.badges.map((b, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 text-[10px] font-bold border border-sky-200/50 dark:border-sky-800/40"
                      >
                        {b}
                      </span>
                    ))}
                  </div>

                  {/* Location & Price */}
                  <div className="pt-2 border-t border-stone-200/80 dark:border-stone-800/80 space-y-1.5 text-xs text-stone-600 dark:text-stone-300">
                    <div className="flex items-center gap-1.5 text-[11px]">
                      <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span className="truncate">{tr.location}</span>
                    </div>
                    <div className="flex items-center justify-between font-bold text-foreground pt-1">
                      <span className="text-[11px] text-stone-500">دستمزد هر جلسه:</span>
                      <span className="font-mono text-emerald-600 dark:text-emerald-400 text-xs font-black">
                        {tr.price}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Booking CTA Button */}
                <div className="pt-4 mt-4 border-t border-stone-200/80 dark:border-stone-800/80">
                  <Link
                    href={`/trainers/${tr.id}`}
                    className="w-full py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 active:scale-95 text-white text-xs font-bold text-center shadow-md shadow-sky-600/20 transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>رزرو وقت و مشاوره تلفنی</span>
                    <ChevronLeft className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Benefits Grid using BenefitGrid */}
        <BenefitGrid
          items={TRAINER_BENEFITS}
          title="مزایای آموزش سگ با مربیان معتمد بونیو"
          subtitle="تربیت علمی، آرامش روانی پت و تجربه همزیستی لذت‌بخش در آپارتمان و فضای شهری"
          columns={4}
          className="pt-8"
        />

      </div>
    </FeatureFlagGuard>
  );
}
