# 🧠 مغز متمرکز معماری و دیزاین سیستم بونیو (PROJECT_BRAIN.md)
> **وضعیت سند:** سند مرجع مطلق و خط قرمز مهندسی (Single Source of Truth)  
> **مخاطب:** تمامی Coding Agents (از جمله Antigravity)، معماران فرانت‌اند و توسعه‌دهندگان  
> **دامنه کاربرد:** پلتفرم سلامت، خدمات، کلینیک‌ها، پانسیون و پت‌شاپ آنلاین **Bonnivo** (کاملاً راست‌چین / RTL)  
> **قانون شماره ۱ (غیرقابل مذاکره):** «همه چیز باید کامپوننت باشد؛ هیچ استایل دستی، کلاس‌های ادهوک تکراری یا المان بدون ساختار در صفحات مجاز نیست.»

---

## ۱. منشور قوانین دیزاین سیستم و توکن‌های اختصاصی پت‌کر (Design Tokens)

هویت بصری بونیو بر پایه طبیعت، آرامش و اعتماد زیستی حیوانات خانگی طراحی شده است. از رنگ‌های زننده، قرمز هشداردهنده یا ساختارهای شلوغ پرهیز شده و ترکیب سبز زمردی ارگانیک با رنگ‌های خنثی گرم (`Warm Stone Canvas`) مبنای طراحی قرار گرفته است.

### ۱.۱. پالت توکن‌های رنگی و متغیرهای بصری (Tailwind Semantic Palette)

```css
/* متغیرهای رنگی در globals.css و tailwind.config.ts */
:root {
  /* پالت زمینه و سطوح ارگانیک */
  --canvas-warm: #F7F8F6;              /* پس‌زمینه سراسری سایت (Warm Near-White) */
  --surface-pure: #FFFFFF;             /* کارت‌های شناور و پنل‌های اصلی */
  --surface-subtle: #EFF1EC;           /* پس‌زمینه فیلدها و کانتینرهای ثانویه */
  --surface-elevated: #FFFFFF;         /* سطوح دارای سایه و مدال‌ها */
  
  /* رنگ هویت بونیو (سبز زمردی ارگانیک - Pet Life Green) */
  --bonnivo-primary: #0E9F6E;          /* رنگ اکشن‌های اصلی و هویت برند */
  --bonnivo-primary-hover: #097A54;    /* هاور دکمه‌ها و لینک‌های فعال */
  --bonnivo-primary-light: #DAF5E9;    /* پس‌زمینه ملایم بج‌ها و وضعیت‌های مثبت */
  --bonnivo-primary-dark: #064E3B;     /* متون تیره روی پس‌زمینه‌های روشن */

  /* طیف خاکستری و تایپوگرافی جنگلی (Forest Charcoal) */
  --text-main: #0F1C16;                /* رنگ تیترها و متون پررنگ (Charcoal) */
  --text-muted: #4B6358;               /* متون توضیحی و ثانویه */
  --text-subtle: #8CA297;              /* متون غیرفعال، راهنما و پلیس‌هولدر */
  --border-hairline: #E2E6DF;          /* خطوط مرزی مینیمال و جداکننده‌ها */

  /* رنگ‌های مکمل دسته‌بندی و وضعیت‌ها */
  --status-gold: #F59E0B;              /* امتیاز، ستاره‌ها و بج‌های برگزیده */
  --status-gold-bg: #FEF3C7;           /* زمینه بج‌های طلایی */
  --status-coral: #E05252;             /* تخفیف‌ها و هشدارهای سلامتی (نه قرمز صنعتی) */
  --status-coral-bg: #FDE8E8;          /* زمینه بج‌های تخفیف */
  --status-indigo: #4F46E5;            /* رویدادها، همایش‌ها و رزروها */
  --status-indigo-bg: #EEF2FF;         /* زمینه کارت‌های رویداد */
  --status-teal: #0D9488;              /* کلینیک‌ها و پرونده پزشکی WSAVA */
}
```

### ۱.۲. سیستم فاصله‌گذاری، شعاع‌ها و عمق (Spatial Hierarchy)
برای ریشه‌کن کردن ناهمگونی بصری در صفحات:
- **شعاع گوشه کارت‌ها (`border-radius`):** 
  - تمامی کارت‌های محتوایی (محصول، پزشک، مربی، رویداد): دقیقاً `rounded-3xl` (معادل `1.5rem / 24px`).
  - تمامی فیلدهای ورودی و دکمه‌ها: دقیقاً `rounded-2xl` (معادل `1rem / 16px`).
  - تمام بج‌ها و تگ‌های کوچک: `rounded-full`.
