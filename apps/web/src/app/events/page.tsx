"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Calendar, 
  MapPin, 
  Users, 
  Ticket, 
  CheckCircle2, 
  Clock, 
  X, 
  QrCode, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  Download,
  Info,
  Heart,
  Award
} from "lucide-react";
import { cn } from "@/lib/utils";
import { FeatureFlagGuard } from "@/components/common/feature-flag-guard";
import { EventCard } from "@/cards/event-card";
import { FeaturedPromoBanner } from "@/components/ui/featured-promo-banner";
import { PhotoDock, PhotoDockItem } from "@/components/ui/photo-dock";
import { BenefitGrid, BenefitItem } from "@/components/ui/benefit-grid";

interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  capacityText: string;
  remainingSpots: number;
  priceText: string;
  priceTomans: number;
  description: string;
  petRequirements: string[];
}

const EVENT_PHOTO_DOCK: (PhotoDockItem & { typeKey: string })[] = [
  {
    id: "ev-golden",
    label: "دورهمی نژادی",
    imageSrc: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=400&q=80",
    href: "#events-list",
    typeKey: "دورهمی",
    badge: "ویژه",
  },
  {
    id: "ev-workshop",
    label: "کارگاه رفتارشناسی",
    imageSrc: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=400&q=80",
    href: "#events-list",
    typeKey: "کارگاه",
  },
  {
    id: "ev-webinar",
    label: "وبینار تخصصی",
    imageSrc: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80",
    href: "#events-list",
    typeKey: "وبینار",
  },
  {
    id: "ev-agility",
    label: "مسابقه و بازی",
    imageSrc: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=400&q=80",
    href: "#events-list",
    typeKey: "مسابقه",
  },
  {
    id: "ev-checkup",
    label: "ویزیت رایگان",
    imageSrc: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=400&q=80",
    href: "#events-list",
    typeKey: "سلامت",
  },
  {
    id: "ev-walk",
    label: "پیاده‌روی صبح",
    imageSrc: "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=400&q=80",
    href: "#events-list",
    typeKey: "پیاده‌روی",
  },
  {
    id: "ev-photo",
    label: "عکاسی در پارک",
    imageSrc: "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=400&q=80",
    href: "#events-list",
    typeKey: "عکاسی",
  },
  {
    id: "ev-party",
    label: "جشن سالانه",
    imageSrc: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=400&q=80",
    href: "#events-list",
    typeKey: "جشن",
  },
];

const EVENT_BENEFITS: BenefitItem[] = [
  {
    id: "eb-1",
    title: "دیدار با جامعه سرپرستان شهر",
    description: "ایجاد ارتباط دوستانه، تبادل تجربیات زیسته و پیدا کردن هم‌بازی‌های صمیمی برای پت شما",
    icon: Users,
    badge: "جامعه",
    theme: "purple",
  },
  {
    id: "eb-2",
    title: "محیط محصور، امن و استاندارد",
    description: "برگزاری در بوستان‌ها و فضاهای محصور با نظارت کادر مربیگری و امدادی بونیو",
    icon: ShieldCheck,
    badge: "ایمنی",
    theme: "emerald",
  },
  {
    id: "eb-3",
    title: "کارگاه‌ها و آموزش‌های کاربردی",
    description: "پرسش و پاسخ رودررو با برجسته‌ترین مربیان و دامپزشکان متخصص پیرامون سلامت و رفتار پت",
    icon: Sparkles,
    badge: "آموزشی",
    theme: "amber",
  },
  {
    id: "eb-4",
    title: "ثبت رویداد در شناسنامه هوشمند",
    description: "ثبت گواهی حضور در رویدادها، مسابقات و وبینارها در رزومه و پرونده ابری پت شما",
    icon: Award,
    badge: "دیجیتال",
    theme: "blue",
  },
];

