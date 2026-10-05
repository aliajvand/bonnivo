"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BaseCardProps {
  imageSrc: string;
  imageAlt: string;
  imageAspectRatio?: "square" | "video"; // square for products, video (16:10) for clinics/events
  imageBadge?: React.ReactNode;
  favoriteButton?: React.ReactNode;
  headerTag?: React.ReactNode;
  title: string;
  subtitle?: React.ReactNode;
  ratingSlot?: React.ReactNode;
  features?: string[];
  priceOrFee?: React.ReactNode;
  actionButton: React.ReactNode;
  href?: string;
  className?: string;
}

export function BaseCard({
  imageSrc,
  imageAlt,
  imageAspectRatio = "square",
  imageBadge,
  favoriteButton,
  headerTag,
  title,
  subtitle,
  ratingSlot,
  features,
  priceOrFee,
  actionButton,
  href,
  className,
}: BaseCardProps) {
  const content = (
    <div
      className={cn(
        "group relative flex flex-col justify-between rounded-3xl bg-surface border border-border/80 p-4 transition-all duration-300 hover:shadow-lg hover:border-emerald-600/30 hover:-translate-y-1 h-full min-h-[380px] sm:min-h-[420px] select-none",
        className
      )}
      dir="rtl"
    >
      {/* 1. Top Section: Image, Badges, Favorite */}
      <div>
        <div
          className={cn(
            "relative w-full rounded-2xl bg-[#F7F8F6] dark:bg-stone-900/60 p-2 overflow-hidden flex items-center justify-center mb-3",
            imageAspectRatio === "square" ? "aspect-square" : "aspect-[16/10]"
          )}
        >
          {/* Image */}
          <div className="relative w-full h-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              className="object-contain p-2"
            />
          </div>

          {/* Image Badge (e.g. discount or status) */}
          {imageBadge && (
            <div className="absolute top-2.5 right-2.5 z-10">{imageBadge}</div>
          )}

          {/* Favorite Button */}
          {favoriteButton && (
            <div className="absolute top-2.5 left-2.5 z-10">{favoriteButton}</div>
          )}
        </div>

        {/* 2. Metadata Section: Header Tag & Rating */}
        <div className="flex items-center justify-between gap-2 mb-1.5 min-h-[22px]">
          {headerTag && <div className="truncate">{headerTag}</div>}
          {ratingSlot && <div className="shrink-0">{ratingSlot}</div>}
        </div>

        {/* 3. Title (Locked height to prevent uneven grids) */}
        <h3
          className="text-xs sm:text-sm font-black text-foreground line-clamp-2 h-10 leading-snug group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors"
          title={title}
        >
          {title}
        </h3>

        {/* 4. Subtitle / Location / Specialty */}
        {subtitle && <div className="mt-1 text-xs text-muted-foreground truncate">{subtitle}</div>}

        {/* 5. Features bullets (optional) */}
        {features && features.length > 0 && (
          <div className="mt-2.5 space-y-1 pt-2 border-t border-border/50 text-[11px] text-muted-foreground">
            {features.slice(0, 3).map((f, idx) => (
              <div key={idx} className="flex items-center gap-1.5 truncate">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="truncate">{f}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 6. Bottom Section: Price & Action */}
      <div className="pt-3 border-t border-border/60 mt-3 space-y-3">
        {priceOrFee && <div className="flex items-center justify-between">{priceOrFee}</div>}
        <div>{actionButton}</div>
      </div>
    </div>
  );

  if (href) {
    return (
      <div className="h-full">
        {content}
      </div>
    );
  }

  return content;
}
