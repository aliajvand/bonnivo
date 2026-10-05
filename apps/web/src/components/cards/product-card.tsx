"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Check, Heart } from "lucide-react";
import { BaseCard } from "./base-card";
import { PriceTag } from "@/ui/price-tag";
import { RatingStars } from "@/ui/rating-stars";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { cn } from "@/lib/utils";

export interface ProductCardProps {
  id: string;
  slug: string;
  titleFa: string;
  brand: string;
  imageSrc: string;
  priceTomans: number;
  discountedPriceTomans?: number;
  stockQuantity: number;
  rating: number;
  reviewsCount: number;
  weightText?: string;
  isAvailable?: boolean;
  onAddToCart?: (productId: string) => void;
}

export function ProductCard({
  id,
  slug,
  titleFa,
  brand,
  imageSrc,
  priceTomans,
  discountedPriceTomans,
  stockQuantity,
  rating,
  reviewsCount,
  weightText,
  isAvailable = true,
  onAddToCart,
}: ProductCardProps) {
  const [isWished, setIsWished] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAvailable) return;
    onAddToCart?.(id);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const toggleWish = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWished(!isWished);
  };

  return (
    <Link href={`/shop/${slug}`} className="block h-full group focus:outline-hidden">
      <BaseCard
        imageSrc={imageSrc || "/icons/food.svg"}
        imageAlt={titleFa}
        imageAspectRatio="square"
        imageBadge={
          weightText ? (
            <Badge variant="neutral" size="sm">
              {weightText}
            </Badge>
          ) : undefined
        }
        favoriteButton={
          <button
            type="button"
            onClick={toggleWish}
            aria-label="افزودن به علاقه‌مندی‌ها"
            className="w-8 h-8 rounded-full bg-white/90 dark:bg-stone-800/90 shadow-xs flex items-center justify-center text-stone-400 hover:text-rose-500 hover:bg-white transition-colors"
          >
            <Heart
              className={cn(
                "w-4 h-4 transition-colors",
                isWished && "fill-rose-500 text-rose-500"
              )}
            />
          </button>
        }
        headerTag={
          <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md">
            {brand}
          </span>
        }
        ratingSlot={<RatingStars rating={rating} reviewCount={reviewsCount} size="sm" />}
        title={titleFa}
        priceOrFee={
          <PriceTag
            priceTomans={priceTomans}
            discountedPriceTomans={discountedPriceTomans}
            size="md"
          />
        }
        actionButton={
          isAvailable ? (
            <Button
              variant={isAdded ? "outline" : "primary"}
              size="sm"
              onClick={handleAdd}
              className="w-full text-xs font-bold"
              rightIcon={
                isAdded ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <ShoppingBag className="w-4 h-4" />
                )
              }
            >
              {isAdded ? "به سبد افزوده شد ✓" : "افزودن به سبد"}
            </Button>
          ) : (
            <Button variant="secondary" size="sm" disabled className="w-full text-xs">
              ناموجود در انبار
            </Button>
          )
        }
      />
    </Link>
  );
}
