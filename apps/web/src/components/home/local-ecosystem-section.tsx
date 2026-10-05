"use client";

import Link from "next/link";
import Image from "next/image";
import { 
  Star, 
  MapPin, 
  ShieldCheck, 
  ArrowLeft,
  Clock,
  Sparkles,
  CalendarCheck
} from "lucide-react";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";

interface ServiceCardItem {
  id: string;
  title: string;
  category: string;
  badge: string;
  location: string;
  rating: number;
  reviewsCount: number;
  description: string;
  image: string;
  href: string;
  ctaText: string;
}

const SERVICES: ServiceCardItem[] = [
  {
    id: "vet-1",
    title: "بیمارستان دامپزشکی پایتخت",
    category: "دامپزشکی تخصصی",
    badge: "اورژانس ۲۴ ساعته",
    location: "تهران، ولنجک",
    rating: 4.9,
    reviewsCount: 64,
    description: "جراحی تخصصی، سونوگرافی داپلر، آزمایشگاه خون اختصاصی و ICU.",
    image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=800&q=80",
    href: "/vets/clinic-paytakht-01",
    ctaText: "رزرو نوبت پزشک",
  },
  {
    id: "vet-2",
    title: "کلینیک تخصصی دکتر آذرخش",
    category: "داخلی و دندانپزشکی",
    badge: "تجهیزات مدرن دیجیتال",
    location: "تهران، سعادت‌آباد",
    rating: 4.8,
    reviewsCount: 39,
    description: "چکاپ دوره‌ای، جرم‌گیری بدون بیهوشی و واکسیناسیون استاندارد.",
    image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=800&q=80",
    href: "/vets/clinic-azarakhsh-02",
    ctaText: "رزرو نوبت پزشک",
  },
  {
    id: "board-1",
    title: "ریزورت هتل حیوانات آرمانی",
    category: "پانسیون ۵ ستاره VIP",
    badge: "پایش ویدیویی ۲۴h",
    location: "تهران، الهیه",
    rating: 4.9,
    reviewsCount: 42,
    description: "اتاق‌های اختصاصی با تهویه مطبوع، حیاط چمن و حضور پزشک مقیم.",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=800&q=80",
    href: "/boarding/board-1",
    ctaText: "استعلام و رزرو اتاق",
  },
];

export function LocalEcosystemSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full select-none" dir="rtl">
      <div className="space-y-5">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full mb-1 border border-emerald-200/50 dark:border-emerald-800/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>مراکز منتخب دارای مجوز رسمی</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
              مراکز درمانی و اقامتگاهی مورد اعتماد بنیوو
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-0.5 font-light">
              ارزیابی کیفی بر اساس نظرات واقعی سرپرستان و استانداردهای بهداشتی
            </p>
          </div>

          <Link
            href="/vets"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-700 dark:text-emerald-400 hover:opacity-80 transition-opacity shrink-0 self-start sm:self-auto"
          >
            <span>مشاهده همه مراکز</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        {/* Compact, Uniform Cards with Mobile Horizontal Scroll */}
        <div className="flex md:grid md:grid-cols-3 gap-3.5 sm:gap-4 overflow-x-auto md:overflow-x-visible pb-3 pt-1 -mx-1 px-1 md:mx-0 md:px-0 no-scrollbar snap-x snap-mandatory">
          {SERVICES.map((srv) => (
            <div
              key={srv.id}
              className="w-[260px] sm:w-[280px] md:w-auto shrink-0 md:shrink snap-start"
            >
              <div className="h-full rounded-3xl bg-surface border border-border/80 overflow-hidden hover:border-emerald-600/40 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
                
                {/* Photo Banner with Aspect Video */}
                <div className="relative w-full aspect-video overflow-hidden bg-stone-100 dark:bg-stone-900">
                  <Image
                    src={srv.image}
                    alt={srv.title}
                    fill
                    sizes="(max-width: 768px) 280px, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                  {/* Top Badges */}
                  <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between z-10 text-[10px]">
                    <span className="px-2 py-0.5 rounded-full bg-black/65 backdrop-blur-md text-white font-bold border border-white/20">
                      {srv.category}
                    </span>
                    <span className="font-bold px-2 py-0.5 rounded-full backdrop-blur-md bg-emerald-500/90 text-white shadow-xs flex items-center gap-1">
                      {srv.id.startsWith("vet") ? (
                        <Clock className="w-3 h-3 text-white" />
                      ) : (
                        <Sparkles className="w-3 h-3 text-white" />
                      )}
                      <span>{srv.badge}</span>
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-1">
                      <h3 className="font-bold text-xs sm:text-sm text-foreground group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
                        {srv.title}
                      </h3>
                      <div className="flex items-center gap-1 text-[11px] font-bold text-amber-500 shrink-0">
                        <Star className="w-3 h-3 fill-amber-400 stroke-amber-400" />
                        <span>{srv.rating.toLocaleString("fa-IR")}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span className="truncate">{srv.location}</span>
                    </div>

                    <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed font-light">
                      {srv.description}
                    </p>
                  </div>

                  {/* Action Button */}
                  <Link href={srv.href} className="block pt-2 border-t border-border/50">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-xs font-bold"
                      rightIcon={<CalendarCheck className="w-3.5 h-3.5 text-emerald-600" />}
                    >
                      {srv.ctaText}
                    </Button>
                  </Link>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
