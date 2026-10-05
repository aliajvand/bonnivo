"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  ShoppingBag,
  HeartHandshake,
  CalendarCheck,
  User,
  ShieldCheck,
  Stethoscope,
  Calendar,
  Award,
  ClipboardList,
  Users,
  Activity,
  Ticket,
} from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { cn } from "@/lib/utils";

interface MobileTab {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

export function MobileBottomNav() {
  const pathname = usePathname();
  const { currentRole } = useAuth();

  // Role-specific tab configuration
  const tabs: MobileTab[] = (() => {
    switch (currentRole) {
      case "ADMIN":
        return [
          { title: "کلان", href: "/dashboard/admin", icon: ShieldCheck },
          { title: "سفارشات", href: "/dashboard/admin#orders", icon: ShoppingBag },
          { title: "کاربران", href: "/dashboard/admin#sellers", icon: Users },
          { title: "ممیزی", href: "/dashboard/admin#audit", icon: Activity },
          { title: "پروفایل", href: "/dashboard/profile", icon: User },
        ];
      case "VETERINARIAN":
        return [
          { title: "کلینیک", href: "/dashboard/vet", icon: Stethoscope },
          { title: "نوبت‌ها", href: "/dashboard/vet#appointments", icon: CalendarCheck },
          { title: "بیماران", href: "/dashboard/vet#patients", icon: Users },
          { title: "پرونده", href: "/dashboard/vet#records", icon: ClipboardList },
          { title: "پروفایل", href: "/dashboard/profile", icon: User },
        ];
      case "EVENT_ORGANIZER":
        return [
          { title: "میزکار", href: "/dashboard/organizer", icon: Calendar },
          { title: "رویدادها", href: "/dashboard/organizer#events", icon: ClipboardList },
          { title: "اسکن", href: "/dashboard/organizer#checkin", icon: Ticket },
          { title: "آمار", href: "/dashboard/organizer#metrics", icon: Activity },
          { title: "پروفایل", href: "/dashboard/profile", icon: User },
        ];
      case "TRAINER":
        return [
          { title: "میزکار", href: "/dashboard/trainer", icon: Award },
          { title: "جلسات", href: "/dashboard/trainer#sessions", icon: CalendarCheck },
          { title: "مراجعین", href: "/dashboard/trainer#clients", icon: Users },
          { title: "درآمد", href: "/dashboard/trainer#reviews", icon: Activity },
          { title: "پروفایل", href: "/dashboard/profile", icon: User },
        ];
      default:
        return [
          { title: "خانه", href: "/", icon: Home },
          { title: "فروشگاه", href: "/shop", icon: ShoppingBag },
          { title: "دامپزشک", href: "/vets", icon: Stethoscope },
          { title: "پت من", href: "/dashboard/pets", icon: HeartHandshake },
          { title: "ایونت", href: "/events", icon: Calendar },
          { title: "حساب", href: "/dashboard/profile", icon: User },
        ];
    }
  })();

  return (
    <nav
      aria-label="ناوبری شناور موبایل"
      className="fixed bottom-3 inset-x-3 z-50 md:hidden pointer-events-none pb-safe select-none"
    >
      <div className="max-w-sm mx-auto pointer-events-auto bg-white/95 dark:bg-[#0c1813]/95 backdrop-blur-2xl rounded-2xl p-1.5 flex items-center justify-between shadow-2xl border border-stone-200/90 dark:border-emerald-950/80 ring-1 ring-black/5 dark:ring-white/5">
        {tabs.map((tab) => {
          const isActive =
            pathname === tab.href ||
            (tab.href !== "/" && pathname.startsWith(tab.href.split("#")[0]));
          const Icon = tab.icon;

          return (
            <Link
              key={tab.title}
              href={tab.href}
              className={cn(
                "relative flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all duration-200 select-none group",
                isActive
                  ? "bg-emerald-600 dark:bg-emerald-400 text-white dark:text-stone-950 font-black shadow-md shadow-emerald-600/20 dark:shadow-emerald-400/20 scale-[1.02]"
                  : "text-stone-600 dark:text-stone-400 hover:text-foreground active:scale-95"
              )}
            >
              <div className="relative flex flex-col items-center">
                <Icon
                  className={cn(
                    "w-4.5 h-4.5 transition-transform duration-200",
                    isActive
                      ? "stroke-[2.5px] scale-105"
                      : "stroke-[1.8px] group-hover:scale-105"
                  )}
                />

                {tab.badge && (
                  <span className="absolute -top-1 -start-1.5 bg-rose-500 text-white text-[8px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </div>

              <span
                className={cn(
                  "text-[10px] tracking-tight transition-all duration-200 mt-0.5",
                  isActive ? "font-black" : "font-medium"
                )}
              >
                {tab.title}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
