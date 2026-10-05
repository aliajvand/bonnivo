"use client";

import React from "react";
import Link from "next/link";
import { Award, Star, CalendarCheck, Dog } from "lucide-react";
import { BaseCard } from "./base-card";
import { RatingStars } from "@/ui/rating-stars";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { formatPersianNumber, formatPersianCurrency } from "@/lib/utils";

export interface TrainerCardProps {
  id: string;
  fullName: string;
  level: "SENIOR" | "EXPERT" | "MASTER";
  specialties: string[];
  avatarUrl: string;
  sessionPriceTomans: number;
  rating: number;
  totalTrainedPets: number;
  onSelect?: (trainerId: string) => void;
}

export function TrainerCard({
  id,
  fullName,
  level,
  specialties,
  avatarUrl,
  sessionPriceTomans,
  rating,
  totalTrainedPets,
  onSelect,
}: TrainerCardProps) {
  const levelLabels = {
    MASTER: "مربی ارشد بینالمللی",
    EXPERT: "متخصص رفتارشناسی",
    SENIOR: "مربی مجرب تاییدشده",
  };

  return (
    <Link href={`/trainers/${id}`} className="block h-full group focus:outline-hidden">
      <BaseCard
        imageSrc={avatarUrl || "/icons/dog.svg"}
        imageAlt={fullName}
        imageAspectRatio="video"
        imageBadge={
          <Badge variant="indigo" size="sm" icon={<Award className="w-3 h-3" />}>
            {levelLabels[level] || "مربی رسمی"}
          </Badge>
        }
        headerTag={
          <span className="text-[11px] font-bold text-muted-foreground flex items-center gap-1">
            <Dog className="w-3 h-3 text-purple-600" />
            <span>آموزش {formatPersianNumber(totalTrainedPets)} پت موفق</span>
          </span>
        }
        ratingSlot={<RatingStars rating={rating} size="sm" showCount={false} />}
        title={fullName}
        subtitle={
          <div className="text-xs text-muted-foreground truncate">
            {specialties.slice(0, 2).join(" • ")}
          </div>
        }
        features={specialties}
        priceOrFee={
          <div className="text-xs">
            <span className="text-muted-foreground">شهریه جلسه: </span>
            <span className="font-black text-foreground">
              {formatPersianCurrency(sessionPriceTomans)}
            </span>
          </div>
        }
        actionButton={
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              if (onSelect) {
                e.preventDefault();
                onSelect(id);
              }
            }}
            className="w-full text-xs font-bold"
            rightIcon={<CalendarCheck className="w-4 h-4 text-purple-600" />}
          >
            رزرو جلسه مشاوره
          </Button>
        }
      />
    </Link>
  );
}
