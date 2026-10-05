"use client";

import React from "react";
import Link from "next/link";
import { Stethoscope, MapPin, CalendarCheck, Clock } from "lucide-react";
import { BaseCard } from "./base-card";
import { RatingStars } from "@/ui/rating-stars";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { formatPersianNumber, formatPersianCurrency } from "@/lib/utils";

export interface VetCardProps {
  id: string;
  name: string;
  clinicName: string;
  specialty: string;
  avatarUrl: string;
  address: string;
  distanceKm?: number;
  rating: number;
  reviewCount: number;
  isOpen24h?: boolean;
  consultationFeeTomans?: number;
  onBookAppointment?: (vetId: string) => void;
}

export function VetCard({
  id,
  name,
  clinicName,
  specialty,
  avatarUrl,
  address,
  distanceKm,
  rating,
  reviewCount,
  isOpen24h = false,
  consultationFeeTomans,
  onBookAppointment,
}: VetCardProps) {
  return (
    <Link href={`/vets/${id}`} className="block h-full group focus:outline-hidden">
      <BaseCard
        imageSrc={avatarUrl || "/icons/health.svg"}
        imageAlt={name}
        imageAspectRatio="video"
        imageBadge={
          isOpen24h ? (
            <Badge variant="teal" size="sm" icon={<Clock className="w-3 h-3" />}>
              شبانهروزی
            </Badge>
          ) : undefined
        }
        headerTag={
          <Badge variant="teal" size="sm">
            {specialty}
          </Badge>
        }
        ratingSlot={<RatingStars rating={rating} reviewCount={reviewCount} size="sm" />}
        title={clinicName ? `${clinicName} - ${name}` : name}
        subtitle={
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
            <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
            <span className="truncate">{address}</span>
            {distanceKm !== undefined && (
              <span className="font-bold text-emerald-600 dark:text-emerald-400 shrink-0">
                ({formatPersianNumber(distanceKm)} کیلومتر)
              </span>
            )}
          </div>
        }
        priceOrFee={
          consultationFeeTomans ? (
            <div className="text-xs">
              <span className="text-muted-foreground">تعرفه ویزیت: </span>
              <span className="font-black text-foreground">
                {formatPersianCurrency(consultationFeeTomans)}
              </span>
            </div>
          ) : (
            <span className="text-xs text-muted-foreground">مشاوره حضوری و آنلاین</span>
          )
        }
        actionButton={
          <Button
            variant="primary"
            size="sm"
            onClick={(e) => {
              if (onBookAppointment) {
                e.preventDefault();
                onBookAppointment(id);
              }
            }}
            className="w-full text-xs"
            rightIcon={<CalendarCheck className="w-4 h-4" />}
          >
            رزرو آنلاین نوبت
          </Button>
        }
      />
    </Link>
  );
}
