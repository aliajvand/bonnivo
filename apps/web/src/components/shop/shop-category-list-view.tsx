"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Filter,
  SlidersHorizontal,
  ChevronDown,
  Check,
  RotateCcw,
  Sparkles,
  Store,
  Grid,
  List,
  Search,
  Zap,
} from "lucide-react";
import { mockCatalogProducts } from "@/data/mock-catalog";
import { CatalogProduct, ProductCategory } from "@/types/catalog";
import { ShopCompactRowCard } from "./shop-compact-row-card";
import { ProductCard } from "@/cards/product-card";
import { useCart } from "@/context/cart-context";
import { usePet } from "@/context/pet-context";
import { SHOP_CATEGORIES } from "./shop-categories-banner";
import { ShopTopStoresRow } from "./shop-top-stores-row";

interface ShopCategoryListViewProps {
  initialCategory?: string;
  initialSearchQuery?: string;
  onBackToDiscovery: () => void;
}

type SortOption = "bestselling" | "price-asc" | "price-desc" | "discount" | "rating";

export function ShopCategoryListView({
  initialCategory = "all",
  initialSearchQuery = "",
  onBackToDiscovery,
}: ShopCategoryListViewProps) {
  const { addItem } = useCart();
  const { currentPet } = usePet();

  // Active filters
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);
  const [sortBy, setSortBy] = useState<SortOption>("bestselling");
  const [onlyInStock, setOnlyInStock] = useState<boolean>(true);
  const [onlyDiscounted, setOnlyDiscounted] = useState<boolean>(false);
  const [onlyFastDelivery, setOnlyFastDelivery] = useState<boolean>(false);
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [desktopViewMode, setDesktopViewMode] = useState<"compact" | "grid">("compact");

  // Get active category object
  const activeCategoryObj = useMemo(() => {
    return SHOP_CATEGORIES.find((c) => c.slug === selectedCategory) || SHOP_CATEGORIES[SHOP_CATEGORIES.length - 1];
  }, [selectedCategory]);

  // Extract all unique brands
  const allBrands = useMemo(() => {
    const set = new Set<string>();
    mockCatalogProducts.forEach((p) => {
      if (p.brand) set.add(p.brand);
    });
    return Array.from(set);
  }, []);

  // Filter & Sort products
  const filteredProducts = useMemo(() => {
    return mockCatalogProducts
      .filter((p) => {
        // Category filter
        if (selectedCategory === "cat") {
          if (p.targetSpecies !== "CAT" && p.category !== "food") return false;
        } else if (selectedCategory === "dog") {
          if (p.targetSpecies !== "DOG") return false;
        } else if (selectedCategory !== "all") {
          if (p.category !== selectedCategory) return false;
        }

        // Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchesTitle = p.titleFa.toLowerCase().includes(q);
          const matchesBrand = p.brand.toLowerCase().includes(q);
          const matchesDesc = p.descriptionFa?.toLowerCase().includes(q) || false;
          if (!matchesTitle && !matchesBrand && !matchesDesc) return false;
        }

        // Stock filter
        if (onlyInStock && !p.isAvailable) return false;

        // Discount filter
        if (onlyDiscounted) {
          const hasDisc = Boolean(
            p.buyBoxOffer.discountedPriceToman &&
              p.buyBoxOffer.discountedPriceToman < p.buyBoxOffer.priceToman
          );
          if (!hasDisc) return false;
        }

        // Fast delivery filter (<= 3 hours)
        if (onlyFastDelivery && p.buyBoxOffer.leadTimeHours > 3) return false;

        // Brand filter
        if (selectedBrand !== "all" && p.brand !== selectedBrand) return false;

        return true;
      })
      .sort((a, b) => {
        const priceA = a.buyBoxOffer.discountedPriceToman || a.buyBoxOffer.priceToman;
        const priceB = b.buyBoxOffer.discountedPriceToman || b.buyBoxOffer.priceToman;

        switch (sortBy) {
          case "price-asc":
            return priceA - priceB;
          case "price-desc":
            return priceB - priceA;
          case "rating":
            return b.rating - a.rating;
          case "discount": {
            const discA = a.buyBoxOffer.discountedPriceToman
              ? a.buyBoxOffer.priceToman - a.buyBoxOffer.discountedPriceToman
              : 0;
            const discB = b.buyBoxOffer.discountedPriceToman
              ? b.buyBoxOffer.priceToman - b.buyBoxOffer.discountedPriceToman
              : 0;
            return discB - discA;
          }
          case "bestselling":
          default:
            return b.reviewsCount - a.reviewsCount;
        }
      });
  }, [selectedCategory, searchQuery, onlyInStock, onlyDiscounted, onlyFastDelivery, selectedBrand, sortBy]);

  const handleAddToCart = (product: CatalogProduct) => {
    addItem(product, product.buyBoxOffer, currentPet ? currentPet.id : null);
  };

  const resetFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
    setSortBy("bestselling");
    setOnlyInStock(true);
    setOnlyDiscounted(false);
    setOnlyFastDelivery(false);
    setSelectedBrand("all");
  };

  return (
    <div className="space-y-6 sm:space-y-8" dir="rtl">
      {/* 1. Header with Breadcrumb & Back to Discovery Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface p-4 sm:p-5 rounded-3xl border border-border/80 shadow-2xs">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBackToDiscovery}
            className="w-10 h-10 rounded-2xl bg-stone-100 dark:bg-stone-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-stone-700 dark:text-stone-300 hover:text-emerald-700 flex items-center justify-center transition-colors shrink-0 shadow-2xs cursor-pointer"
            aria-label="بازگشت به کاوش فروشگاه"
          >
            <ArrowRight className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl">{activeCategoryObj.icon}</span>
              <h1 className="text-lg sm:text-2xl font-black text-foreground tracking-tight">
                {activeCategoryObj.titleFa}
              </h1>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/50">
                {filteredProducts.length.toLocaleString("fa-IR")} کالا
              </span>
            </div>
            <p className="text-xs text-stone-400 font-light mt-0.5">
              مقایسه کمترین قیمت فروشندگان در جعبه خرید (Buy Box) با تضمین اصالت
            </p>
          </div>
        </div>

        {/* View toggle (desktop) */}
        <div className="hidden sm:flex items-center gap-2">
          <div className="p-1 rounded-2xl bg-stone-100 dark:bg-stone-800 flex items-center gap-1 border border-border/60">
            <button
              type="button"
              onClick={() => setDesktopViewMode("compact")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                desktopViewMode === "compact"
                  ? "bg-surface text-foreground shadow-2xs"
                  : "text-stone-400 hover:text-foreground"
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>نمای فشرده (مستطیلی)</span>
            </button>
            <button
              type="button"
              onClick={() => setDesktopViewMode("grid")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                desktopViewMode === "grid"
                  ? "bg-surface text-foreground shadow-2xs"
                  : "text-stone-400 hover:text-foreground"
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>نمای گرید</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Top Grocery/Pet Stores Row for this category (matching Image 1 Right Screen) */}
      <ShopTopStoresRow />

      {/* 3. Horizontal Category Switcher Chips (matching Image 1 Right Screen) */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 px-1 -mx-1 snap-x touch-pan-x">
        {SHOP_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.slug;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap shrink-0 transition-all flex items-center gap-1.5 cursor-pointer snap-start ${
                isSelected
                  ? "bg-emerald-700 text-white shadow-sm"
                  : "bg-surface hover:bg-surface-subtle text-stone-600 dark:text-stone-300 border border-border/80"
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.titleFa}</span>
            </button>
          );
        })}
      </div>

      {/* 4. Filter & Sort Chips Row (matching Image 1 Right Screen: Sort by, Free Delivery, In Stock...) */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 bg-surface p-3 rounded-2xl border border-border/80 text-xs">
        {/* Sort Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          <span className="text-stone-400 font-bold shrink-0 ms-1 flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>مرتب‌سازی:</span>
          </span>

          {[
            { id: "bestselling", label: "پرفروش‌ترین" },
            { id: "discount", label: "بیشترین تخفیف" },
            { id: "price-asc", label: "ارزان‌ترین" },
            { id: "price-desc", label: "گران‌ترین" },
            { id: "rating", label: "بالاترین امتیاز" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSortBy(item.id as SortOption)}
              className={`px-2.5 py-1 rounded-xl font-bold whitespace-nowrap transition-colors shrink-0 ${
                sortBy === item.id
                  ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30"
                  : "text-stone-500 hover:text-foreground"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Quick boolean toggles */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => setOnlyInStock(!onlyInStock)}
            className={`px-2.5 py-1 rounded-xl font-bold transition-colors cursor-pointer ${
              onlyInStock
                ? "bg-emerald-600 text-white"
                : "bg-stone-100 dark:bg-stone-800 text-stone-500 hover:text-foreground"
            }`}
          >
            فقط کالاهای موجود
          </button>

          <button
            type="button"
            onClick={() => setOnlyDiscounted(!onlyDiscounted)}
            className={`px-2.5 py-1 rounded-xl font-bold transition-colors cursor-pointer ${
              onlyDiscounted
                ? "bg-rose-600 text-white"
                : "bg-stone-100 dark:bg-stone-800 text-stone-500 hover:text-foreground"
            }`}
          >
            فقط تخفیف‌دار
          </button>

          <button
            type="button"
            onClick={() => setOnlyFastDelivery(!onlyFastDelivery)}
            className={`px-2.5 py-1 rounded-xl font-bold transition-colors cursor-pointer flex items-center gap-1 ${
              onlyFastDelivery
                ? "bg-amber-600 text-white"
                : "bg-stone-100 dark:bg-stone-800 text-stone-500 hover:text-foreground"
            }`}
          >
            <Zap className="w-3 h-3" />
            <span>ارسال ۲ ساعته</span>
          </button>
        </div>
      </div>

      {/* 5. Main Content Area: Products List (Mobile compact rectangular cards & Desktop grid) */}
      <div className="space-y-4">
        {filteredProducts.length === 0 ? (
          /* Empty State */
          <div className="bg-surface rounded-3xl p-10 text-center border border-border/80 space-y-3">
            <div className="w-16 h-16 rounded-3xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-3xl mx-auto">
              🔍
            </div>
            <h3 className="text-base font-bold text-foreground">کالایی با این مشخصات یافت نشد</h3>
            <p className="text-xs text-stone-400 max-w-sm mx-auto font-light">
              می‌توانید فیلترهای انتخابی را تغییر دهید یا واژه جستجوی دیگری را وارد کنید.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-emerald-600 text-white text-xs font-bold transition-transform hover:scale-105"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>پاک کردن تمام فیلترها</span>
            </button>
          </div>
        ) : (
          <div>
            {/* MOBILE VIEW: Stacked rectangular cards (۳ الی ۴ یا ۵ مورد در هر صفحه گوشی) */}
            <div className="flex flex-col gap-2.5 sm:hidden">
              {filteredProducts.map((product) => (
                <ShopCompactRowCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>

            {/* DESKTOP VIEW: Toggle between compact rows or rich cards grid */}
            <div className="hidden sm:block">
              {desktopViewMode === "compact" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {filteredProducts.map((product) => (
                    <ShopCompactRowCard
                      key={product.id}
                      product={product}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      slug={product.slug}
                      titleFa={product.titleFa}
                      brand={product.brand}
                      imageSrc={product.imageSrc}
                      priceTomans={product.buyBoxOffer.priceToman}
                      discountedPriceTomans={product.buyBoxOffer.discountedPriceToman}
                      stockQuantity={product.buyBoxOffer.stockQuantity}
                      rating={product.rating}
                      reviewsCount={product.reviewsCount}
                      weightText={product.weightVariants?.[0]?.labelFa || product.weightText}
                      isAvailable={product.isAvailable}
                      onAddToCart={() => handleAddToCart(product)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
