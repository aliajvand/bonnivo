"use client";

import React, { useState, useEffect } from "react";
import { MapPin, Navigation, Compass, AlertCircle, RotateCw } from "lucide-react";
import { cn, formatPersianNumber } from "@/lib/utils";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface MapRouteViewProps {
  destinationTitle: string;
  destinationAddress: string;
  destinationCoords: Coordinates;
  initialUserCoords?: Coordinates;
  heightPx?: number;
  className?: string;
}

// Calculate distance via Haversine (km)
function calculateHaversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

export function MapRouteView({
  destinationTitle,
  destinationAddress,
  destinationCoords,
  initialUserCoords = { lat: 35.758, lng: 51.405 }, // Vanak, Tehran default
  heightPx = 280,
  className,
}: MapRouteViewProps) {
  const [userCoords, setUserCoords] = useState<Coordinates>(initialUserCoords);
  const [isLocating, setIsLocating] = useState(false);
  const [isLiveGps, setIsLiveGps] = useState(false);

  const distanceKm = calculateHaversineDistance(
    userCoords.lat,
    userCoords.lng,
    destinationCoords.lat,
    destinationCoords.lng
  );

  const handleRequestLiveLocation = () => {
    if (!navigator.geolocation) return;
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLiveGps(true);
        setIsLocating(false);
      },
      () => {
        setIsLocating(false);
      },
      { timeout: 8000 }
    );
  };

  return (
    <div
      className={cn(
        "rounded-3xl border border-border/80 bg-surface overflow-hidden shadow-xs relative select-none",
        className
      )}
      dir="rtl"
    >
      {/* Top Header Bar */}
      <div className="p-3.5 sm:p-4 bg-surface border-b border-border/60 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 truncate">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center shrink-0">
            <Compass className="w-4 h-4" />
          </div>
          <div className="truncate">
            <h4 className="text-xs sm:text-sm font-black text-foreground truncate">
              مسیر هوشمند تا {destinationTitle}
            </h4>
            <p className="text-[11px] text-muted-foreground truncate">{destinationAddress}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Badge variant="emerald" size="sm" icon={<Navigation className="w-3 h-3" />}>
            فاصله: {formatPersianNumber(distanceKm)} کیلومتر
          </Badge>

          <Button
            variant="secondary"
            size="sm"
            onClick={handleRequestLiveLocation}
            isLoading={isLocating}
            className="h-8 px-2.5 text-[11px] rounded-xl"
            title="به‌روزرسانی موقعیت مکانی فعلی"
          >
            {isLiveGps ? "موقعیت زنده GPS ✓" : "لوکیشن من"}
          </Button>
        </div>
      </div>

      {/* Interactive Map Visual with Route Canvas */}
      <div
        className="relative w-full bg-[#E5E9E3] dark:bg-stone-900 overflow-hidden"
        style={{ height: `${heightPx}px` }}
      >
        {/* Subtle Map Grid Pattern */}
        <div
          className="absolute inset-0 opacity-25 dark:opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(#0e9f6e 1px, transparent 1px), radial-gradient(#0e9f6e 1px, #E5E9E3 1px)",
            backgroundSize: "24px 24px",
            backgroundPosition: "0 0, 12px 12px",
          }}
        />

        {/* SVG Route Connector */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="routeGradient" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
          </defs>

          {/* Curved Dashed Route Path */}
          <path
            d="M 120 200 Q 240 70 380 90 T 560 120"
            fill="none"
            stroke="url(#routeGradient)"
            strokeWidth="3.5"
            strokeDasharray="8 6"
            strokeLinecap="round"
            className="animate-pulse"
          />
        </svg>

        {/* Origin Marker (User) */}
        <div className="absolute left-[100px] bottom-[60px] flex flex-col items-center group cursor-pointer z-10">
          <div className="relative flex items-center justify-center">
            <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-emerald-400 opacity-40" />
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-md border-2 border-white">
              <Navigation className="w-4 h-4 fill-current rotate-45" />
            </div>
          </div>
          <span className="mt-1 text-[10px] font-black bg-surface/90 text-foreground px-2 py-0.5 rounded-md shadow-xs border border-border/80">
            موقعیت شما
          </span>
        </div>

        {/* Destination Marker (Clinic/Boarding/Event) */}
        <div className="absolute right-[80px] top-[70px] flex flex-col items-center group cursor-pointer z-10">
          <div className="w-10 h-10 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-lg border-2 border-white animate-bounce">
            <MapPin className="w-5 h-5 fill-current" />
          </div>
          <span className="mt-1 text-[11px] font-black bg-surface/90 text-foreground px-2 py-0.5 rounded-md shadow-xs border border-border/80 truncate max-w-[140px]">
            {destinationTitle}
          </span>
        </div>

        {/* Bottom Floating Route Info pill */}
        <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between p-2 rounded-2xl bg-surface/90 backdrop-blur-md border border-border/80 text-xs">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>مسیر بهینه شهری با خودرو: حدود {formatPersianNumber(Math.max(5, Math.round(distanceKm * 2.2)))} دقیقه</span>
          </div>

          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${destinationCoords.lat},${destinationCoords.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1"
          >
            <span>مسیریابی در نقشه</span>
            <span>←</span>
          </a>
        </div>
      </div>
    </div>
  );
}
