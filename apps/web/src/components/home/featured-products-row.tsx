"use client";

import React, { useRef, useState } from "react";
import { mockCatalogProducts } from "@/data/mock-catalog";
import { useCart } from "@/context/cart-context";
import { usePet } from "@/context/pet-context";
import { CatalogProduct } from "@/types/catalog";
import { ProductCard } from "@/cards/product-card";

interface FeaturedProductsRowProps {
  products?: CatalogProduct[];
}

export function FeaturedProductsRow({ products }: FeaturedProductsRowProps) {
  const { addItem } = useCart();
  const { activePet } = usePet();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStart, setScrollStart] = useState(0);

  const displayProducts = products || mockCatalogProducts;

  const handleAddToCart = (productId: string) => {
    const target = displayProducts.find((p) => p.id === productId);
    if (target) {
      addItem(target, undefined, activePet ? activePet.id : null);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsMouseDown(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollStart(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsMouseDown(false);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollStart - walk;
  };

  return (
    <div
      ref={scrollRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      className="flex gap-3.5 sm:gap-4 lg:gap-5 overflow-x-auto pb-4 pt-1 px-1 -mx-1 sm:px-0 sm:mx-0 scroll-smooth no-scrollbar snap-x snap-mandatory touch-pan-x cursor-grab active:cursor-grabbing"
      dir="rtl"
    >
      {displayProducts.map((product) => {
        const offer = product.buyBoxOffer;
        return (
          <div
            key={product.id}
            className="w-[230px] sm:w-[260px] md:w-[280px] shrink-0 snap-start"
          >
            <ProductCard
              id={product.id}
              slug={product.slug}
              titleFa={product.titleFa}
              brand={product.brand}
              imageSrc={product.imageSrc}
              priceTomans={offer.priceToman}
              discountedPriceTomans={offer.discountedPriceToman}
              stockQuantity={offer.stockQuantity}
              rating={product.rating}
              reviewsCount={product.reviewsCount}
              weightText={product.weightVariants?.[0]?.labelFa}
              isAvailable={offer.stockQuantity > 0}
              onAddToCart={handleAddToCart}
            />
          </div>
        );
      })}
    </div>
  );
}
