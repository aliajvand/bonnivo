"use client";

import React from "react";
import Link from "next/link";
import { Home, ShieldCheck, MapPin, CalendarCheck } from "lucide-react";
import { BaseCard } from "./base-card";
import { RatingStars } from "@/ui/rating-stars";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";

export interface BoardingCardProps {
  id: string;
  nameFa: string;
  locationFa: string;
  rating: number;
  reviewCount: number;
  pricePerNightText: string;
  features: string[];
  imageSrc?: string;
  onReserve?: (boardingId: string) => void;
}

export function BoardingCard({
  id,
  nameFa,
  locationFa,
  rating,
  reviewCount,
  pricePerNightText,
  features,
  imageSrc,
  onReserve,
}: BoardingCardProps) {
  return (
    <Link href={`/boarding/${id}`} className="block h-full group focus:outline-hidden">
      <BaseCard
        imageSrc={imageSrc || "/icons/bonnivo-logo-mark.svg"}
        imageAlt={nameFa}
        imageAspectRatio="video"
        imageBadge={
          <Badge variant="gold" size="sm" icon={<ShieldCheck className="w-3 h-3" />}>
            استاندارد بونیو
          </Badge>
        }
        headerTag={
          <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
            تاییدیه بهداشتی
          </span>
        }
        ratingSlot={<RatingStars rating={rating} reviewCount={reviewCount} size="sm" />}
        title={nameFa}
        subtitle={
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
            <MapPin className="w-3.5 h-3.5 shrink-0 text-stone-400" />
            <span className="truncate">{locationFa}</span>
          </div>
        }
        features={features}
        priceOrFee={
          <div className="text-xs">
            <span className="text-muted-foreground">تعرفه هر شب: </span>
            <span className="font-black text-emerald-600 dark:text-emerald-400">
              {pricePerNightText}
            </span>
          </div>
        }
        actionButton={
          <Button
            variant="gold"
            size="sm"
            onClick={(e) => {
              if (onReserve) {
                e.preventDefault();
                onReserve(id);
              }
            }}
            className="w-full text-xs"
            rightIcon={<CalendarCheck className="w-4 h-4" />}
          >
            استعلام ظرفیت و رزرو
          </Button>
        }
      />
    </Link>
  );
}
