"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Compass, LayoutGrid, Search } from "lucide-react";
import { ShopDiscoveryView } from "./shop-discovery-view";
import { ShopCategoryListView } from "./shop-category-list-view";

export function ShopCatalogView() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Read initial query parameters
  const initialCategory = searchParams.get("category");
  const initialSearch = searchParams.get("q") || "";

  // View mode: "discovery" when user is exploring; "category" when a category/search is chosen
  const [viewMode, setViewMode] = useState<"discovery" | "category">(
    initialCategory || initialSearch ? "category" : "discovery"
  );
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory || "all");
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);

  // Sync state when URL params change
  useEffect(() => {
    const cat = searchParams.get("category");
    const q = searchParams.get("q");
    if (cat || q) {
      setViewMode("category");
      if (cat) setActiveCategory(cat);
      if (q) setSearchQuery(q);
    }
  }, [searchParams]);

  const handleSelectCategory = (categorySlug: string) => {
    setActiveCategory(categorySlug);
    setViewMode("category");
    router.push(`/shop?category=${categorySlug}`, { scroll: false });
  };

  const handleSearchQuery = (query: string) => {
    setSearchQuery(query);
    setViewMode("category");
    router.push(`/shop?q=${encodeURIComponent(query)}`, { scroll: false });
  };

  const handleBackToDiscovery = () => {
    setViewMode("discovery");
    setActiveCategory("all");
    setSearchQuery("");
    router.push("/shop", { scroll: false });
  };

  return (
    <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 w-full space-y-6" dir="rtl">
      {/* Top View Mode Mode Switcher (Seamless toggle between Discovery & Category List) */}
      <div className="flex items-center justify-between border-b border-border/60 pb-3">
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-surface border border-border/80 shadow-2xs">
          <button
            type="button"
            onClick={handleBackToDiscovery}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === "discovery"
                ? "bg-emerald-700 text-white shadow-xs"
                : "text-stone-500 hover:text-foreground"
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>۱. ویترین و کاوش فروشگاه</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode("category")}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === "category"
                ? "bg-emerald-700 text-white shadow-xs"
                : "text-stone-500 hover:text-foreground"
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span>۲. دسته‌بندی و لیست محصولات</span>
          </button>
        </div>

        <span className="hidden sm:inline-block text-xs text-stone-400 font-light">
          {viewMode === "discovery" ? "حالت کاوش کلی محصولات" : "حالت مشاهده دسته‌بندی مشخص"}
        </span>
      </div>

      {/* Main View Render */}
      {viewMode === "discovery" ? (
        <ShopDiscoveryView
          onSelectCategory={handleSelectCategory}
          onSearchQuery={handleSearchQuery}
        />
      ) : (
        <ShopCategoryListView
          initialCategory={activeCategory}
          initialSearchQuery={searchQuery}
          onBackToDiscovery={handleBackToDiscovery}
        />
      )}
    </div>
  );
}
