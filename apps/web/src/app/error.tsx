"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw, Home } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App error:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16 text-center select-none" dir="rtl">
      <div className="w-20 h-20 rounded-3xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200/60 dark:border-rose-800/40 flex items-center justify-center text-rose-600 mb-6 shadow-xs">
        <AlertCircle className="w-10 h-10" />
      </div>

      <h1 className="text-2xl sm:text-3xl font-black text-foreground mb-3 tracking-tight">
        خطایی رخ داده است
      </h1>
      <p className="text-sm sm:text-base text-stone-500 dark:text-stone-400 max-w-md mb-8 font-light">
        متأسفانه در پردازش این بخش مشکلی پیش آمد. می‌توانید دوباره تلاش کنید یا به صفحه اصلی بازگردید.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-700 text-white hover:bg-emerald-800 font-bold text-sm shadow-md transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>تلاش مجدد</span>
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-surface border border-border text-foreground hover:bg-stone-50 dark:hover:bg-stone-850 font-bold text-sm transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>صفحه اصلی</span>
        </Link>
      </div>
    </div>
  );
}
