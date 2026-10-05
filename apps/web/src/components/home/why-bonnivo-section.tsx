"use client";

import Link from "next/link";
import { Truck, HeartPulse, Stethoscope, Users } from "lucide-react";

interface BenefitCard {
  title: string;
  description: string;
  icon: typeof Truck;
  href: string;
}

const BENEFITS: BenefitCard[] = [
  {
    title: "خرید و ارسال اکسپرس",
    description: "تضمین اصالت ۱۰۰٪ برندها",
    icon: Truck,
    href: "/shop",
  },
  {
    title: "سلامت و پرونده ابری",
    description: "ثبت سوابق واکسیناسیون پت",
    icon: HeartPulse,
    href: "/dashboard/pets",
  },
  {
    title: "نوبت آنلاین دامپزشک",
    description: "بیمارستان‌های تخصصی ۲۴h",
    icon: Stethoscope,
    href: "/vets",
  },
  {
    title: "جامعه، مربی و هتل",
    description: "مربیان تاییدشده و پانسیون",
    icon: Users,
    href: "/events",
  },
];

export function WhyBonnivoSection() {
  return (
    <section className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 w-full select-none" dir="rtl">
      {/* 2 Rows on Mobile (2x2 Grid), 4 Columns on Desktop */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3.5 lg:gap-4 w-full">
        {BENEFITS.map((item, idx) => {
          const Icon = item.icon;
          return (
            <Link
              key={idx}
              href={item.href}
              className="group p-2.5 sm:p-3.5 md:p-4 rounded-2xl bg-surface border border-border/80 hover:border-emerald-600/40 shadow-xs hover:shadow-md transition-all duration-200 flex items-center gap-2.5 sm:gap-3 min-w-0"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-200/50 dark:border-emerald-800/30 group-hover:scale-105 transition-transform">
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.8]" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-xs sm:text-sm text-foreground truncate group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-[10px] sm:text-[11px] text-muted-foreground line-clamp-1 mt-0.5 font-light">
                  {item.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