export default function EventsPage() {
  const events: EventItem[] = [
    {
      id: "ev-1",
      title: "دورهمی پاییزی سرپرستان نژاد گلدن و هاسکی",
      date: "جمعه ۲۸ مهر ۱۴۰۳",
      time: "۱۶:۰۰ الی ۱۹:۰۰",
      location: "تهران، بوستان آب و آتش (محوطه اختصاصی حیوانات خانگی)",
      organizer: "باشگاه سگ‌های مهربان بونیو",
      capacityText: "۵۰ سرپرست (ظرفیت باقی‌مانده: ۱۲)",
      remainingSpots: 12,
      priceText: "رایگان (نیازمند ثبت‌نام)",
      priceTomans: 0,
      description: "فضایی شاد و صمیمانه برای تخلیه انرژی سگ‌های پرانرژی نژاد بزرگ، آشنایی سرپرستان و مشاوره رایگان با مربیان رفتارشناسی بونیو.",
      petRequirements: ["شناسنامه واکسیناسیون معتبر", "استفاده از قلاده بدنی یا کمری استاندارد", "عدم پرخاشگری کنترل‌نشده"],
    },
    {
      id: "ev-2",
      title: "وبینار تخصصی تغذیه بالینی و بیماری‌های ادراری گربه‌ها",
      date: "دوشنبه ۲ آبان ۱۴۰۳",
      time: "۱۹:۰۰ الی ۲۱:۰۰",
      location: "آنلاین در بستر اختصاصی بونیو (پخش زنده)",
      organizer: "دکتر فرزانه صامتی (متخصص داخلی دام‌های کوچک)",
      capacityText: "۲۰۰ نفر (ظرفیت باقی‌مانده: ۵۴)",
      remainingSpots: 54,
      priceText: "۱۲۰,۰۰۰ تومان",
      priceTomans: 120000,
      description: "بررسی دلایل شایع سندروم اورولوژیک گربه‌ها (FLUTD)، راهکارهای افزایش مصرف آب و انتخاب جیره غذایی متناسب با گربه‌های عقیم‌شده.",
      petRequirements: ["بدون نیاز به حضور پت (وبینار آنلاین)"],
    },
    {
      id: "ev-3",
      title: "کارگاه عملی آموزش فرمان‌پذیری پایه و کاهش استرس پت",
      date: "پنجشنبه ۱۲ آبان ۱۴۰۳",
      time: "۱۰:۰۰ الی ۱۳:۰۰",
      location: "تهران، باشگاه ورزشی انقلاب",
      organizer: "آکادمی مربیگری بونیو",
      capacityText: "۲۰ سرپرست با پت (ظرفیت باقی‌مانده: ۴)",
      remainingSpots: 4,
      priceText: "۳۵۰,۰۰۰ تومان",
      priceTomans: 350000,
      description: "تمرین‌های گام‌به‌گام با متد تشویقی مثبت، یادگیری فرمان‌های بشین، بمان، همگام و راهکارهای مدیریت اضطراب جدایی در محیط‌های شلوغ شهری.",
      petRequirements: ["واکسیناسیون کامل ده‌گانه", "تشویقی‌های نرم پرجاذبه", "بند قلاده ۲ متری غیرفلزی"],
    },
  ];

  const [selectedEventType, setSelectedEventType] = useState<string>("همه");
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [attendeeName, setAttendeeName] = useState("علی ایجرندی");
  const [attendeePhone, setAttendeePhone] = useState("09121234567");
  const [petName, setPetName] = useState("میلو");
  const [bookingSuccessTicket, setBookingSuccessTicket] = useState<{
    ticketCode: string;
    eventTitle: string;
    date: string;
    time: string;
    location: string;
    attendeeName: string;
    petName: string;
  } | null>(null);

  const handleOpenBooking = (ev: EventItem) => {
    setSelectedEvent(ev);
    setBookingSuccessTicket(null);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent) return;

    const ticketCode = `BNY-PASS-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingSuccessTicket({
      ticketCode,
      eventTitle: selectedEvent.title,
      date: selectedEvent.date,
      time: selectedEvent.time,
      location: selectedEvent.location,
      attendeeName,
      petName,
    });
  };

  const filteredEvents = events.filter((ev) => {
    if (selectedEventType === "همه") return true;
    return ev.title.includes(selectedEventType);
  });

  return (
    <FeatureFlagGuard
      moduleKey="events"
      moduleTitleFa="رویدادها و همایش‌های پت"
      descriptionFa="بخش همایش‌ها و رویدادهای حضوری و آنلاین بونیو پس از دریافت مجوزهای لازم و هماهنگی مکان‌های برگزاری فعال خواهد شد."
    >
      <div className="w-full py-4 sm:py-6 space-y-8 select-none" dir="rtl">
        
        {/* 1. Header Promo Banner using FeaturedPromoBanner */}
        <FeaturedPromoBanner
          imageSrc="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=80"
          imageAlt="همایش‌ها و دورهمی‌های جامعه حیوانات خانگی بونیو"
          badge={{
            text: "رویدادها، همایش‌ها و دورهمی‌های جامعه بونیو",
            pulse: true,
          }}
          meta={[
            { text: "ورود رایگان با رزرو آنلاین بلیت", icon: Ticket },
            { text: "بوستان آب و آتش و فضاهای محصور", icon: MapPin },
            { text: "مشاوره رایگان با مربیان مجرب", icon: Sparkles },
          ]}
          title="همایش‌ها، وبینارها و دورهمی‌های جامعه حیوانات خانگی"
          description="فرصتی برای یادگیری تخصصی، تخلیه انرژی و بازی سگ‌ها، آشنایی سرپرستان محله و ارتقای سلامت روان پت در محیطی صمیمانه و شاداب."
          primaryCta={{
            label: "مشاهده رویدادهای پیش‌رو",
            href: "#events-list",
          }}
          secondaryCta={{
            label: "نوبت‌ها و بلیت‌های من",
            href: "/dashboard/appointments",
          }}
          note="ظرفیت رویدادهای حضوری به دلیل ایمنی محدود است"
          colorTheme="purple"
        />

        {/* 2. Photo Dock for Event Categories */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-sm font-black text-foreground">
                دسته‌بندی و انواع رویدادها
              </h2>
              <span className="text-[11px] text-stone-500 font-light">
                کلیک برای مشاهده رویدادهای مرتبط
              </span>
            </div>

            <div className="w-full max-w-5xl mx-auto select-none" dir="rtl">
              <div className="rounded-3xl p-3 sm:p-4 bg-white/95 dark:bg-[#0c1813]/95 backdrop-blur-2xl border border-stone-200/90 dark:border-emerald-950/80 shadow-lg">
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5 sm:gap-3.5">
                  {EVENT_PHOTO_DOCK.map((item) => {
                    const isSelected = selectedEventType === item.typeKey;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setSelectedEventType(isSelected ? "همه" : item.typeKey);
                        }}
                        className={cn(
                          "flex flex-col items-center justify-center p-1.5 sm:p-2 rounded-2xl transition-all duration-300 group active:scale-95 cursor-pointer",
                          isSelected
                            ? "bg-purple-600/10 text-purple-700 dark:text-purple-300 font-black scale-105"
                            : "hover:bg-purple-50/50 dark:hover:bg-stone-800/50 text-stone-700 dark:text-stone-300"
                        )}
                      >
                        <div
                          className={cn(
                            "relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden shadow-xs ring-2 transition-all duration-300 group-hover:scale-105 bg-stone-100 dark:bg-stone-800",
                            isSelected
                              ? "ring-purple-600 shadow-md shadow-purple-500/25 ring-offset-2"
                              : "ring-stone-200 dark:ring-stone-700 group-hover:ring-purple-500/80"
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
                            <span className="absolute top-1 start-1 bg-purple-600 text-white text-[9px] font-black rounded-full px-1.5 py-0.5">
                              {item.badge}
                            </span>
                          )}
                        </div>

                        <span
                          className={cn(
                            "text-[11px] sm:text-xs font-bold truncate text-center w-full mt-1.5 transition-colors",
                            isSelected
                              ? "text-purple-700 dark:text-purple-400 font-black"
                              : "group-hover:text-purple-700 dark:group-hover:text-purple-400 text-stone-800 dark:text-stone-200"
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

        {/* 3. Events Cards Grid */}
        <section id="events-list" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <h2 className="text-base font-black text-foreground">لیست رویدادهای فعال بونیو</h2>
            </div>
            {selectedEventType !== "همه" && (
              <button
                type="button"
                onClick={() => setSelectedEventType("همه")}
                className="text-xs text-purple-600 dark:text-purple-400 font-bold hover:underline"
              >
                نمایش همه رویدادها
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredEvents.map((ev) => (
              <EventCard
                key={ev.id}
                id={ev.id}
                titleFa={ev.title}
                dateFa={ev.date}
                timeFa={ev.time}
                locationFa={ev.location}
                organizerFa={ev.organizer}
                priceTomans={ev.priceTomans}
                remainingSpots={ev.remainingSpots}
                capacityText={ev.capacityText}
                onGetTicket={() => handleOpenBooking(ev)}
              />
            ))}
          </div>
        </section>

        {/* 4. Benefits Grid using BenefitGrid */}
        <BenefitGrid
          items={EVENT_BENEFITS}
          title="چرا در دورهمی‌ها و همایش‌های بونیو شرکت کنیم؟"
          subtitle="هم‌نشینی با سرپرستان آگاه، آموزش‌های رایگان و ثبت خاطرات شیرین در یک فضای تخصصی و امن"
          columns={4}
          className="pt-8"
        />

        {/* 5. Booking & Ticket Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200" dir="rtl">
            <div className="w-full max-w-lg bg-white dark:bg-[#0f1d17] border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
              
              <div className="flex items-start justify-between border-b border-stone-200/60 dark:border-stone-800 pb-3">
                <div>
                  <span className="text-[11px] font-bold text-purple-600 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
                    رزرو رسمی رویداد بونیو
                  </span>
                  <h3 className="font-black text-base text-foreground mt-1">
                    {selectedEvent.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedEvent(null)}
                  className="p-1.5 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {bookingSuccessTicket ? (
                <div className="space-y-4 text-center animate-in zoom-in-95 duration-200">
                  <div className="w-16 h-16 mx-auto rounded-3xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-lg font-black text-foreground">بلیت ورود شما با موفقیت صادر شد!</h4>
                    <p className="text-xs text-stone-500">
                      بارکد زیر را هنگام ورود به برگزارکننده ارائه فرمایید.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-850 border border-purple-500/30 text-right space-y-3 relative overflow-hidden">
                    <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-2">
                      <span className="text-xs font-mono font-black text-purple-600 dark:text-purple-400">
                        {bookingSuccessTicket.ticketCode}
                      </span>
                      <span className="text-[10px] text-stone-400">شناسه اختصاصی بلیت</span>
                    </div>

                    <div className="text-xs space-y-1.5 text-stone-600 dark:text-stone-300">
                      <div><strong className="text-foreground">سرپرست:</strong> {bookingSuccessTicket.attendeeName}</div>
                      <div><strong className="text-foreground">پت همراه:</strong> {bookingSuccessTicket.petName}</div>
                      <div><strong className="text-foreground">زمان:</strong> {bookingSuccessTicket.date} • {bookingSuccessTicket.time}</div>
                      <div><strong className="text-foreground">مکان:</strong> {bookingSuccessTicket.location}</div>
                    </div>

                    <div className="pt-2 flex justify-center">
                      <div className="p-3 bg-white rounded-xl shadow-xs border border-stone-200 inline-block text-black">
                        <QrCode className="w-24 h-24 mx-auto" />
                        <span className="text-[9px] font-mono text-center block mt-1">BONNIVO-PASS-AUTH</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedEvent(null)}
                    className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md"
                  >
                    بستن و ذخیره در شناسنامه
                  </button>
                </div>
              ) : (
                <form onSubmit={handleConfirmBooking} className="space-y-4 text-right">
                  <div className="space-y-2 text-xs text-stone-600 dark:text-stone-300">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-purple-500" />
                      <span>{selectedEvent.date} • {selectedEvent.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-purple-500" />
                      <span>{selectedEvent.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-bold text-foreground">
                      <Ticket className="w-4 h-4 text-emerald-500" />
                      <span>هزینه ورود: {selectedEvent.priceText}</span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2 border-t border-stone-200 dark:border-stone-800">
                    <div>
                      <label className="text-xs font-bold text-foreground block mb-1">
                        نام و نام خانوادگی سرپرست
                      </label>
                      <input
                        type="text"
                        required
                        value={attendeeName}
                        onChange={(e) => setAttendeeName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs focus:ring-2 focus:ring-purple-500/20"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-foreground block mb-1">
                        شماره تماس (جهت ارسال پیامک بلیت)
                      </label>
                      <input
                        type="tel"
                        required
                        value={attendeePhone}
                        onChange={(e) => setAttendeePhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs focus:ring-2 focus:ring-purple-500/20 font-mono text-left"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-foreground block mb-1">
                        نام پت همراه (در صورت حضور)
                      </label>
                      <input
                        type="text"
                        value={petName}
                        onChange={(e) => setPetName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs focus:ring-2 focus:ring-purple-500/20"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 active:scale-98 text-white text-xs font-bold shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>تأیید نهایی و دریافت بلیت ورود</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </FeatureFlagGuard>
  );
}
