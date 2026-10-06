# DESIGN_SYSTEM: دیزاین سیستم جامع و هویت بصری مدرن بونیو (Bonnivo)

> **فلسفه طراحی**: طراحی مینیمال، لوکس، آرامش‌بخش و سلامت‌محور متناسب با اکوسیستم زیستی حیوانات خانگی. ترکیب طبیعت (طیف سبز زمردی و سدر ارگانیک) با فناوری مدرن (شیشه‌گری دیجیتال، کارت‌های شناور و تایپوگرافی تمیز فارسی).

---

## ۱. تایپوگرافی و فونت (Typography & Font Hierarchy)

- **فونت اصلی**: `Vazirmatn` (وزیرمتن) با پشتیبانی کامل از وزن‌های ۱۰۰ تا ۹۰۰ و ارقام کاملاً فارسی (`fa-IR`).
- **فونت اعداد و داده‌های کد**: `Vazirmatn-FD` یا فونت‌های منواسپیس برای شناسه تراکنش‌ها و کد‌های پیگیری.
- **مقیاس تایپوگرافی**:
  - **Display / Hero**: `text-3xl md:text-5xl font-black tracking-tight leading-tight`
  - **H1 (عناوین اصلی صفحات)**: `text-2xl md:text-3xl font-extrabold text-foreground`
  - **H2 (سرتیتر بخش‌ها و سکشن‌ها)**: `text-lg md:text-xl font-bold text-foreground`
  - **H3 (عناوین کارت‌ها و مدال‌ها)**: `text-base font-bold text-foreground`
  - **Body (متن بدنه و توضیحات)**: `text-sm font-normal text-muted-foreground leading-relaxed`
  - **Caption / Meta (برچسب‌ها و متادیتا)**: `text-xs md:text-[11px] font-medium text-muted-foreground`
  - **Price / Metric (اعداد و قیمت‌ها)**: `text-base md:text-lg font-black tracking-normal`

---

## ۲. پالت رنگی و توکن‌های موضوعی (Color Palette & Semantic Tokens)

### ۲.۱. رنگ‌های اصلی برند (Brand Palette)
- **Primary (سبز زمردی عمیق / Deep Emerald)**:
  - `Light`: `#0D7A57` / `hsl(161, 80%, 26%)` (نماد سلامت، حیات و اعتماد پزشکی)
  - `Dark`: `#10B981` / `hsl(160, 84%, 39%)` (شفاف، زنده و خوانا در پس‌زمینه تیره)
  - `Hover/Active`: `#095C41` (لایت) / `#059669` (دارک)
  - `Subtle/Tint`: `#E6F5F0` (لایت) / `#064E3B33` (دارک)

### ۲.۲. رنگ‌های مکمل و تاکیدی (Accents)
- **Amber Gold (طلایی و کهربایی - بای‌باکس و امتیاز)**:
  - `Hex`: `#F59E0B` | `hsl(38, 92%, 50%)`
  - کاربرد: ستاره‌های امتیازدهی، بج پرفروش‌ترین (Best Seller)، تخفیف شگفت‌انگیز و اعلان‌های مهم.
- **Teal / Cyan (سبزآبی بالینی - ویزیت آنلاین و پزشک)**:
  - `Hex`: `#0EA5E9` / `#14B8A6`
  - کاربرد: نشان ویزیت ویدیویی فوری، تاییدیه نظام دامپزشکی و نسخ دیجیتال.
- **Rose Destructive (رز ملایم - هشدار و مفقودی)**:
  - `Hex`: `#F43F5E` | `hsl(350, 89%, 60%)`
  - کاربرد: اعلام وضعیت گمشده پت (Amber Alert)، لغو سفارش و حذف آیتم.

