"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, SlidersHorizontal, ArrowLeft, Flame, Sparkles, TrendingUp, Heart, ShoppingBag, ShieldCheck } from "lucide-react";
import { mockCatalogProducts } from "@/data/mock-catalog";
import { CatalogProduct } from "@/types/catalog";
import { FeaturedProductsRow } from "@/components/home/featured-products-row";
import { ShopPromoBanners } from "./shop-promo-banners";
import { ShopCategoriesBanner } from "./shop-categories-banner";
import { ShopTopStoresRow } from "./shop-top-stores-row";

interface ShopDiscoveryViewProps {
  onSelectCategory: (categorySlug: string) => void;
  onSearchQuery?: (query: string) => void;
}

export function ShopDiscoveryView({ onSelectCategory, onSearchQuery }: ShopDiscoveryViewProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim() && onSearchQuery) {
      onSearchQuery(searchTerm.trim());
    }
  };

  // Group products into attractive curated rows
  const bestsellers = mockCatalogProducts.filter((p) => p.rating >= 4.7);
  const topSaverDeals = mockCatalogProducts.filter(
    (p) => p.buyBoxOffer.discountedPriceToman && p.buyBoxOffer.discountedPriceToman < p.buyBoxOffer.priceToman
  );
  const catProducts = mockCatalogProducts.filter((p) => p.targetSpecies === "CAT" && p.category === "food");
  const accessoriesAndBeds = mockCatalogProducts.filter((p) => p.category === "accessories" || p.category === "toys");
  const healthAndHygiene = mockCatalogProducts.filter((p) => p.category === "health" || p.category === "hygiene");

  return (
    <div className="space-y-8 sm:space-y-10" dir="rtl">
      {/* 1. Top Search Bar with Filter Trigger (matching Image 1 Left Screen) */}
      <div className="bg-surface rounded-3xl p-3 sm:p-4 border border-border/80 shadow-2xs">
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
          <div className="relative flex-1 flex items-center">
            <Search className="w-5 h-5 text-stone-400 absolute start-3 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="جستجوی غذا، برند، مکمل یا اسباب‌بازی پت..."
              className="w-full py-2.5 sm:py-3 pe-4 ps-10 rounded-2xl bg-stone-50 dark:bg-stone-850/60 border border-border/60 text-xs sm:text-sm text-foreground focus:outline-hidden focus:border-emerald-500 transition-colors"
            />
          </div>

          <button
            type="submit"
            className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold transition-all shadow-xs shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            <span>جستجو</span>
          </button>
        </form>

        {/* Quick Search Tag Chips */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2.5 text-[11px]">
          <span className="text-stone-400 font-medium shrink-0">بیشترین جستجو:</span>
          {["رویال کنین", "پورینا پروپلن", "خاک کربن‌دار", "خمیر مالت", "قلاده چرمی", "تشویقی فیلیکس"].map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => {
                setSearchTerm(tag);
                onSearchQuery?.(tag);
              }}
              className="px-2.5 py-1 rounded-xl bg-stone-100 hover:bg-emerald-50 dark:bg-stone-800 dark:hover:bg-emerald-950/40 text-stone-600 dark:text-stone-300 hover:text-emerald-700 transition-colors shrink-0 font-medium"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Hero Promotional Banners (matching Image 1 + Image 2) */}
      <ShopPromoBanners />

      {/* 3. Circular Category Icons with Labels (matching Image 1 Left Screen) */}
      <ShopCategoriesBanner onSelectCategory={onSelectCategory} />

      {/* 4. Top Grocery/Pet Stores Row (matching Image 1 Left Screen "Top Grocery Stores") */}
      <ShopTopStoresRow />

      {/* 5. Row 1: Top Items 2026 / پرفروش‌ترین‌ها (Horizontal Scroll using Home Component) */}
      <section className="space-y-4" id="bestsellers">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/40 flex items-center justify-center text-amber-600">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-foreground">
                پرفروش‌ترین‌های سال ۲۰۲۶
              </h3>
              <p className="text-xs text-stone-400 font-light">
                محبوب‌ترین انتخاب‌های صاحبان پت در پلتفرم بونیو
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSelectCategory("all")}
            className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <span>مشاهده همه</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        <FeaturedProductsRow products={bestsellers} />
      </section>

      {/* 6. Row 2: Top Saver Today / تخفیف‌های طلایی با تضمین کمترین قیمت */}
      <section className="space-y-4" id="deals">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-rose-50 dark:bg-rose-950/40 flex items-center justify-center text-rose-600">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-foreground">
                تخفیف‌های ویژه روز با تضمین کمترین قیمت
              </h3>
              <p className="text-xs text-stone-400 font-light">
                رقابت تنگاتنگ پت‌شاپ‌ها در جعبه خرید (Buy Box)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSelectCategory("all")}
            className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <span>مشاهده همه</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        <FeaturedProductsRow products={topSaverDeals} />
      </section>

      {/* 7. Row 3: محبوب‌ترین غذاهای خشک و کنسرو گربه */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-600">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-foreground">
                غذای خشک و کنسروهای مرغوب
              </h3>
              <p className="text-xs text-stone-400 font-light">
                تأمین پروتئین بالا با قابلیت هضم عالی و بدون مواد نگه‌دارنده
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSelectCategory("cat")}
            className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <span>مشاهده همه</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        <FeaturedProductsRow products={catProducts} />
      </section>

      {/* 8. Row 4: قلاده، جای خواب و اسباب‌بازی‌ها */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/40 flex items-center justify-center text-purple-600">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-foreground">
                قلاده‌های چرمی، جای خواب طبی و اسباب‌بازی
              </h3>
              <p className="text-xs text-stone-400 font-light">
                تنوع رنگ‌بندی و سایزبندی ویژه راحتی و آرامش پت شما
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSelectCategory("accessories")}
            className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <span>مشاهده همه</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        <FeaturedProductsRow products={accessoriesAndBeds} />
      </section>

      {/* 9. Row 5: خاک بستر، مالت و مکمل‌های درمانی */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center text-blue-600">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-foreground">
                سلامت، بهداشت و خاک‌های کربن‌دار
              </h3>
              <p className="text-xs text-stone-400 font-light">
                کنترل بوی محیط و سلامت سیستم گوارشی و ایمنی
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSelectCategory("health")}
            className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <span>مشاهده همه</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        <FeaturedProductsRow products={healthAndHygiene} />
      </section>
    </div>
  );
}