- **سیستم سایه و عمق (`Elevation`):**
  - سطح پایه کارت: `shadow-xs border border-border/80 bg-surface`.
  - وضعیت شناور (Hover): `hover:shadow-md hover:border-primary/40 hover:-translate-y-1 transition-all duration-300`.
  - مدال‌ها و دراورها: `shadow-2xl border border-border/90 bg-surface/95 backdrop-blur-md`.

### ۱.۳. تایپوگرافی و ارقام فارسی (Typography & Numerals)
- **قلم سراسری:** فونت `Vazirmatn` با اوزان `Regular (400)`، `Medium (500)`، `Bold (700)` و `Black (900)`.
- **خط قرمز ارقام:** ۱۰۰٪ مبالغ، مقادیر وزن، درصدها و شماره تلفن‌ها باید به صورت فارسی فرمت شوند (`formatPersianNumber` / `formatPersianCurrency`). استفاده از ارقام انگلیسی (`123`) در لایه UI ممنوع است.

---

## ۲. کاتالوگ دقیق تمامی کامپوننت‌های پایه و بیزینسی (Component Registry)

کلیه صفحات موظفند المان‌های خود را **منحصراً** از این کامپوننت‌ها فراخوانی کنند. ایجاد ساختار کارت سفارشی با تگ‌های متفرقه در فایل‌های صفحه ممنوع است.

```
apps/web/src/components/
├── ui/                     # کامپوننت‌های اتمیک پایه (Design System Primitives)
│   ├── button.tsx
│   ├── input.tsx
│   ├── select.tsx
│   ├── badge.tsx
│   ├── modal.tsx
│   ├── drawer.tsx
│   ├── accordion.tsx
│   ├── tabs.tsx
│   ├── rating-stars.tsx
│   ├── price-tag.tsx
│   ├── empty-state.tsx
│   └── skeleton.tsx
├── cards/                  # کارت‌های ساختاریافته بیزینسی با ابعاد قفل‌شده
│   ├── base-card.tsx       # کامپوننت انتزاعی و سنگ‌بنای تمامی کارت‌ها
│   ├── product-card.tsx    # کارت استاندارد محصولات و پت‌شاپ
│   ├── vet-card.tsx        # کارت دامپزشکان و کلینیک‌های معتمد
│   ├── trainer-card.tsx    # کارت مربیان و رفتارشناسان
│   ├── boarding-card.tsx   # کارت هتل و پانسیون حیوانات
│   ├── event-card.tsx      # کارت همایش‌ها و رویدادهای محلی
│   └── pet-profile-card.tsx# کارت مشخصات و پرونده پت
├── modules/                # ماژول‌های مستقل کاربردی و چندبخشی
│   ├── map-route-view.tsx  # نقشه تعاملی با خط‌چین هوشمند مبدا تا مقصد
│   ├── section-header.tsx  # تیتر سکشن با دکمه بازگشت و متن کمکی
│   ├── service-dock.tsx    # داک ۶ خدمت اصلی (آیکون‌های کپسولی)
│   ├── filter-drawer.tsx   # کشوی ریسپانسیو فیلترهای موبایل و تبلت
│   └── buy-box-widget.tsx  # باکس خرید رقابتی تأمین‌کنندگان
└── layout/                 # استراکچر کلان سایت
    ├── desktop-header.tsx
    ├── mobile-bottom-nav.tsx
    └── desktop-footer.tsx
```

---

### ۲.۱. الگوی والد مشترک کارت‌ها: `BaseCard`
تمامی کارت‌های پلتفرم از این ساختار والد ارث‌بری می‌کنند تا نسبت‌های هندسی و گریدها در تمام صفحات میلی‌متری و بدون ناهمگونی باشد.

```typescript
// apps/web/src/components/cards/base-card.tsx
export interface BaseCardProps {
  imageSrc: string;
  imageAlt: string;
  imageBadge?: React.ReactNode;      // بج گوشه تصویر (مثلاً تخفیف یا اورژانس)
  favoriteButton?: React.ReactNode;   // آیکون ذخیره در علاقه‌مندی‌ها
  headerTag?: string;                // برچسب بالایی (مثلاً تخصص یا برند)
  title: string;
  subtitle?: string;
  rating?: number;
  reviewCount?: number;
  features?: string[];               // لیست تیک‌دار مشخصات شاخص
  priceOrFee?: React.ReactNode;      // قیمت محصول یا تعرفه ویزیت
  actionButton: React.ReactNode;     // دکمه فراخوان به عمل یکدست
  href?: string;                     // آدرس صفحه جزئیات
  className?: string;
}
```

