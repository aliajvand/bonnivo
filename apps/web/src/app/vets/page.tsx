"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Star,
  ShieldCheck,
  Calendar,
  Clock,
  MapPin,
  HeartPulse,
  Activity,
  Phone,
  Sparkles,
  Stethoscope,
  ChevronLeft,
} from "lucide-react";
import { ClinicSummary } from "@/types/vet";
import { fetchClinics } from "@/lib/api/vets";
import { FeaturedPromoBanner } from "@/components/ui/featured-promo-banner";
import { PhotoDock, PhotoDockItem } from "@/components/ui/photo-dock";
import { BenefitGrid, BenefitItem } from "@/components/ui/benefit-grid";
import { cn } from "@/lib/utils";

const CLINIC_PHOTOS: Record<string, string> = {
  "clinic-paytakht-01": "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=800&q=80",
  "clinic-azarakhsh-02": "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=800&q=80",
  "clinic-alborz-03": "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=800&q=80",
};

const TEHRAN_DISTRICTS = [
  "همه مناطق تهران",
  "منطقه ۱ - ولنجک / نیاوران",
  "منطقه ۲ - سعادت‌آباد / شهرک غرب",
  "منطقه ۳ - ظفر / میرداماد",
  "منطقه ۵ - پونک / صادقیه",
  "منطقه ۶ - یوسف‌آباد / امیرآباد",
];

const VET_SERVICES_DOCK: (PhotoDockItem & { serviceName: string })[] = [
  {
    id: "serv-surgery",
    label: "جراحی تخصصی",
    imageSrc: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=400&q=80",
    href: "#vets-directory",
    serviceName: "جراحی تخصصی",
  },
  {
    id: "serv-er",
    label: "اورژانس ۲۴h",
    imageSrc: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=400&q=80",
    href: "#vets-directory",
    serviceName: "بخش اورژانس ۲۴ ساعته",
    badge: "۲۴h",
  },
  {
    id: "serv-vax",
    label: "واکسیناسیون",
    imageSrc: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=400&q=80",
    href: "#vets-directory",
    serviceName: "واکسیناسیون",
  },
  {
    id: "serv-imaging",
    label: "سونوگرافی",
    imageSrc: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=400&q=80",
    href: "#vets-directory",
    serviceName: "سونوگرافی و رادیولوژی",
  },
  {
    id: "serv-dental",
    label: "دندانپزشکی",
    imageSrc: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=400&q=80",
    href: "#vets-directory",
    serviceName: "دندانپزشکی",
  },
  {
    id: "serv-lab",
    label: "آزمایشگاه",
    imageSrc: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=400&q=80",
    href: "#vets-directory",
    serviceName: "آزمایشگاه",
  },
  {
    id: "serv-groom",
    label: "گرومینگ",
    imageSrc: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=400&q=80",
    href: "#vets-directory",
    serviceName: "گرومینگ و اصلاح",
  },
  {
    id: "serv-checkup",
    label: "چکاپ دوره‌ای",
    imageSrc: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=400&q=80",
    href: "#vets-directory",
    serviceName: "همه خدمات",
  },
];

const VET_BENEFITS: BenefitItem[] = [
  {
    id: "vb-1",
    title: "پرونده سلامت ابری یکپارچه",
    description: "ثبت خودکار شرح‌حال، داروها و واکسن‌ها در شناسنامه هوشمند پت با دسترسی همیشگی",
    icon: HeartPulse,
    badge: "ابری",
    theme: "emerald",
  },
  {
    id: "vb-2",
    title: "بخش اورژانس ۲۴ ساعته",
    description: "آمادگی پذیرش شبانه‌روزی و اعزام کادر درمانی در موارد اورژانسی در سراسر تهران",
    icon: Activity,
    badge: "شبکه‌روزی",
    theme: "amber",
  },
  {
    id: "vb-3",
    title: "پزشکان تاییدشده WSAVA",
    description: "حضور متخصصان دارای پروانه اشتغال رسمی و استانداردهای جهانی انجمن دامپزشکان",
    icon: ShieldCheck,
    badge: "معتبر",
    theme: "blue",
  },
  {
    id: "vb-4",
    title: "یادآور خودکار دوزهای بعدی",
    description: "پیامک و هشدار هوشمند فرارسیدن موعد واکسیناسیون، انگل‌تراپی و آزمایش‌های دوره‌ای",
    icon: Calendar,
    badge: "هوشمند",
    theme: "purple",
  },
];