### ۲.۳. سطوح و پس‌زمینه‌ها (Surfaces & Canvas)
- **حالت روز (Light Mode - Warm Studio Canvas)**:
  - `Canvas Background`: `#F8F9F7` (سفید بسیار گرم و غیرخیرهکننده)
  - `Card / Elevated Surface`: `#FFFFFF` (سفید خالص با سایه نرم و مرزهای مویی `#E5E7EB`)
  - `Subtle / Inactive Surface`: `#F0F2EE`
- **حالت شب (Dark Mode - Deep Organic Forest)**:
  - `Canvas Background`: `#0F1715` (زغال‌سنگی طبیعی متمایل به جنگلی)
  - `Card / Elevated Surface`: `#16221F` (سطح شفاف تیره با بوردر `#243833`)
  - `Subtle / Inactive Surface`: `#1E2D29`

---

## ۳. سیستم فواصل و هندسه المان‌ها (Radii, Spacing & Elevation)

- **گوشه‌های گرد (Border Radius)**:
  - `Buttons & Small Controls`: `rounded-xl` (12px)
  - `Cards & Modals`: `rounded-2xl` (16px) تا `rounded-3xl` (24px)
  - `Pills, Badges & Avatars`: `rounded-full` (9999px)
- **سایه‌ها و شیشه‌گری (Shadows & Glassmorphism)**:
  - `Card Shadow`: `shadow-xs border border-border/80 hover:shadow-md transition-all duration-200`
  - `Floating Glass`: `backdrop-blur-md bg-surface/80 border border-white/20 dark:border-white/5`
  - `Active Ring`: `ring-2 ring-primary ring-offset-2 ring-offset-background`

---

## ۴. استانداردهای کامپوننت‌های محوری (Key Component Standards)

### ۴.۱. صفحه جزئیات کالا (Product Detail View)
- چیدمان ۲ ستونه در دسکتاپ (گالری عکس در سمت راست با داتس و فلش‌های ناوبری، مشخصات در چپ).
- استپر تعداد (`- 1 +`) با باکس متصل و مینیمال.
- دکمه اصلی «خرید فوری» تمام‌عرض به رنگ پرایمری برند + دکمه ثانویه «افزودن به سبد» با پس‌زمینه خنثی.
- فهرست مشخصات سلامت پت (Nutrition Specs) با آیکون‌های خطی شیک و توضیح تک‌خطی.

### ۴.۲. دایرکتوری دامپزشکی و ویزیت آنلاین (Vets & Tele-Consult)
- محدودیت تقویم انتخاب تایم رزرو برای کاربر: حداکثر ۷ روز آینده.
- کارت‌های پزشک دارای نشان آنلاین بودن (`Live Indicator`) و تگ تخصص‌های تاییدشده.
- اتصال مستقیم به سیستم پرداخت و استرداد آنی کیف‌پول در صورت کنسلی زودهنگام.

### ۴.۳. شناسنامه آنلاین پت (Smart Cloud Passport)
- هدر گرادیانتی با آواتار بزرگ پت و وضعیت سلامت/واکسن.
- دکمه سوییچ فوری پت‌ها (`MultiPetSwitcher`) با دسترسی در تمامی صفحات.
- پلاک QR اختصاصی با قابلیت دانلود و پرینت فوری برای نصب روی قلاده.

---

## ۵. راهنمای واکنش‌گرایی (Responsive Breakpoints)

- **Mobile First (`< 640px`)**:
  - استفاده از نوار ناوبری ثابت پایینی (`MobileBottomNav`).
  - تبدیل تمام گریدها به تک‌ستونه عمودی با اسکرول نرم.
  - داک افقی دسته‌ها به صورت اسکرول لمسی (`overflow-x-auto no-scrollbar`).
- **Tablet (`640px - 1024px`)**:
  - گریدهای ۲ ستونه برای محصولات و پزشکان.
- **Desktop (`> 1024px`)**:
  - کانتینر با حداکثر عرض `max-w-7xl mx-auto px-6`.
  - نمایش هدر کامل با مگامنو و جستجوی لحظه‌ای.
