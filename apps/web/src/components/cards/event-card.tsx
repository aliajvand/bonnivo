"use client";

import React from "react";
import Link from "next/link";
import { Calendar, Clock, MapPin, Users, Ticket } from "lucide-react";
import { BaseCard } from "./base-card";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { PriceTag } from "@/ui/price-tag";
import { formatPersianNumber } from "@/lib/utils";

export interface EventCardProps {
  id: string;
  titleFa: string;
  dateFa: string;
  timeFa: string;
  locationFa: string;
  organizerFa: string;
  priceTomans: number; // 0 for free
  remainingSpots: number;
  capacityText?: string;
  onGetTicket?: (eventId: string) => void;
}

export function EventCard({
  id,
  titleFa,
  dateFa,
  timeFa,
  locationFa,
  organizerFa,
  priceTomans,
  remainingSpots,
  capacityText,
  onGetTicket,
}: EventCardProps) {
  return (
    <Link href={`/events/${id}`} className="block h-full group focus:outline-hidden">
      <BaseCard
        imageSrc="/icons/bonnivo-logo-mark.svg"
        imageAlt={titleFa}
        imageAspectRatio="video"
        imageBadge={
          <Badge variant="indigo" size="sm" icon={<Calendar className="w-3 h-3" />}>
            {dateFa}
          </Badge>
        }
        headerTag={
          <span className="text-[11px] font-bold text-muted-foreground truncate">
            {organizerFa}
          </span>
        }
        title={titleFa}
        subtitle={
          <div className="space-y-1 mt-1 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5 truncate">
              <Clock className="w-3.5 h-3.5 shrink-0 text-stone-400" />
              <span>{timeFa}</span>
            </div>
            <div className="flex items-center gap-1.5 truncate">
              <MapPin className="w-3.5 h-3.5 shrink-0 text-stone-400" />
              <span className="truncate">{locationFa}</span>
            </div>
            <div className="flex items-center gap-1.5 font-bold text-foreground">
              <Users className="w-3.5 h-3.5 shrink-0 text-indigo-500" />
              <span>
                {capacityText || `ظرفیت باقیمانده: ${formatPersianNumber(remainingSpots)} نفر`}
              </span>
            </div>
          </div>
        }
        priceOrFee={
          <PriceTag
            priceTomans={priceTomans}
            isFree={priceTomans === 0}
            size="md"
          />
        }
        actionButton={
          <Button
            variant="primary"
            size="sm"
            onClick={(e) => {
              if (onGetTicket) {
                e.preventDefault();
                onGetTicket(id);
              }
            }}
            className="w-full text-xs font-bold bg-indigo-600 hover:bg-indigo-700"
            rightIcon={<Ticket className="w-4 h-4" />}
          >
            مشاهده و دریافت بلیت (QR Pass)
          </Button>
        }
      />
    </Link>
  );
}