export default function VetsDirectoryPage() {
  const [clinics, setClinics] = useState<ClinicSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDistrict, setSelectedDistrict] = useState("همه مناطق تهران");
  const [selectedService, setSelectedService] = useState("همه خدمات");
  const [emergencyOnly, setEmergencyOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const districtParam =
        selectedDistrict !== "همه مناطق تهران"
          ? selectedDistrict.split(" - ")[0].trim()
          : undefined;
      const serviceParam =
        selectedService !== "همه خدمات" ? selectedService : undefined;

      const data = await fetchClinics({
        district: districtParam,
        service: serviceParam,
        emergencyOnly,
        query: searchQuery || undefined,
      });
      setClinics(data);
      setLoading(false);
    }
    loadData();
  }, [selectedDistrict, selectedService, emergencyOnly, searchQuery]);

  return (
    <div className="w-full py-4 sm:py-6 space-y-8 select-none" dir="rtl">
      
      {/* 1. Header Promo Banner using FeaturedPromoBanner */}
      <FeaturedPromoBanner
        imageSrc="https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=1200&q=80"
        imageAlt="شبکه دامپزشکی و بیمارستان‌های تخصصی بونیو"
        badge={{
          text: "شبکه سلامت و کلینیک‌های معتمد بونیو",
          pulse: true,
        }}
        meta={[
          { text: "اورژانس شبانه‌روزی ۲۴ ساعته", icon: Activity },
          { text: "پرونده سلامت ابری", icon: HeartPulse },
          { text: "تاییدیه رسمی WSAVA", icon: ShieldCheck },
        ]}
        title="رزرو نوبت دامپزشکی و خدمات بالینی حیوانات خانگی"
        description="جستجو و نوبت‌دهی آنلاین در برترین بیمارستان‌ها و کلینیک‌های تخصصی با ثبت لحظه‌ای سوابق، واکسن‌ها و آزمایش‌ها در شناسنامه هوشمند پت."
        primaryCta={{
          label: "نوبت‌ها و پرونده‌های من",
          href: "/dashboard/appointments",
        }}
        secondaryCta={{
          label: "داشبورد مراقبت پت",
          href: "/dashboard/care",
        }}
        note="پوشش تمامی مناطق ۲۲گانه تهران"
        colorTheme="emerald"
      />

      {/* 2. Services Photo Dock */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-black text-foreground">
              خدمات تخصصی بالینی و اورژانس
            </h2>
            <span className="text-[11px] text-stone-500 font-light">
              کلیک برای فیلتر سریع مراکز دارای این خدمت
            </span>
          </div>

          <div className="w-full max-w-5xl mx-auto select-none" dir="rtl">
            <div className="rounded-3xl p-3 sm:p-4 bg-white/95 dark:bg-[#0c1813]/95 backdrop-blur-2xl border border-stone-200/90 dark:border-emerald-950/80 shadow-lg">
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5 sm:gap-3.5">
                {VET_SERVICES_DOCK.map((item) => {
                  const isSelected = selectedService === item.serviceName;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setSelectedService(isSelected ? "همه خدمات" : item.serviceName);
                      }}
                      className={cn(
                        "flex flex-col items-center justify-center p-1.5 sm:p-2 rounded-2xl transition-all duration-300 group active:scale-95 cursor-pointer",
                        isSelected
                          ? "bg-emerald-600/10 text-emerald-700 dark:text-emerald-300 font-black scale-105"
                          : "hover:bg-emerald-50/50 dark:hover:bg-stone-800/50 text-stone-700 dark:text-stone-300"
                      )}
                    >
                      <div
                        className={cn(
                          "relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden shadow-xs ring-2 transition-all duration-300 group-hover:scale-105 bg-stone-100 dark:bg-stone-800",
                          isSelected
                            ? "ring-emerald-600 shadow-md shadow-emerald-500/25 ring-offset-2"
                            : "ring-stone-200 dark:ring-stone-700 group-hover:ring-emerald-500/80"
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
                          <span className="absolute top-1 start-1 bg-rose-600 text-white text-[9px] font-black rounded-full px-1.5 py-0.5">
                            {item.badge}
                          </span>
                        )}
                      </div>

                      <span
                        className={cn(
                          "text-[11px] sm:text-xs font-bold truncate text-center w-full mt-1.5 transition-colors",
                          isSelected
                            ? "text-emerald-700 dark:text-emerald-400 font-black"
                            : "group-hover:text-emerald-700 dark:group-hover:text-emerald-400 text-stone-800 dark:text-stone-200"
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

      {/* 3. Search & District Filter Controls */}
      <section id="vets-directory" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#0f1d17] border border-stone-200/90 dark:border-emerald-950/80 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Search bar */}
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجوی نام کلینیک، نام پزشک یا تخصص..."
              className="w-full pe-10 ps-4 py-2.5 bg-stone-50 dark:bg-stone-800/80 text-xs text-foreground border border-stone-200/90 dark:border-stone-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            />
            <Search className="absolute end-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          </div>

          {/* District select */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="px-3.5 py-2.5 rounded-2xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200/90 dark:border-stone-700 text-xs font-bold text-foreground focus:outline-none cursor-pointer"
            >
              {TEHRAN_DISTRICTS.map((dist) => (
                <option key={dist} value={dist}>
                  {dist}
                </option>
              ))}
            </select>

            {/* Emergency Toggle */}
            <button
              type="button"
              onClick={() => setEmergencyOnly(!emergencyOnly)}
              className={cn(
                "px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 border transition-all cursor-pointer",
                emergencyOnly
                  ? "bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-600/30"
                  : "bg-stone-50 dark:bg-stone-800/80 border-stone-200/90 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:border-rose-400"
              )}
            >
              <Activity className={cn("w-4 h-4", emergencyOnly ? "text-white" : "text-rose-500")} />
              <span>فقط اورژانس شبانه‌روزی</span>
            </button>
          </div>
        </div>

        {/* 4. Clinics List Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className="p-5 rounded-3xl bg-white dark:bg-[#0f1d17] border border-stone-200/80 dark:border-emerald-950/80 space-y-4 animate-pulse"
              >
                <div className="w-full h-44 bg-stone-100 dark:bg-stone-800 rounded-2xl" />
                <div className="h-5 bg-stone-200 dark:bg-stone-800 rounded-md w-2/3" />
                <div className="h-3 bg-stone-100 dark:bg-stone-800 rounded-md w-1/2" />
                <div className="h-10 bg-stone-200 dark:bg-stone-800 rounded-xl w-full" />
              </div>
            ))}
          </div>
        ) : clinics.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white dark:bg-[#0f1d17] border border-stone-200/90 dark:border-emerald-950/80 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 mx-auto flex items-center justify-center">
              <Stethoscope className="w-8 h-8" />
            </div>
            <h3 className="text-base font-black text-foreground">مرکزی با این مشخصات یافت نشد</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto leading-relaxed font-light">
              لطفاً فیلتر منطقه یا خدمات را به حالت «همه» تغییر دهید تا تمامی مراکز همکار بونیو نمایش داده شوند.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clinics.map((clinic) => {
              const photo =
                CLINIC_PHOTOS[clinic.id] ||
                "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=800&q=80";

              return (
                <div
                  key={clinic.id}
                  className="group rounded-3xl p-5 bg-white dark:bg-[#0f1d17] border border-stone-200/90 dark:border-emerald-950/80 hover:border-emerald-500/60 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Clinic Photo & Badges */}
                    <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-800">
                      <Image
                        src={photo}
                        alt={clinic.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      {clinic.isEmergency24h && (
                        <div className="absolute top-3 end-3 px-2.5 py-1 rounded-full bg-rose-600/90 backdrop-blur-xs text-white text-[10px] font-black flex items-center gap-1 shadow-md">
                          <Activity className="w-3 h-3" />
                          <span>اورژانس ۲۴ ساعته</span>
                        </div>
                      )}

                      <div className="absolute bottom-3 start-3 px-2.5 py-0.5 rounded-lg bg-black/60 backdrop-blur-xs text-white text-xs font-bold flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                        <span>منطقه {clinic.district} تهران</span>
                      </div>
                    </div>

                    {/* Clinic Title & Rating */}
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-black text-foreground group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                          {clinic.name}
                        </h3>
                        <div className="flex items-center gap-1 text-xs font-mono font-bold text-foreground">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{clinic.rating}</span>
                        </div>
                      </div>

                      <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 line-clamp-2 font-light leading-relaxed">
                        {clinic.address}
                      </p>
                    </div>

                    {/* Service Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {clinic.services.slice(0, 4).map((serv, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-lg bg-stone-100 dark:bg-stone-800 text-[10px] font-bold text-stone-600 dark:text-stone-300"
                        >
                          {serv}
                        </span>
                      ))}
                      {clinic.services.length > 4 && (
                        <span className="px-2 py-0.5 rounded-lg bg-stone-100 dark:bg-stone-800 text-[10px] font-bold text-stone-400">
                          +{clinic.services.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions & Reserve CTA */}
                  <div className="pt-4 mt-4 border-t border-stone-200/80 dark:border-stone-800/80 flex items-center justify-between gap-3">
                    <span className="text-[11px] text-stone-500 font-medium">
                      نوبت‌دهی آنلاین با پرونده
                    </span>

                    <Link
                      href={`/vets/${clinic.id}`}
                      className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-emerald-600/20"
                    >
                      <span>رزرو نوبت</span>
                      <ChevronLeft className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 5. Benefits Grid using BenefitGrid */}
      <BenefitGrid
        items={VET_BENEFITS}
        title="چرا نوبت‌دهی دامپزشکی را از طریق بونیو انجام دهیم؟"
        subtitle="استانداردهای مراقبت بالینی یکپارچه برای حفظ سلامت، ایمنی و آرامش پت شما"
        columns={4}
        className="pt-8"
      />

    </div>
  );
}
