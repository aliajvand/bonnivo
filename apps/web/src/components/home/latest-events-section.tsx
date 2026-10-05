"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, MapPin, ArrowLeft, Ticket } from "lucide-react";
import { Button } from "@/ui/button";

interface EventCardItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  priceText: string;
  isFree: boolean;
  category: string;
  image: string;
}

const EVENTS: EventCardItem[] = [
  {
    id: "ev-1",
    title: "دورهمی پاییزی سرپرستان نژاد گلدن و هاسکی",
    date: "۲۸ مهر ۱۴۰۳",
    time: "۱۶:۰۰ الی ۱۹:۰۰",
    location: "تهران، بوستان آب و آتش",
    priceText: "رایگان",
    isFree: true,
    category: "دورهمی و بازی",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "ev-2",
    title: "وبینار تخصصی تغذیه بالینی و بیماری‌های ادراری گربه‌ها",
    date: "۲ آبان ۱۴۰۳",
    time: "۱۹:۰۰ الی ۲۱:۰۰",
    location: "پخش زنده آنلاین در بونیو",
    priceText: "۱۵۰,۰۰۰ تومان",
    isFree: false,
    category: "وبینار پزشکی",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "ev-3",
    title: "کارگاه عملی آموزش همقدم و پیاده‌روی شهری بدون کشیدن قلاده",
    date: "۵ آبان ۱۴۰۳",
    time: "۱۰:۰۰ الی ۱۲:۳۰",
    location: "تهران، باشگاه ورزشی اکباتان",
    priceText: "۴۸۰,۰۰۰ تومان",
    isFree: false,
    category: "کارگاه رفتارشناسی",
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=600&q=80",
  },
];

export function LatestEventsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full select-none" dir="rtl">
      <div className="space-y-5">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
              آخرین رویدادها و دورهمی‌ها
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-0.5 font-light">
              کارگاه‌های آموزشی، وبینارهای تخصصی پزشکی و دورهمی‌های دوستانه حیوانات خانگی
            </p>
          </div>

          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-700 dark:text-emerald-400 hover:opacity-80 transition-opacity self-start sm:self-auto"
          >
            <span>همه رویدادها</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        {/* Compact Event Cards matching Product Card scale, horizontally scrollable on mobile */}
        <div className="flex md:grid md:grid-cols-3 gap-3.5 sm:gap-4 overflow-x-auto md:overflow-x-visible pb-3 pt-1 -mx-1 px-1 md:mx-0 md:px-0 no-scrollbar snap-x snap-mandatory">
          {EVENTS.map((ev) => (
            <div
              key={ev.id}
              className="w-[230px] sm:w-[260px] md:w-auto shrink-0 md:shrink snap-start"
            >
              <Link
                href={`/events/${ev.id}`}
                className="block h-full rounded-3xl bg-surface border border-border/80 overflow-hidden hover:border-emerald-600/40 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Event Photo matching product card aspect ratio */}
                <div className="relative w-full aspect-video overflow-hidden bg-stone-100 dark:bg-stone-900">
                  <Image
                    src={ev.image}
                    alt={ev.title}
                    fill
                    sizes="(max-width: 768px) 260px, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                  {/* Badges */}
                  <div className="absolute top-2 inset-x-2 flex items-center justify-between z-10 text-[10px]">
                    <span className="px-2 py-0.5 rounded-full bg-black/65 backdrop-blur-md text-white font-bold border border-white/20">
                      {ev.category}
                    </span>
                    <span
                      className={`font-bold px-2 py-0.5 rounded-full backdrop-blur-md ${
                        ev.isFree
                          ? "bg-emerald-500/90 text-white shadow-xs"
                          : "bg-black/75 text-amber-300 border border-amber-400/30"
                      }`}
                    >
                      {ev.priceText}
                    </span>
                  </div>
                </div>

                {/* Event Info */}
                <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-2.5">
                  <div className="space-y-1.5">
                    <h3 className="font-bold text-xs sm:text-sm text-foreground group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
                      {ev.title}
                    </h3>

                    <div className="space-y-1 text-[11px] text-muted-foreground font-light">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{ev.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        <span className="truncate">{ev.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-border/50">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-xs font-bold"
                      rightIcon={<Ticket className="w-3.5 h-3.5 text-purple-600" />}
                    >
                      مشاهده بلیت
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
