"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { useAuth } from "@/context/auth-context";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function MobileTopHeader() {
  const { itemsCount } = useCart();
  const { currentRole } = useAuth();
  const isCustomer = currentRole === "CUSTOMER";

  return (
    <header className="sticky top-0 z-50 w-full h-12 px-3.5 md:hidden bg-white/95 dark:bg-[#081510]/95 backdrop-blur-md border-b border-stone-200/80 dark:border-emerald-950/80 flex items-center justify-between shadow-2xs select-none" dir="rtl">
      
      {/* Right in RTL: Quick Search button */}
      <div className="flex items-center">
        <Link
          href="/shop"
          aria-label="جستجو در محصولات و خدمات"
          className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800/80 flex items-center justify-center text-stone-700 dark:text-stone-300 border border-border/60 active:scale-95 transition-transform"
        >
          <Search className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* DEAD CENTER: Official Logo Mark + Persian Name 'بنیوو' */}
      <Link
        href="/"
        className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5 select-none active:scale-95 transition-transform"
      >
        <Image
          src="/icons/bonnivo-logo-mark.svg"
          alt="بنیوو"
          width={24}
          height={24}
          className="w-6 h-6 object-contain dark:invert"
          priority
        />
        <span className="font-black text-base tracking-tight text-foreground">
          بنیوو
        </span>
      </Link>

      {/* Left in RTL: Theme Toggle & Cart */}
      <div className="flex items-center gap-1.5">
        <ThemeToggle />

        {isCustomer && (
          <Link
            href="/cart"
            aria-label="سبد خرید"
            className="relative w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/40 active:scale-95 transition-transform"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            {itemsCount > 0 && (
              <span className="absolute -top-1 -start-1 bg-emerald-600 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-xs">
                {itemsCount}
              </span>
            )}
          </Link>
        )}
      </div>

    </header>
  );
}
