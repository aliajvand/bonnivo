"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { mockCatalogProducts } from "@/data/mock-catalog";
import { CatalogProduct } from "@/types/catalog";
import { fetchProductBySlug } from "@/lib/api/catalog";
import { ProductDetailView } from "@/components/shop/product-detail-view";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [liveProduct, setLiveProduct] = useState<CatalogProduct | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    async function loadProduct() {
      if (!slug) return;
      setIsLoading(true);
      try {
        const prod = await fetchProductBySlug(slug);
        if (isMounted) {
          if (prod) {
            setLiveProduct(prod);
          } else {
            const fallback =
              mockCatalogProducts.find((p) => p.slug === slug || p.id === slug) ||
              mockCatalogProducts[0];
            setLiveProduct(fallback);
          }
        }
      } catch {
        if (isMounted) {
          const fallback =
            mockCatalogProducts.find((p) => p.slug === slug || p.id === slug) ||
            mockCatalogProducts[0];
          setLiveProduct(fallback);
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    loadProduct();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  const product =
    liveProduct ||
    mockCatalogProducts.find((p) => p.slug === slug || p.id === slug) ||
    mockCatalogProducts[0];

  return <ProductDetailView product={product} />;
}