#### ابعاد قفل‌شده گرید کارت‌ها (Locked Dimension Guardrails)
- **نسبت تصویر در کارت:** دقیقاً نسبت مربعی ۱:۱ (`aspect-square`) برای محصولات، و ۱۶:۱۰ برای کلینیک‌ها/ایونت‌ها.
- **ارتفاع عنوان:** دقیقاً `h-10 line-clamp-2` (یکدستی ردیف‌ها حتی در عنوان‌های یک یا دو خطی).
- **حداقل ارتفاع کارت:** در حالت عمودی `min-h-[420px]` در دسکتاپ و `min-h-[380px]` در موبایل.

---

### ۲.۲. قرارداد Props کارت‌های تخصصی

#### الف) `ProductCard` (کارت محصول پت‌شاپ)
```typescript
interface ProductCardProps {
  id: string;
  slug: string;
  titleFa: string;
  brand: string;
  imageSrc: string;
  priceTomans: number;
  discountedPriceTomans?: number;
  stockQuantity: number;
  rating: number;
  reviewsCount: number;
  weightText?: string;
  isAvailable: boolean;
  onAddToCart: (productId: string) => void;
}
```

#### ب) `VetCard` (کارت کلینیک و دامپزشک)
```typescript
interface VetCardProps {
  id: string;
  name: string;
  clinicName: string;
  specialty: string;
  avatarUrl: string;
  address: string;
  distanceKm?: number;
  rating: number;
  reviewCount: number;
  isOpen24h?: boolean;
  consultationFeeTomans: number;
  onBookAppointment: (vetId: string) => void;
}
```

#### ج) `TrainerCard` (کارت مربی و رفتارشناس)
```typescript
interface TrainerCardProps {
  id: string;
  fullName: string;
  level: "SENIOR" | "EXPERT" | "MASTER";
  specialties: string[];
  avatarUrl: string;
  sessionPriceTomans: number;
  rating: number;
  totalTrainedPets: number;
  onSelect: (trainerId: string) => void;
}
```

#### د) `BoardingCard` (کارت پانسیون و هتل حیوانات)
```typescript
interface BoardingCardProps {
  id: string;
  nameFa: string;
  locationFa: string;
  rating: number;
  reviewCount: number;
  pricePerNightTomans: number;
  features: string[];
  imageSrc: string;
  onReserve: (boardingId: string) => void;
}
```

#### ه) `EventCard` (کارت رویداد و همایش)
```typescript
interface EventCardProps {
  id: string;
  titleFa: string;
  dateFa: string;
  timeFa: string;
  locationFa: string;
  organizerFa: string;
  priceTomans: number; // 0 for free
  capacityText: string;
  remainingSpots: number;
  onGetTicket: (eventId: string) => void;
}
```

---

## ۳. استانداردهای سخت‌گیرانه ریسپانسیو و امنیت ورودی‌ها

### ۳.۱. قوانین طراحی واکنش‌گرا (Zero-Horizontal-Scroll & Mobile-First)
1. **قانون بدون اسکرول افقی:** `document.body.scrollWidth === window.innerWidth` در تمام رزولوشن‌ها (از ۳۶۰ تا ۱۹۲۰ پیکسل).
2. **کلاس‌های بدون شرطِ عرض ثابت ممنوع:** استفاده از کلاس‌هایی نظیر `w-[500px]` یا `min-w-[400px]` اکیداً ممنوع است؛ باید همیشه از مقادیر نسبی یا مشروط مانند `w-full max-w-lg` استفاده شود.
3. **حاشیه امن پایین در موبایل (Bottom Nav Safe Area):** با توجه به نوار ثابت ۶۴ پیکسلی در موبایل، تمامی صفحات اصلی و جزئیات باید در تگ `main` یا ریشه صفحه دارای پدینگ `pb-28 md:pb-12` باشند.
4. **اندازه المان‌های لمسی (Touch Targets):** تمامی دکمه‌ها، آیکون‌ها و فیلدهای فرم در نمای موبایل باید دارای حداقل ابعاد `44px × 44px` باشند تا خطا در لمس کاربر رخ ندهد.

