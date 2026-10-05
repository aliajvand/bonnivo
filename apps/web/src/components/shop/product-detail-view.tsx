"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  ShoppingBag,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Box,
  Plus,
  Minus,
  Check,
  Heart,
  Share2,
  Sparkles,
  Store,
  ChevronLeft,
  ChevronRight,
  Leaf,
  Zap,
  Award,
  CircleAlert,
  ClipboardList,
  MessageSquare,
} from "lucide-react";
import { CatalogProduct, ProductWeightVariant, ProductColorVariant } from "@/types/catalog";
import { usePet } from "@/context/pet-context";
import { useCart } from "@/context/cart-context";
import { cn } from "@/lib/utils";
import { FeaturedProductsRow } from "@/components/home/featured-products-row";
import { mockCatalogProducts } from "@/data/mock-catalog";

interface ProductDetailViewProps {
  product: CatalogProduct;
}

export function ProductDetailView({ product }: ProductDetailViewProps) {
  const router = useRouter();
  const { currentPet } = usePet();
  const { addItem, itemsCount } = useCart();

  // Active variants state
  const [selectedWeightId, setSelectedWeightId] = useState<string>(
    product.weightVariants?.[0]?.id || "default"
  );
  const [selectedColorId, setSelectedColorId] = useState<string>(
    product.colorVariants?.[0]?.id || ""
  );

  const [quantity, setQuantity] = useState<number>(1);
  const [isWished, setIsWished] = useState<boolean>(false);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [isAddedToast, setIsAddedToast] = useState<boolean>(false);
  const [is3DMode, setIs3DMode] = useState<boolean>(false);
  const [rotationDegree, setRotationDegree] = useState<number>(0);

  // Active weight variant resolution
  const activeWeightVariant: ProductWeightVariant | null = useMemo(() => {
    if (!product.weightVariants || product.weightVariants.length === 0) return null;
    return (
      product.weightVariants.find((v) => v.id === selectedWeightId) ||
      product.weightVariants[0]
    );
  }, [product.weightVariants, selectedWeightId]);

  // Active color variant resolution
  const activeColorVariant: ProductColorVariant | null = useMemo(() => {
    if (!product.colorVariants || product.colorVariants.length === 0) return null;
    return (
      product.colorVariants.find((c) => c.id === selectedColorId) ||
      product.colorVariants[0]
    );
  }, [product.colorVariants, selectedColorId]);

  // Gallery images array
  const galleryImages = useMemo(() => {
    if (product.galleryImages && product.galleryImages.length > 0) {
      return product.galleryImages;
    }
    return [product.imageSrc, product.imageSrc, product.imageSrc];
  }, [product]);

  // Price calculations
  const effectivePrice = activeWeightVariant
    ? activeWeightVariant.discountedPriceToman || activeWeightVariant.priceToman
    : product.buyBoxOffer?.discountedPriceToman || product.buyBoxOffer?.priceToman || 1000000;

  const originalPrice = activeWeightVariant
    ? activeWeightVariant.priceToman
    : product.buyBoxOffer?.priceToman || 1000000;

  const hasDiscount = Boolean(originalPrice > effectivePrice);
  const discountPercent = hasDiscount
    ? Math.round(((originalPrice - effectivePrice) / originalPrice) * 100)
    : 0;

  // Add to Cart handler
  const handleAddToCart = () => {
    addItem(
      product,
      product.buyBoxOffer,
      currentPet ? currentPet.id : null,
      activeWeightVariant,
      quantity
    );
    setIsAddedToast(true);
    setTimeout(() => setIsAddedToast(false), 2500);
  };

  // Buy Now handler (Fast checkout)
  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/cart");
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  // Related products
  const relatedProducts = useMemo(() => {
    return mockCatalogProducts.filter((p) => p.id !== product.id).slice(0, 8);
  }, [product.id]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-10" dir="rtl">
      {/* 1. Breadcrumb Navigation (matching Image 4: Home / Category / Subcategory / Product) */}
      <nav aria-label="مسیر راهنما" className="flex items-center justify-between text-xs text-stone-500">
        <div className="flex items-center gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-foreground transition-colors">
            خانه
          </Link>
          <span className="text-stone-300 dark:text-stone-700">/</span>
          <Link href="/shop" className="hover:text-foreground transition-colors">
            فروشگاه
          </Link>
          <span className="text-stone-300 dark:text-stone-700">/</span>
          <Link
            href={`/shop?category=${product.category}`}
            className="hover:text-foreground transition-colors font-medium text-emerald-700 dark:text-emerald-400"
          >
            {product.category === "food"
              ? "غذای پت"
              : product.category === "treats"
              ? "تشویقی"
              : product.category === "accessories"
              ? "قلاده و خواب"
              : product.category === "health"
              ? "سلامت و مکمل"
              : product.category === "hygiene"
              ? "خاک و بهداشت"
              : "اسباب‌بازی"}
          </Link>
          <span className="text-stone-300 dark:text-stone-700">/</span>
          <span className="text-stone-800 dark:text-stone-200 font-bold truncate max-w-[200px] sm:max-w-md">
            {product.titleFa}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsWished(!isWished)}
            className="p-2 rounded-2xl bg-surface border border-border/70 hover:border-border text-stone-400 hover:text-rose-500 transition-colors shadow-2xs cursor-pointer"
            aria-label="افزودن به علاقه‌مندی‌ها"
          >
            <Heart className={cn("w-4 h-4", isWished && "fill-rose-500 text-rose-500")} />
          </button>
          <Link
            href="/cart"
            className="relative p-2 rounded-2xl bg-surface border border-border/70 hover:border-border text-stone-600 dark:text-stone-300 transition-colors shadow-2xs"
            aria-label="سبد خرید"
          >
            <ShoppingBag className="w-4 h-4" />
            {itemsCount > 0 && (
              <span className="absolute -top-1 -start-1 bg-emerald-600 text-white text-[9px] font-mono font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {itemsCount}
              </span>
            )}
          </Link>
        </div>
      </nav>

      {/* 2. Main Product Showcase & Buy Section (Exact layout architecture matching Image 4) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* SIDE 1: Product Gallery & Presentation (Large minimal canvas with arrows & dots) */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div className="relative w-full aspect-square max-w-[500px] rounded-3xl sm:rounded-4xl bg-surface border border-border/80 p-8 flex items-center justify-center shadow-xs overflow-hidden group">
            {/* 3D Mode Toggle Badge */}
            <div className="absolute top-4 start-4 z-10">
              <button
                type="button"
                onClick={() => setIs3DMode(!is3DMode)}
                className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-surface-elevated/90 backdrop-blur-md border border-border/80 text-[11px] font-bold text-foreground shadow-2xs hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Box className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>{is3DMode ? "نمای سه‌بعدی" : "نمای کاتالوگ"}</span>
              </button>
            </div>

            {/* Next & Previous image arrow buttons (matching Image 4 arrows!) */}
            <button
              type="button"
              onClick={handlePrevImage}
              aria-label="تصویر قبلی"
              className="absolute start-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/90 dark:bg-stone-900/90 border border-border/80 shadow-md flex items-center justify-center text-foreground hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-all opacity-80 group-hover:opacity-100 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={handleNextImage}
              aria-label="تصویر بعدی"
              className="absolute end-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/90 dark:bg-stone-900/90 border border-border/80 shadow-md flex items-center justify-center text-foreground hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-all opacity-80 group-hover:opacity-100 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Main Product Image */}
            <div
              className="relative w-full h-full flex items-center justify-center transition-transform duration-500"
              style={{
                transform: is3DMode
                  ? `perspective(800px) rotateY(${rotationDegree}deg) scale(1.05)`
                  : "none",
              }}
            >
              <Image
                src={galleryImages[activeImageIndex] || product.imageSrc || "/icons/food.svg"}
                alt={product.titleFa}
                fill
                className="object-contain p-6 group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 500px"
                priority
              />
            </div>
          </div>

          {/* Dots Indicator (matching Image 4 dots!) */}
          <div className="flex items-center gap-2 mt-4">
            {galleryImages.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImageIndex(idx)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300 cursor-pointer",
                  activeImageIndex === idx ? "w-6 bg-emerald-600" : "w-2 bg-stone-300 dark:bg-stone-700"
                )}
                aria-label={`عکس ${idx + 1}`}
              />
            ))}
          </div>

          {/* Color Preview Swatches (Available in X colors - matching Image 4 color preview) */}
          {product.colorVariants && product.colorVariants.length > 0 && (
            <div className="flex flex-col items-center gap-1.5 mt-3">
              <span className="text-[11px] text-stone-400 font-medium">
                موجود در {product.colorVariants.length.toLocaleString("fa-IR")} رنگ متنوع
              </span>
              <div className="flex items-center gap-1.5">
                {product.colorVariants.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedColorId(c.id)}
                    style={{ backgroundColor: c.hex }}
                    className={cn(
                      "w-4 h-4 rounded-full border border-black/10 transition-transform cursor-pointer",
                      selectedColorId === c.id ? "scale-125 ring-2 ring-emerald-500 ring-offset-1" : "hover:scale-110"
                    )}
                    title={c.nameFa}
                    aria-label={c.nameFa}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* SIDE 2: Product Purchase Details Panel (Responsive with flex ordering) */}
        <div className="lg:col-span-6 flex flex-col gap-5">
          {/* 1. Best Seller / Red Badge + Title + Brand/Rating */}
          <div className="order-1">
            <div className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-2.5 py-0.5 rounded-full border border-rose-200/50 mb-2">
              <Sparkles className="w-3 h-3" />
              <span>پرفروش‌ترین محصول (Best Seller)</span>
            </div>

            {/* Product Title */}
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-foreground tracking-tight leading-snug">
              {product.titleFa}
            </h1>

            {/* Brand + Rating (matching Image 4: 4/5 (1,100 ratings)) */}
            <div className="flex items-center gap-3 mt-2 text-xs text-stone-500 flex-wrap">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-mono font-bold text-foreground">
                  {product.rating.toLocaleString("fa-IR")}
                </span>
                <span className="text-stone-400">از ۵</span>
              </div>
              <span className="text-stone-300 dark:text-stone-700">•</span>
              <span className="font-medium">
                ({product.reviewsCount.toLocaleString("fa-IR")} نظر خریداران)
              </span>
              <span className="text-stone-300 dark:text-stone-700">•</span>
              <span className="font-bold text-emerald-700 dark:text-emerald-400 font-mono">
                {product.brand}
              </span>
            </div>
          </div>

          {/* 2. Price Stack (CSS selector 1: Desktop under title, Mobile directly above Add to Cart button) */}
          <div className="order-5 lg:order-2 p-4 sm:p-5 rounded-3xl bg-surface border border-border/80 shadow-2xs space-y-2.5 transition-all">
            <div className="flex items-baseline justify-between flex-wrap gap-2">
              <div className="flex items-baseline gap-2">
                <span className="font-mono font-black text-2xl sm:text-3xl text-foreground">
                  {effectivePrice.toLocaleString("fa-IR")}
                </span>
                <span className="text-xs sm:text-sm text-stone-500 font-light">تومان</span>

                {hasDiscount && (
                  <div className="flex items-center gap-2 ms-2 sm:ms-3">
                    <span className="text-xs text-stone-400 line-through font-mono">
                      {originalPrice.toLocaleString("fa-IR")}
                    </span>
                    <span className="px-2 py-0.5 rounded-lg bg-rose-600 text-white font-mono font-black text-[10px]">
                      {discountPercent.toLocaleString("fa-IR")}٪ تخفیف
                    </span>
                  </div>
                )}
              </div>

              {quantity > 1 && (
                <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-xl border border-emerald-200/50">
                  <span>مجموع ({quantity.toLocaleString("fa-IR")} عدد): </span>
                  <strong className="font-mono">
                    {(effectivePrice * quantity).toLocaleString("fa-IR")}
                  </strong>
                  <span className="text-[10px] font-normal ms-1">تومان</span>
                </div>
              )}
            </div>

            {/* Buy Box Seller badge */}
            <div className="flex items-center justify-between text-xs pt-2.5 border-t border-border/50 flex-wrap gap-2">
              <span className="text-stone-500 flex items-center gap-1.5">
                <Store className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>فروشنده برنده جعبه خرید (Buy Box):</span>
                <strong className="text-foreground">{product.buyBoxOffer.storeNameFa}</strong>
              </span>
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                <span>کمترین قیمت تضمین‌شده</span>
              </span>
            </div>
          </div>

          {/* 3. Feature Highlights List with Minimalist Icons */}
          <div className="order-2 lg:order-3 space-y-2.5 py-2">
            {product.features && product.features.length > 0 ? (
              product.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-stone-600 dark:text-stone-300">
                  <div className="w-5 h-5 rounded-md bg-stone-100 dark:bg-stone-850 flex items-center justify-center shrink-0 mt-0.5 text-emerald-600">
                    {feat.icon === "leaf" ? (
                      <Leaf className="w-3.5 h-3.5" />
                    ) : feat.icon === "truck" ? (
                      <Truck className="w-3.5 h-3.5" />
                    ) : feat.icon === "award" ? (
                      <Award className="w-3.5 h-3.5" />
                    ) : (
                      <ShieldCheck className="w-3.5 h-3.5" />
                    )}
                  </div>
                  <div>
                    <strong className="font-bold text-foreground block">{feat.titleFa}</strong>
                    {feat.descFa && <span className="text-stone-400 text-[11px] font-light">{feat.descFa}</span>}
                  </div>
                </div>
              ))
            ) : (
              <>
                <div className="flex items-center gap-2.5 text-xs text-stone-600 dark:text-stone-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>تضمین ۱۰۰٪ اصالت فیزیکی و تاریخ انقضای معتبر کارخانه</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-stone-600 dark:text-stone-300">
                  <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>تحویل اکسپرس ۲ الی ۴ ساعته در تمامی مناطق تهران</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-stone-600 dark:text-stone-300">
                  <Leaf className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>فاقد رنگ‌های مصنوعی، مواد شیمیایی مضر و اسانس نگهدارنده</span>
                </div>
              </>
            )}
          </div>

          {/* 4. DYNAMIC VARIANT SELECTOR (Colors or Weights customized per product!) */}
          <div className="order-3 lg:order-4 space-y-4">
            {/* A. If product has Color Variants */}
            {product.colorVariants && product.colorVariants.length > 0 && (
              <div className="space-y-2 pt-1 border-t border-border/50">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-foreground">
                    انتخاب رنگ:{" "}
                    <strong className="text-emerald-700 dark:text-emerald-400">
                      {activeColorVariant?.nameFa}
                    </strong>
                  </span>
                  <span className="text-[11px] text-stone-400">
                    {product.colorVariants.length.toLocaleString("fa-IR")} رنگ موجود
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  {product.colorVariants.map((col) => {
                    const isSelected = selectedColorId === col.id;
                    return (
                      <button
                        key={col.id}
                        type="button"
                        onClick={() => setSelectedColorId(col.id)}
                        className={cn(
                          "w-8 h-8 rounded-full transition-all flex items-center justify-center cursor-pointer shadow-2xs relative",
                          isSelected
                            ? "ring-3 ring-emerald-600 ring-offset-2 scale-110"
                            : "hover:scale-105 opacity-90 hover:opacity-100"
                        )}
                        style={{ backgroundColor: col.hex }}
                        aria-label={col.nameFa}
                        title={col.nameFa}
                      >
                        {isSelected && (
                          <Check className="w-3.5 h-3.5 text-white drop-shadow-md" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* B. If product has Weight Variants */}
            {product.weightVariants && product.weightVariants.length > 0 && (
              <div className="space-y-2 pt-1 border-t border-border/50">
                <label className="text-xs font-bold text-foreground block">
                  انتخاب وزن بسته‌بندی:{" "}
                  <span className="text-emerald-700 dark:text-emerald-400">
                    {activeWeightVariant?.labelFa}
                  </span>
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {product.weightVariants.map((variant) => {
                    const isSelected = selectedWeightId === variant.id;
                    return (
                      <button
                        key={variant.id}
                        type="button"
                        onClick={() => setSelectedWeightId(variant.id)}
                        className={cn(
                          "px-3.5 py-2.5 rounded-2xl text-xs font-bold border transition-all cursor-pointer flex flex-col items-start gap-1 w-full",
                          isSelected
                            ? "bg-emerald-700 text-white border-emerald-700 shadow-sm ring-2 ring-emerald-700/20"
                            : "bg-surface text-stone-600 dark:text-stone-300 border-border/80 hover:border-emerald-500/50 hover:bg-surface-subtle"
                        )}
                      >
                        <span className="line-clamp-1">{variant.labelFa}</span>
                        <span className={cn("text-[10px] font-mono", isSelected ? "text-emerald-100" : "text-stone-400")}>
                          {(variant.discountedPriceToman || variant.priceToman).toLocaleString("fa-IR")} تومان
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* 5. Item Quantity Stepper */}
          <div className="order-4 lg:order-5 space-y-1.5 pt-1">
            <span className="text-xs font-bold text-foreground block">تعداد سفارش:</span>
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-stone-100 dark:bg-stone-850 rounded-2xl border border-border/70 p-1">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-9 h-9 rounded-xl bg-surface hover:bg-stone-200 dark:hover:bg-stone-800 text-foreground flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
                  aria-label="کاهش تعداد"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-12 text-center font-mono font-black text-sm text-foreground">
                  {quantity.toLocaleString("fa-IR")}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-9 h-9 rounded-xl bg-surface hover:bg-stone-200 dark:hover:bg-stone-800 text-foreground flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
                  aria-label="افزایش تعداد"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <span className="text-[11px] text-stone-400">
                موجودی انبار: {product.buyBoxOffer.stockQuantity.toLocaleString("fa-IR")} عدد
              </span>
            </div>
          </div>

          {/* 6. Action CTAs (matching Image 4: Buy Now primary + Add to Cart secondary) */}
          <div className="order-6 space-y-2.5 pt-2">
            <button
              type="button"
              onClick={handleBuyNow}
              className="w-full min-h-[48px] py-3.5 px-6 rounded-2xl bg-emerald-700 hover:bg-emerald-800 active:scale-[0.99] text-white font-black text-sm shadow-md shadow-emerald-700/20 transition-all flex items-center justify-center gap-2 cursor-pointer touch-manipulation"
            >
              <span>خرید فوری (Buy Now)</span>
            </button>

            <button
              type="button"
              onClick={handleAddToCart}
              className="w-full min-h-[48px] py-3.5 px-6 rounded-2xl bg-surface hover:bg-surface-subtle border border-border/90 active:scale-[0.99] text-foreground font-bold text-sm shadow-2xs transition-all flex items-center justify-center gap-2 cursor-pointer touch-manipulation"
            >
              <ShoppingBag className="w-4 h-4 text-emerald-600" />
              <span>افزودن به سبد خرید</span>
            </button>

            {/* Toast Confirmation */}
            {isAddedToast && (
              <div className="p-3 rounded-2xl bg-emerald-600 text-white text-xs font-bold flex items-center justify-between shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-200">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>محصول به سبد خرید اضافه شد!</span>
                </div>
                <Link href="/cart" className="underline font-black ms-3">
                  مشاهده سبد
                </Link>
              </div>
            )}
          </div>

          {/* 7. Shipping Policy Box */}
          <div className="order-7 p-4 rounded-3xl bg-stone-50 dark:bg-stone-900/60 border border-border/70 space-y-2 text-xs text-stone-600 dark:text-stone-300">
            <div className="font-bold text-foreground flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-emerald-600" />
              <span>ضوابط ارسال و تحویل بونیو:</span>
            </div>
            <ul className="space-y-1 text-[11px] list-disc list-inside text-stone-500 font-light">
              <li>تحویل سفارش ۲ تا ۴ ساعت کاری در کلیه مناطق ۲۲‌گانه تهران.</li>
              <li>ارسال رایگان سراسری برای سفارش‌های بالاتر از ۶۰۰ هزار تومان.</li>
              <li>۷ روز ضمانت بازگشت بی‌قیدوشرط در صورت عدم سازگاری یا باز نشدن پلمپ.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3. Specifications, Ingredients, and Buyer Reviews Tabs */}
      <ProductDetailsTabs product={product} />

      {/* 4. Related Products Row (Horizontal scroll component from home page) */}
      <section className="space-y-4 pt-6 border-t border-border/60">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg sm:text-xl font-black text-foreground">
              محصولات مرتبط و مکمل
            </h3>
            <p className="text-xs text-stone-400 font-light">
              پیشنهاد شده توسط دامپزشکان بونیو بر اساس سلیقه و سن پت
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:opacity-80 transition-opacity"
          >
            <span>مشاهده همه</span>
            <ArrowRight className="w-3.5 h-3.5 -scale-x-100" />
          </Link>
        </div>

        <FeaturedProductsRow products={relatedProducts} />
      </section>
    </div>
  );
}

function ProductDetailsTabs({ product }: { product: CatalogProduct }) {
  const [activeTab, setActiveTab] = useState<"specs" | "reviews" | "guarantee">("specs");

  return (
    <div className="pt-6 border-t border-border/70 space-y-6">
      {/* Tab Navigation - Modern Segmented Control matching international e-commerce standards */}
      <div
        role="tablist"
        aria-label="اطلاعات تکمیلی محصول"
        className="w-full p-1.5 rounded-2xl sm:rounded-3xl bg-surface-subtle/80 border border-border/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar shadow-2xs"
      >
        <button
          role="tab"
          id="tab-specs"
          aria-selected={activeTab === "specs"}
          aria-controls="panel-specs"
          type="button"
          onClick={() => setActiveTab("specs")}
          className={cn(
            "flex-1 min-w-[140px] sm:min-w-0 min-h-[44px] py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer select-none",
            activeTab === "specs"
              ? "bg-surface text-emerald-700 dark:text-emerald-400 shadow-xs border border-border/90 font-black"
              : "text-stone-500 hover:text-foreground hover:bg-surface/50"
          )}
        >
          <ClipboardList className="w-4 h-4 shrink-0 text-emerald-600" />
          <span className="truncate">مشخصات فنی و تغذیه‌ای</span>
        </button>

        <button
          role="tab"
          id="tab-reviews"
          aria-selected={activeTab === "reviews"}
          aria-controls="panel-reviews"
          type="button"
          onClick={() => setActiveTab("reviews")}
          className={cn(
            "flex-1 min-w-[140px] sm:min-w-0 min-h-[44px] py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer select-none",
            activeTab === "reviews"
              ? "bg-surface text-emerald-700 dark:text-emerald-400 shadow-xs border border-border/90 font-black"
              : "text-stone-500 hover:text-foreground hover:bg-surface/50"
          )}
        >
          <MessageSquare className="w-4 h-4 shrink-0 text-amber-500" />
          <span className="truncate">دیدگاه خریداران</span>
          <span
            className={cn(
              "px-1.5 py-0.5 rounded-full text-[10px] font-mono",
              activeTab === "reviews"
                ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold"
                : "bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-400"
            )}
          >
            {product.reviewsCount.toLocaleString("fa-IR")}
          </span>
        </button>

        <button
          role="tab"
          id="tab-guarantee"
          aria-selected={activeTab === "guarantee"}
          aria-controls="panel-guarantee"
          type="button"
          onClick={() => setActiveTab("guarantee")}
          className={cn(
            "flex-1 min-w-[140px] sm:min-w-0 min-h-[44px] py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer select-none",
            activeTab === "guarantee"
              ? "bg-surface text-emerald-700 dark:text-emerald-400 shadow-xs border border-border/90 font-black"
              : "text-stone-500 hover:text-foreground hover:bg-surface/50"
          )}
        >
          <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600" />
          <span className="truncate">ضمانت اصالت و بازگشت</span>
        </button>
      </div>

      {/* Tab Content */}
      <div
        role="tabpanel"
        id={`panel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
      >
      {activeTab === "specs" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-surface p-6 rounded-3xl border border-border/80 shadow-2xs">
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-foreground text-sm mb-3">اطلاعات کالا و سازگاری پت</h4>
            <div className="divide-y divide-border/50">
              <div className="flex justify-between py-2.5">
                <span className="text-stone-500">برند تجاری:</span>
                <span className="font-bold font-mono text-foreground">{product.brand}</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-stone-500">گونه هدف:</span>
                <span className="font-bold text-foreground">
                  {product.targetSpecies === "CAT" ? "گربه 🐱" : product.targetSpecies === "DOG" ? "سگ 🐶" : "تمام حیوانات خانگی 🐾"}
                </span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-stone-500">وزن بسته‌بندی:</span>
                <span className="font-bold font-mono text-foreground">{product.weightText || "استاندارد"}</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-stone-500">کد محصول (SKU):</span>
                <span className="font-mono text-stone-400">{product.id}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-foreground text-sm mb-3">توضیحات و مزایای تخصصی</h4>
            <p className="text-stone-600 dark:text-stone-300 leading-relaxed font-light">
              {product.descriptionFa || "محصولی با کیفیت فوق‌العاده بالا تأمین شده مستقیم از واردکنندگان رسمی و دارای هولوگرام اصالت کالا."}
            </p>
            <div className="p-3.5 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200/50 dark:border-emerald-800/40 text-[11px] text-emerald-800 dark:text-emerald-300 space-y-1">
              <strong>توصیه کارشناس تغذیه بونیو:</strong>
              <p>تغییر رژیم غذایی پت را به تدریج طی مدت ۷ روز انجام دهید تا دستگاه گوارش به آسانی سازگار شود.</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "reviews" && (
        <div className="space-y-4">
          <div className="bg-surface p-6 rounded-3xl border border-border/80 shadow-2xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center font-mono font-black text-emerald-700">
                {product.rating}
              </div>
              <div>
                <strong className="text-sm font-bold text-foreground block">میانگین رضایت خریداران</strong>
                <span className="text-xs text-stone-400 font-light">
                  بر اساس {product.reviewsCount} نظر ثبت‌شده توسط خریداران قطعی
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-850/60 border border-border/50 text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              «کیفیت عالی، تاریخ مصرف طولانی و بسته‌بندی کاملاً پلمپ. پت من خیلی خوشش اومد و تحویل سریع بونیو هم بدون تأخیر انجام شد.»
              <span className="block mt-2 font-bold text-stone-500">— مریم احمدی (خریدار تأییدشده)</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === "guarantee" && (
        <div className="bg-surface p-6 rounded-3xl border border-border/80 shadow-2xs space-y-3 text-xs leading-relaxed text-stone-600 dark:text-stone-300">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
            <ShieldCheck className="w-5 h-5" />
            <span>ضمانت اصالت و مرجوعی ۴ ساعته وجه در بونیو</span>
          </div>
          <p>
            چنانچه هرگونه مغایرت در مشخصات، آسیب فیزیکی به بسته‌بندی در زمان تحویل توسط پیک، یا عدم تطابق تاریخ انقضا وجود داشته باشد، کل مبلغ سفارش ظرف حداکثر ۴ ساعت به کیف‌پول شما برگشت داده می‌شود.
          </p>
        </div>
      )}
      </div>
    </div>
  );
}
