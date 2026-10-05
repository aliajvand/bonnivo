"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FeaturedPromoBannerProps {
  imageSrc: string;
  imageAlt: string;
  title: string | React.ReactNode;
  description: string;
  badge?: {
    text: string;
    icon?: LucideIcon;
    pulse?: boolean;
  };
  meta?: Array<{
    text: string;
    icon?: LucideIcon;
  }>;
  primaryCta: {
    label: string;
    href: string;
    icon?: LucideIcon;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  note?: string;
  colorTheme?: "emerald" | "amber" | "blue" | "purple" | "rose";
  className?: string;
}

const THEME_STYLES = {
  emerald: {
    cardBg: "from-[#0B1F17] via-[#0E291F] to-[#07140E]",
    borderColor: "border-emerald-800/50",
    glowColor: "bg-emerald-500/10",
    badgeBg: "bg-black/60 border-white/20 text-emerald-300",
    badgeDot: "bg-emerald-400",
    metaText: "text-emerald-300",
    metaIcon: "text-emerald-400",
    buttonBg: "bg-emerald-400 hover:bg-emerald-300 text-stone-950 shadow-emerald-950/40",
    secondaryBtn: "bg-white/10 hover:bg-white/15 text-white border-white/20",
  },
  amber: {
    cardBg: "from-[#201505] via-[#2D1E08] to-[#120B02]",
    borderColor: "border-amber-800/50",
    glowColor: "bg-amber-500/10",
    badgeBg: "bg-black/60 border-white/20 text-amber-300",
    badgeDot: "bg-amber-400",
    metaText: "text-amber-300",
    metaIcon: "text-amber-400",
    buttonBg: "bg-amber-400 hover:bg-amber-300 text-stone-950 shadow-amber-950/40",
    secondaryBtn: "bg-white/10 hover:bg-white/15 text-white border-white/20",
  },
  blue: {
    cardBg: "from-[#081726] via-[#0B2138] to-[#050D18]",
    borderColor: "border-sky-800/50",
    glowColor: "bg-sky-500/10",
    badgeBg: "bg-black/60 border-white/20 text-sky-300",
    badgeDot: "bg-sky-400",
    metaText: "text-sky-300",
    metaIcon: "text-sky-400",
    buttonBg: "bg-sky-400 hover:bg-sky-300 text-stone-950 shadow-sky-950/40",
    secondaryBtn: "bg-white/10 hover:bg-white/15 text-white border-white/20",
  },
  purple: {
    cardBg: "from-[#1A0A26] via-[#240E36] to-[#0E0516]",
    borderColor: "border-purple-800/50",
    glowColor: "bg-purple-500/10",
    badgeBg: "bg-black/60 border-white/20 text-purple-300",
    badgeDot: "bg-purple-400",
    metaText: "text-purple-300",
    metaIcon: "text-purple-400",
    buttonBg: "bg-purple-400 hover:bg-purple-300 text-stone-950 shadow-purple-950/40",
    secondaryBtn: "bg-white/10 hover:bg-white/15 text-white border-white/20",
  },
  rose: {
    cardBg: "from-[#260814] via-[#380C1E] to-[#16040C]",
    borderColor: "border-rose-800/50",
    glowColor: "bg-rose-500/10",
    badgeBg: "bg-black/60 border-white/20 text-rose-300",
    badgeDot: "bg-rose-400",
    metaText: "text-rose-300",
    metaIcon: "text-rose-400",
    buttonBg: "bg-rose-400 hover:bg-rose-300 text-stone-950 shadow-rose-950/40",
    secondaryBtn: "bg-white/10 hover:bg-white/15 text-white border-white/20",
  },
};

export function FeaturedPromoBanner({
  imageSrc,
  imageAlt,
  title,
  description,
  badge,
  meta = [],
  primaryCta,
  secondaryCta,
  note,
  colorTheme = "emerald",
  className,
}: FeaturedPromoBannerProps) {
  const theme = THEME_STYLES[colorTheme] || THEME_STYLES.emerald;
  const PrimaryIcon = primaryCta.icon || ArrowLeft;
  const BadgeIcon = badge?.icon;

  return (
    <div className={cn("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full select-none", className)} dir="rtl">
      {/* 
        Responsive Layout Architecture:
        - Mobile: Photo at top, Title/Sub/Buttons below
        - Laptop/Desktop: 50% Photo on the Right, 50% Content on the Left
      */}
      <div
        className={cn(
          "relative rounded-3xl md:rounded-[2.25rem] overflow-hidden bg-gradient-to-br border shadow-2xl text-white",
          theme.cardBg,
          theme.borderColor
        )}
      >
        {/* Subtle Ambient Backlight Glow */}
        <div className={cn("absolute top-0 end-0 w-96 h-96 rounded-full blur-3xl pointer-events-none", theme.glowColor)} />

        <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
          
          {/* 1. Large Photo Banner (Order 1: Top in Mobile, Right half in RTL Laptop) */}
          <div className="relative w-full h-52 sm:h-64 lg:h-full lg:min-h-[380px] overflow-hidden bg-stone-900 order-1">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover hover:scale-105 transition-transform duration-700"
              priority
            />
            {/* Ambient Edge Soft Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 lg:bg-gradient-to-l lg:from-transparent lg:via-transparent lg:to-black/70" />

            {/* Optional Floating Top Badge */}
            {badge && (
              <div
                className={cn(
                  "absolute top-3.5 start-3.5 flex items-center gap-1.5 px-3 py-1 rounded-full backdrop-blur-md border text-xs font-bold",
                  theme.badgeBg
                )}
              >
                {badge.pulse && <span className={cn("w-2 h-2 rounded-full animate-pulse", theme.badgeDot)} />}
                {BadgeIcon && <BadgeIcon className="w-3.5 h-3.5" />}
                <span>{badge.text}</span>
              </div>
            )}
          </div>

          {/* 2. Text Content & CTA (Order 2: Below photo on Mobile, Left half in RTL Laptop) */}
          <div className="p-6 sm:p-8 lg:p-12 space-y-4 sm:space-y-5 order-2 flex flex-col justify-center">
            
            <div className="space-y-2">
              {/* Optional Meta Tags (Date, Location, etc.) */}
              {meta.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
                  {meta.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <React.Fragment key={idx}>
                        <span className={cn("inline-flex items-center gap-1", theme.metaText)}>
                          {Icon && <Icon className={cn("w-3.5 h-3.5", theme.metaIcon)} />}
                          <span>{item.text}</span>
                        </span>
                        {idx < meta.length - 1 && <span className="text-stone-500">•</span>}
                      </React.Fragment>
                    );
                  })}
                </div>
              )}

              {/* Title */}
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight leading-snug">
                {title}
              </h2>

              {/* Description / Subtitle */}
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
                {description}
              </p>
            </div>

            {/* Action CTA Buttons & Micro-Note */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                href={primaryCta.href}
                className={cn(
                  "inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-black text-xs sm:text-sm transition-all duration-200 shadow-lg hover:scale-102 active:scale-98 cursor-pointer",
                  theme.buttonBg
                )}
              >
                <span>{primaryCta.label}</span>
                <PrimaryIcon className="w-4 h-4 stroke-[2.5]" />
              </Link>

              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className={cn(
                    "inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-200 backdrop-blur-md border hover:scale-102 active:scale-98 cursor-pointer",
                    theme.secondaryBtn
                  )}
                >
                  <span>{secondaryCta.label}</span>
                </Link>
              )}

              {note && (
                <span className="text-[11px] text-stone-400 text-center sm:text-right font-light">
                  {note}
                </span>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
