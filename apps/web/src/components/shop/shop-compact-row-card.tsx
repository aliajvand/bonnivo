"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Check, Star, Store, Heart } from "lucide-react";
import { CatalogProduct } from "@/types/catalog";
import { useCart } from "@/context/cart-context";
import { usePet } from "@/context/pet-context";
import { cn } from "@/lib/utils";

interface ShopCompactRowCardProps {
  product: CatalogProduct;
  onAddToCart?: (product: CatalogProduct) => void;
}

export function ShopCompactRowCard({ product, onAddToCart }: ShopCompactRowCardProps) {
  const { addItem, items } = useCart();
  const { currentPet } = usePet();
  const [isAdded, setIsAdded] = useState(false);
  const [isWished, setIsWished] = useState(false);

  const buyBox = product.buyBoxOffer;
  const originalPrice = buyBox.priceToman;
  const discountedPrice = buyBox.discountedPriceToman;
  const hasDiscount = Boolean(discountedPrice && discountedPrice < originalPrice);
  const finalPrice = discountedPrice || originalPrice;
  const discountPercent = hasDiscount
    ? Math.round(((originalPrice - (discountedPrice || originalPrice)) / originalPrice) * 100)
    : 0;

  // Check how many of this item is in cart
  const cartItem = items.find((i) => i.productId === product.id);
  const inCartCount = cartItem?.quantity || 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    } else {
      addItem(product, buyBox, currentPet ? currentPet.id : null);
    }
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleWish = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWished(!isWished);
  };

  const hasColor = Boolean(product.colorVariants && product.colorVariants.length > 0);
  const hasWeight = Boolean(product.weightVariants && product.weightVariants.length > 1);
  const requiresCustomization = hasColor || hasWeight;

  return (
    <div
      className="group relative bg-surface hover:bg-surface-subtle/40 border border-border/80 hover:border-emerald-500/50 rounded-2xl sm:rounded-3xl p-2.5 sm:p-3 transition-all duration-200 shadow-2xs hover:shadow-md flex items-center justify-between gap-3 min-h-[92px] max-h-[110px] w-full select-none"
      dir="rtl"
    >
      {/* 1. Right Column: Compact Product Image (Square ~76px) */}
      <Link
        href={`/shop/${product.slug || product.id}`}
        className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-xl sm:rounded-2xl overflow-hidden bg-stone-50 dark:bg-stone-850/60 shrink-0 border border-border/50 flex items-center justify-center group-hover:scale-[1.02] transition-transform"
      >
        <Image
          src={product.imageSrc || "/icons/food.svg"}
          alt={product.titleFa}
          fill
          className="object-contain p-1.5"
          sizes="88px"
        />

        {/* Discount Badge */}
        {hasDiscount && (
          <span className="absolute top-1 end-1 px-1 py-0.2 rounded-md bg-rose-600 text-white font-mono font-black text-[9px] shadow-xs">
            {discountPercent.toLocaleString("fa-IR")}٪-
          </span>
        )}

        {/* Wishlist Heart */}
        <button
          type="button"
          onClick={handleWish}
          className="absolute bottom-1 start-1 p-1 rounded-lg bg-white/85 dark:bg-stone-900/80 backdrop-blur-xs text-stone-400 hover:text-rose-500 transition-colors shadow-2xs"
          aria-label="نشان کردن"
        >
          <Heart className={cn("w-3 h-3", isWished && "fill-rose-500 text-rose-500")} />
        </button>
      </Link>

      {/* 2. Center Column: Title, Subtitle, Rating, Seller */}
      <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch py-0.5">
        <div>
          {/* Top meta: Brand + Rating */}
          <div className="flex items-center justify-between text-[11px] mb-1">
            <span className="font-bold text-emerald-700 dark:text-emerald-400 truncate">
              {product.brand}
            </span>
            <div className="flex items-center gap-1 shrink-0 bg-stone-100/80 dark:bg-stone-800/80 px-1.5 py-0.2 rounded-md">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="font-mono font-bold text-foreground text-[10px]">
                {product.rating.toLocaleString("fa-IR")}
              </span>
            </div>
          </div>

          {/* Title */}
          <Link href={`/shop/${product.slug || product.id}`}>
            <h3 className="text-xs sm:text-sm font-bold text-foreground line-clamp-2 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors leading-snug">
              {product.titleFa}
            </h3>
          </Link>
        </div>

        {/* Bottom meta: Seller & Weight/Color preview */}
        <div className="flex items-center gap-2 text-[10px] text-stone-500 dark:text-stone-400 mt-1">
          <span className="truncate flex items-center gap-1">
            <Store className="w-3 h-3 text-stone-400 shrink-0" />
            <span className="truncate">{buyBox.storeNameFa}</span>
          </span>

          {product.weightText && (
            <span className="hidden xs:inline-block px-1.5 py-0.2 rounded-md bg-stone-100 dark:bg-stone-800 font-mono text-[9px]">
              {product.weightText}
            </span>
          )}

          {hasColor && (
            <span className="hidden xs:inline-flex items-center gap-0.5 text-[9px] text-stone-400">
              {product.colorVariants?.length.toLocaleString("fa-IR")} رنگ
            </span>
          )}
        </div>
      </div>

      {/* 3. Left Column: Price + Quick Add Button */}
      <div className="flex flex-col items-end justify-between self-stretch shrink-0 py-0.5 min-w-[76px] sm:min-w-[90px]">
        {/* Price stack */}
        <div className="text-end">
          {hasDiscount && (
            <span className="text-[10px] text-stone-400 line-through font-mono block leading-none mb-0.5">
              {originalPrice.toLocaleString("fa-IR")}
            </span>
          )}
          <div className="flex items-center gap-0.5 justify-end">
            <span className="font-mono font-black text-xs sm:text-sm text-foreground">
              {finalPrice.toLocaleString("fa-IR")}
            </span>
            <span className="text-[9px] text-stone-500 font-light">تومان</span>
          </div>
        </div>

        {/* Action Button: Green '+' or 'انتخاب' */}
        {requiresCustomization ? (
          <Link
            href={`/shop/${product.slug || product.id}`}
            className="h-8 px-2.5 rounded-xl bg-stone-100 hover:bg-emerald-600 hover:text-white dark:bg-stone-800 text-foreground text-[11px] font-bold transition-all flex items-center gap-1 shadow-2xs"
          >
            <span>{hasColor ? "انتخاب رنگ" : "انتخاب وزن"}</span>
          </Link>
        ) : (
          <button
            type="button"
            onClick={handleAdd}
            aria-label={`افزودن ${product.titleFa} به سبد خرید`}
            className={cn(
              "w-8 h-8 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-200 shadow-sm cursor-pointer",
              isAdded || inCartCount > 0
                ? "bg-emerald-700 text-white scale-105"
                : "bg-emerald-600 hover:bg-emerald-700 text-white active:scale-90"
            )}
          >
            {isAdded ? (
              <Check className="w-4 h-4 animate-in zoom-in" />
            ) : inCartCount > 0 ? (
              <span className="font-mono font-bold text-xs">{inCartCount.toLocaleString("fa-IR")}</span>
            ) : (
              <Plus className="w-4 h-4" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
