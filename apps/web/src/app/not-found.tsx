import Link from "next/link";
import { ArrowLeft, Home, ShoppingBag } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16 text-center select-none" dir="rtl">
      <div className="w-24 h-24 rounded-3xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/40 flex items-center justify-center text-4xl mb-6 shadow-xs">
        🐾
      </div>

      <h1 className="text-3xl sm:text-4xl font-black text-foreground mb-3 tracking-tight">
        صفحه مورد نظر پیدا نشد
      </h1>
      <p className="text-sm sm:text-base text-stone-500 dark:text-stone-400 max-w-md mb-8 font-light">
        به نظر می‌رسد این صفحه جابجا شده یا آدرس را اشتباه وارد کرده‌اید. نگران نباشید، پت شما گم نشده است!
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-700 text-white hover:bg-emerald-800 font-bold text-sm shadow-md transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>بازگشت به خانه</span>
        </Link>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-surface border border-border text-foreground hover:bg-stone-50 dark:hover:bg-stone-850 font-bold text-sm transition-colors"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>فروشگاه محصولات</span>
        </Link>
      </div>
    </div>
  );
}
