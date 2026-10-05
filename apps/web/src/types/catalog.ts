import { PetSpecies } from "./pet";

export type ProductCategory = "food" | "treats" | "toys" | "health" | "hygiene" | "accessories" | "all";

export interface SellerOffer {
  id?: string;
  sellerId: string;
  storeNameFa: string;
  priceToman: number;
  discountedPriceToman?: number;
  stockQuantity: number;
  leadTimeHours: number;
  isBuyBox: boolean;
}

export interface ProductWeightVariant {
  id: string;
  weightKg: number;
  labelFa: string; // e.g. "۲ کیلوگرم", "۴ کیلوگرم", "۱۰ کیلوگرم"
  priceToman: number;
  discountedPriceToman?: number;
}

export interface ProductColorVariant {
  id: string;
  nameFa: string; // e.g. "مشکی مات", "قرمز یاقوتی", "کرم استخوانی", "آبی کاربنی"
  hex: string;
  inStock: boolean;
  imageSrc?: string;
}

export interface ProductFeatureHighlight {
  icon: "shield" | "truck" | "heart" | "sparkles" | "leaf" | "battery" | "award" | "box";
  titleFa: string;
  descFa?: string;
}

export interface CatalogProduct {
  id: string;
  titleFa: string;
  slug: string;
  brand: string;
  category: ProductCategory;
  targetSpecies: PetSpecies | "ALL";
  imageSrc: string;
  rating: number;
  reviewsCount: number;
  buyBoxOffer: SellerOffer;
  otherOffersCount: number;
  descriptionFa?: string;
  weightText?: string;
  isAvailable: boolean;
  weightVariants?: ProductWeightVariant[];
  colorVariants?: ProductColorVariant[];
  galleryImages?: string[];
  features?: ProductFeatureHighlight[];
  primaryImageUrl?: string;
  sku?: string;
}

