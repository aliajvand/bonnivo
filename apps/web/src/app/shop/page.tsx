import { Suspense } from "react";
import { ShopCatalogView } from "@/components/shop/shop-catalog-view";

export const metadata = {
  title: "فروشگاه تخصصی محصولات و تغذیه پت | بنیوو",
  description:
    "خرید آنلاین انواع غذای خشک، کنسرو، تشویقی، مکمل و اسباب‌بازی سگ و گربه با تضمین کمترین قیمت در جعبه خرید (Buy Box)",
};

function ShopFallback() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 text-center" dir="rtl">
      <div className="w-12 h-12 rounded-full border-4 border-emerald-600/30 border-t-emerald-600 animate-spin mx-auto mb-4" />
      <p className="text-xs text-stone-400">در حال بارگذاری کاتالوگ فروشگاه بونیو...</p>
    </div>
  );
}

export default function ShopPage() {
  return (
    <div className="w-full py-4 sm:py-6 space-y-8">
      <Suspense fallback={<ShopFallback />}>
        <ShopCatalogView />
      </Suspense>
    </div>
  );
}