### ۳.۲. امنیت ورودی‌ها و یکپارچگی داده‌ها (Security & Input Sanitization)
1. **اعتبارسنجی ارقام تلفن و کدهای ملی:** کلیه ورودی‌های شماره تلفن (`09xxxxxxxxx`) و کدهای پستی باید ابتدا از فیلتر نرمال‌سازی عبور کرده و اعداد فارسی/عربی (`۰-۹`) به ارقام استاندارد (`0-9`) تبدیل شوند.
2. **جلوگیری از حملات XSS:** رندر دستی محتوا با `dangerouslySetInnerHTML` در کامپوننت‌های فرانت‌اند اکیداً ممنوع است مگر اینکه متن ورودی با کتابخانه‌های معتبر DOMPurify پاک‌سازی شده باشد.
3. **پیشگیری از CSRF و IDOR:** درخواست‌های تسویه، شارژ کیف پول و ثبت پرونده پزشکی پت باید مستقیماً شناسه کاربر لاگین را از توکن امن HttpOnly سمت سرور بگیرند نه از پارامترهای دستکاری‌پذیر کلاینت.
4. **ماسک کد امنیتی OTP:** فیلد دریافت کد یکبارمصرف پیامکی باید دارای محدودیت ۵ رقم، چیدمان LTR برای ارقام و پشتیبانی از فوکوس خودکار پیاپی باشد.

---

## ۴. معماری پیاده‌سازی نقشه و خط‌چین مسیر (Interactive Map Route)

یکی از وجوه تمایز پلتفرم بونیو، امکان محاسبه و ترسیم خط سیر مستقیم از موقعیت مکانی کاربر تا مرکز ارائه خدمت (کلینیک دامپزشکی، پانسیون یا محل همایش) با خط‌چین متحرک سبز زمردی است.

### ۴.۱. ساختار کامپوننت نقشه: `MapRouteView`
- **مسیر فایل:** `apps/web/src/components/modules/map-route-view.tsx`
- **ویژگی فنی:** پیاده‌سازی مستقل، بدون وابستگی سنگین خارجی و با رعایت کامل هدرهای امنیتی Content Security Policy (بدون `unsafe-eval`).
- **ورودی‌ها (Props):**
```typescript
interface MapRouteViewProps {
  destinationTitle: string;
  destinationAddress: string;
  destinationCoords: { lat: number; lng: number };
  userCoords?: { lat: number; lng: number };
  zoomLevel?: number;
  heightPx?: number;
  showDistanceBadge?: boolean;
}
```

### ۴.۲. فرمول محاسبه فاصله و الگوریتم ترسیم خط‌چین (Haversine & SVG Dashline)
1. **محاسبه فاصله زمینی:** فاصله بر اساس فرمول هاورسین (`Haversine Formula`) با شعاع زمین ۶۳۷۱ کیلومتر و دقت یک رقم اعشار به کیلومتر محاسبه می‌شود.
2. **ترسیم مسیر خط‌چین روی نقشه:**
   - استفاده از تگ استاندارد `<svg>` با استایل خط‌چین متحرک:
   ```css
   .map-route-dashed {
     stroke: #0E9F6E;
     stroke-width: 3.5;
     stroke-dasharray: 8 6;
     animation: dashAnimation 1.5s linear infinite;
   }
   @keyframes dashAnimation {
     to { stroke-dashoffset: -14; }
   }
   ```
3. **مکانیزم Fallback در صورت عدم اجازه دسترسی به GPS:**
   - در صورت رد درخواست لوکیشن توسط کاربر، مختصات مرکز تهران (میدان ونک: `35.758, 51.405`) به عنوان مبدا پیش‌فرض با برچسب مشخص قرار می‌گیرد و به کاربر دکمه فعال‌سازی موقعیت ارائه می‌شود.

---

## ۵. چک‌لیست مرحله‌به‌مرحله کامپوننت‌سازی و بازطراحی کل سایت

کدینگ ایجنت باید مراحل زیر را دقیقاً به ترتیب و بر اساس چک‌باکس‌ها پیاده‌سازی کند:

### فاز ۱: ایجاد کامپوننت‌های پایه (Primitives) در `components/ui`
- [x] ساخت `button.tsx` استاندارد با متغیرهای رنگی بونیو (Primary Emerald, Secondary, Ghost, Destructive) و پشتیبانی از وضعیت در حال بارگذاری (`isLoading`).
- [x] ساخت `input.tsx` با قابلیت نرمال‌سازی خودکار ارقام فارسی، استایل رینگ یکدست و آیکون اختیاری راست/چپ.
- [x] ساخت `badge.tsx` برای تخفیف‌ها، وضعیت ویزیت و بج‌های اخلاقی با رنگ‌های استاندارد پالت.
- [x] ساخت `rating-stars.tsx` با ستاره‌های طلایی و فرمت‌بندی فارسی تعداد نظرات.
- [x] ساخت `price-tag.tsx` برای نمایش قیمت با خط‌خوردگی، قیمت تخفیف‌خورده و واحد تومان با قلم فارسی.
- [x] ساخت `empty-state.tsx` برای نتایج خالی، سبد خرید خالی و لیست‌های خالی.

