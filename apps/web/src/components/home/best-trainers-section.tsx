"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, MapPin, ArrowLeft, ShieldCheck, Award } from "lucide-react";
import { Button } from "@/ui/button";

interface TrainerCardItem {
  id: string;
  name: string;
  specialty: string;
  city: string;
  district: string;
  rating: number;
  reviewCount: number;
  price: string;
  image: string;
}

const TRAINERS: TrainerCardItem[] = [
  {
    id: "tr-1",
    name: "استاد پوریا شایان",
    specialty: "اصلاح رفتارهای پرخاشگرانه و ناهنجاری‌ها",
    city: "تهران",
    district: "سعادت‌آباد و غرب",
    rating: 4.9,
    reviewCount: 78,
    price: "جلسه‌ای ۸۵۰,۰۰۰ تومان",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "tr-2",
    name: "مهندس نسترن فراهانی",
    specialty: "آموزش مقدماتی، همقدم و فرامین پایه‌ای",
    city: "تهران",
    district: "پاسداران و نیاوران",
    rating: 4.8,
    reviewCount: 45,
    price: "جلسه‌ای ۶۵۰,۰۰۰ تومان",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "tr-3",
    name: "دکتر حامد توکلی",
    specialty: "تربیت سگ‌های کار و اضطراب جدایی",
    city: "تهران",
    district: "میدان ونک و مرکز",
    rating: 5.0,
    reviewCount: 110,
    price: "جلسه‌ای ۱,۲۰۰,۰۰۰ تومان",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
  },
];

export function BestTrainersSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full select-none" dir="rtl">
      <div className="space-y-5">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
              مربی‌های منتخب بنیوو
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-0.5 font-light">
              متخصصین تاییدصلاحیت‌شده رفتارشناسی با متدهای تشویقی و اعزام به محل
            </p>
          </div>

          <Link
            href="/trainers"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-700 dark:text-emerald-400 hover:opacity-80 transition-opacity self-start sm:self-auto"
          >
            <span>همه مربیان</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        {/* Compact Trainer Cards matching Product Card scale, horizontally scrollable on mobile */}
        <div className="flex md:grid md:grid-cols-3 gap-3.5 sm:gap-4 overflow-x-auto md:overflow-x-visible pb-3 pt-1 -mx-1 px-1 md:mx-0 md:px-0 no-scrollbar snap-x snap-mandatory">
          {TRAINERS.map((trainer) => (
            <div
              key={trainer.id}
              className="w-[230px] sm:w-[260px] md:w-auto shrink-0 md:shrink snap-start"
            >
              <Link
                href={`/trainers/${trainer.id}`}
                className="block h-full rounded-3xl bg-surface border border-border/80 overflow-hidden hover:border-emerald-600/40 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Photo matching product card aspect video */}
                <div className="relative w-full aspect-video overflow-hidden bg-stone-100 dark:bg-stone-900">
                  <Image
                    src={trainer.image}
                    alt={trainer.name}
                    fill
                    sizes="(max-width: 768px) 260px, 33vw"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-2 inset-x-2 flex items-center justify-between z-10 text-[10px]">
                    <span className="flex items-center gap-1 font-bold text-white bg-emerald-600/90 backdrop-blur-md px-2 py-0.5 rounded-full shadow-xs">
                      <ShieldCheck className="w-3 h-3 text-white" />
                      <span>تایید بونیو</span>
                    </span>
                    <span className="flex items-center gap-1 font-bold text-amber-300 bg-black/65 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span>{trainer.rating.toLocaleString("fa-IR")}</span>
                    </span>
                  </div>

                  {/* Name on image base */}
                  <div className="absolute bottom-2 inset-x-3 z-10 text-white">
                    <h3 className="font-black text-xs sm:text-sm truncate">
                      {trainer.name}
                    </h3>
                    <div className="flex items-center gap-1 text-[10px] text-stone-200">
                      <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span className="truncate">{trainer.city}، {trainer.district}</span>
                    </div>
                  </div>
                </div>

                {/* Info & Price */}
                <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-2.5">
                  <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed font-light">
                    {trainer.specialty}
                  </p>

                  <div className="pt-2 border-t border-border/50 space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-muted-foreground">شهریه جلسه:</span>
                      <span className="font-bold text-foreground">{trainer.price}</span>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-xs font-bold"
                      rightIcon={<Award className="w-3.5 h-3.5 text-amber-600" />}
                    >
                      مشاهده پروفایل
                    </Button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