### فاز ۲: ایجاد ساختار مرجع کارت‌ها در `components/cards`
- [x] پیاده‌سازی `base-card.tsx` به عنوان اسکلت والد تمام کارت‌ها با ابعاد قفل‌شده و نسبت‌های هندسی یکسان.
- [x] پیاده‌سازی `product-card.tsx` و جایگزینی آن در صفحه کاتالوگ و صفحه نخست (`/`).
- [x] پیاده‌سازی `vet-card.tsx` و اتصال آن به سیستم سلامت و دایرکتوری دامپزشکی.
- [x] پیاده‌سازی `trainer-card.tsx` و آماده‌سازی برای دایرکتوری مربیان.
- [x] پیاده‌سازی `boarding-card.tsx` و جایگزینی کارت‌های هتل و پانسیون در `/boarding`.
- [x] پیاده‌سازی `event-card.tsx` و جایگزینی کارت‌های همایش‌ها در `/events`.

### فاز ۳: ماژول‌های تعاملی و فیچر نقشه در `components/modules`
- [x] پیاده‌سازی `map-route-view.tsx` با خط‌چین متحرک و نشانگرهای مبدا/مقصد.
- [x] اتصال کامپوننت نقشه خط‌چین به صفحات جزئیات دامپزشک (`/vets/[id]`)، پانسیون (`/boarding/[id]`) و ایونت (`/events/[id]`).
- [x] پیاده‌سازی `section-header.tsx` با عنوان فارسی، برچسب راهنما و دکمه بازگشت/مشاهده همه.
- [x] نوسازی و راه‌اندازی `service-dock.tsx` بر اساس تصویر مرجع دیزاین سیستم (داک آیکون‌های گرد سگ، گربه، جوندگان، پرندگان، غذا و سلامت).

### فاز ۴: استانداردسازی صفحات نهایی و بازرسی ریسپانسیو
- [ ] تمیزکاری کامل `apps/web/src/app/page.tsx` و حذف کدهای تکراری.
- [ ] استانداردسازی صفحه سبد خرید (`/cart`) و صفحه تسویه (`/checkout`) با کامپوننت‌های فرم و دکمه‌های جدید.
- [ ] بررسی پدینگ انتهای صفحات (`pb-28`) در هر ۲۸ روت برای جلوگیری از همپوشانی با نوار ناوبری موبایل.
- [ ] اجرای فرمان `npm run lint --workspace=apps/web` و رفع هرگونه هشدار تایپ‌اسکریپت و ری‌اکت.
- [ ] اجرای فرمان `npm run build --workspace=apps/web` و تایید نهایی خروجی پروداکشن.

---

## ۶. قوانین کاربری ایجنت هوش مصنوعی (Coding Agent Protocol)

هنگامی که ایجنت در حال اجرای تسک‌ها یا ریفکتور است، ملزم به رعایت قوانین قطعی زیر است:

1. **اتکا به سند مرجع:** ایجنت نباید بدون دلیل فایل‌های متفرقه پروژه را جستجو یا بازخوانی کند. ساختار کامپوننت‌ها، نام فایل‌ها و ورودی‌ها دقیقاً در این فایل مشخص شده‌اند.
2. **ممنوعیت استایل اینلاین یا پراکنده:** هیچ کلاسی خارج از توکن‌های استاندارد (مثل رنگ‌های نامربوط `#ff0000` یا اندازه‌های هاردکدشده پیکسل) نباید در کامپوننت‌ها درج شود.
3. **حفظ استقلال منطق تجاری (Business Logic):** توابع رزرو موجودی دیتابیس، درگاه پرداخت شاپرک، سهمیه پیامک و گارد امنیتی IDOR که در بخش ۴ گزارش ممیزی آمده‌اند، نباید شکسته یا حذف شوند.
4. **تایید سلامت چرخه با بیلد استاندارد:** پس از هر ویرایش کامپوننت‌های ساختاری، ایجنت موظف است دستور `compile_applet` یا `npm run build --workspace=apps/web` را اجرا نماید تا از صفر بودن خطاهای کامپایل اطمینان حاصل کند.

---
*سند حاضر به عنوان کانون فرماندهی و مغز متفکر معماری (PROJECT_BRAIN) برای کل تیم و ابزارهای هوش مصنوعی معتبر و لازم‌الاجراست.*
