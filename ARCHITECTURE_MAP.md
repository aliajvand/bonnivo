# ARCHITECTURE_MAP: نقشه جامع فنی و معماری پروژه بونیو (Bonnivo)

> **هدف سند**: راهنمای مرجع و نقشه کامل ساختار سورس‌کد جهت جلوگیری از اسکن مجدد فایل‌ها در تسک‌های توسعه، نگهداری و آدیت.

---

## ۱. معماری و ساختار کلی (Architecture Overview)

- **استک و فریمورک**: ساختار مونو‌ریپو (Monorepo) متشکل از فرانت‌اند **Next.js 15.2 (App Router)** با **React 19**، **TypeScript**، **Tailwind CSS v3** و گرافیک **Three.js**؛ و بک‌اند **FastAPI 0.115 (Python 3.11+)** مبتنی بر **SQLAlchemy 2.0 Async**، **Pydantic v2** و پایگاه‌داده دوگانه **PostgreSQL (تولید) / SQLite (تست)** به همراه **Alembic**.
- **رویکرد و دامنه‌ها**: پلتفرم یکپارچه حیوانات خانگی با رویکرد Mobile-First و RTL/Persian؛ شامل فروشگاه چندتأمینی (Buy-Box و Split-Shipment)، لجستیک فوری درون‌شهری، پاسپورت ابری QR/NFC، دستیار هوشمند مراقبت و تغذیه (Groq LLM)، سامانه رزرو کلینیک، مربی، پانسیون و ره‌گیری گم‌شدگان (Amber Alert).
- **ارتباط و دیپلوی**: کلاینت مستقل با ارتباط RESTful به `/api/v1`؛ رانر پروداکشن ترکیبی Node.js Standalone و Nginx Reverse Proxy در بستر Docker Compose.

---

## ۲. درخت ساختار سورس‌کد (File Tree)

```text
bonnivo-v2/
├── package.json                          # اسکریپت‌های ریشه مونوریپو
├── server.js                              # رانر سرور پروداکشن Next.js
├── docker-compose.yml                     # ارکستراسیون کانتینرهای وب، بک‌اند، دیتابیس و انجینکس
├── nginx/
│   └── nginx.conf                         # معکوس‌کننده پروکسی و روتینگ API/Web
├── scripts/
│   ├── copy-build-artifacts.js            # کپی فایل‌های بیلد به standalone
│   └── secret_scan.py                     # اسکن امنیتی سورس‌کد قبل از انتشار
├── apps/
│   ├── backend/                           # سرویس FastAPI
│   │   ├── pyproject.toml                 # وابستگی‌ها و پیکربندی پایتون
│   │   ├── alembic.ini                    # تنظیمات مایگریشن دیتابیس
│   │   ├── main.py                        # رانر مدخل بک‌اند
│   │   ├── src/
│   │   │   ├── main.py                    # ساخت اپلیکیشن FastAPI، میدلورها و روت‌ها
│   │   │   ├── cli.py                     # رابط خط فرمان مدیریت و ساخت ادمین
│   │   │   ├── core/                      # تنظیمات و امنیت مرکزی
│   │   │   │   ├── config.py              # تنظیمات Pydantic Settings و متغیرهای محیطی
│   │   │   │   ├── database.py            # اتصال اسینکرون SQLAlchemy و Session Factory
│   │   │   │   ├── security.py            # توکن JWT، احراز هویت کاربر و هش OTP
│   │   │   │   └── admin_security.py      # امنیت پیشرفته، سشن و هشینگ ادمین
│   │   │   ├── models/                    # مدل‌های دیتابیس ORM
│   │   │   │   ├── __init__.py            # رجیستری و اکسپورت تمام مدل‌ها
│   │   │   │   ├── user.py                # کاربر، نقش‌ها، نشست‌ها و OTP
│   │   │   │   ├── admin.py               # ادمین، ممیزی لاگ و ریست پسورد
│   │   │   │   ├── pet.py                 # حیوان خانگی، پرونده سلامت و تسک‌ها
│   │   │   │   ├── catalog.py             # کالا، دسته‌بندی، آفر فروشنده و نظرات
│   │   │   │   ├── order.py               # سفارش، رزرو انبار، سبد و زمان‌بندی
│   │   │   │   ├── vet.py                 # کلینیک، دامپزشک، نوبت و پرونده پزشکی
│   │   │   │   ├── trainer.py             # مربیان سگ و جلسات آموزش
│   │   │   │   ├── boarding.py            # پانسیون، مهد و رزرو اقامت
│   │   │   │   ├── event.py               # رویدادهای اجتماعی و بلیت‌ها
│   │   │   │   ├── coupon.py              # کدهای تخفیف و ابطال
│   │   │   │   ├── wallet.py              # کیف پول، تراکنش‌ها و تسویه
│   │   │   │   ├── feature_flag.py        # فیچرفلگ‌های پلتفرم
│   │   │   │   ├── subscription.py        # اشتراک دوره‌ای غذای پت
│   │   │   │   ├── logistics.py           # پیک شهری، محموله و ردیابی
│   │   │   │   ├── settlement.py          # تسویه‌حساب فروشندگان و کارمزد
│   │   │   │   ├── nfc.py                 # تگ‌های گردنبند هوشمند NFC
│   │   │   │   ├── amber_alert.py         # اعلام هشدار فوری حیوان گمشده
│   │   │   │   ├── adoption.py            # واگذاری اخلاقی و فرم‌های درخواست
│   │   │   │   └── loyalty.py             # پوینت، رگه‌های روزانه و ووچر
│   │   │   ├── api/v1/                    # کنترلرها و اندپوینت‌های REST
│   │   │   │   ├── admin.py               # پنل مدیریت، تایید محصولات و فروشندگان
│   │   │   │   ├── admin_auth.py          # لاگین، ریست پسورد و ممیزی ادمین
│   │   │   │   ├── adoption.py            # آگهی‌های واگذاری و اپلیکیشن‌ها
│   │   │   │   ├── ai_copilot.py          # چت‌بات پشتیبان سلامت پت (Groq)
│   │   │   │   ├── amber_alert.py         # ثبت و مشاهده هشدارهای گم‌شدن پت
│   │   │   │   ├── analytics.py           # دریافت رخدادها و لاگ تله‌متری
│   │   │   │   ├── auth.py                # ارسال و اعتبارسنجی OTP و سشن
│   │   │   │   ├── boarding.py            # فهرست و رزرو پانسیون‌ها
│   │   │   │   ├── care.py                # مدیریت و تیک‌زدن وظایف مراقبت
│   │   │   │   ├── catalog.py             # کاتالوگ عمومی، بایک‌باکس و سرچ
│   │   │   │   ├── checkout.py            # رزرو انبار، سبد خرید و پیش‌فاکتور
│   │   │   │   ├── coupons.py             # اعتبارسنجی و ابطال کوپن
│   │   │   │   ├── discovery.py           # کشف مکانی روی نقشه (کلینیک و پارک)
│   │   │   │   ├── events.py              # ثبت، رزرو و تایید رویدادها
│   │   │   │   ├── feature_flags.py       # استعلام و تغییر فیچرفلگ‌ها
│   │   │   │   ├── health.py              # لایونس و سلامت سرور
│   │   │   │   ├── logistics.py           # تعیین کرایه و وضعیت محموله
│   │   │   │   ├── loyalty.py             # امتیاز پنجه و تبدیل به ووچر
│   │   │   │   ├── medical_records.py     # صدور و استعلام پرونده درمان
│   │   │   │   ├── nfc.py                 # رجیستری و اتصال تگ NFC به پت
│   │   │   │   ├── passport.py            # پروفایل عمومی QR اسکن و گزارش رویت
│   │   │   │   ├── payment.py             # درخواست پرداخت و کال‌بک درگاه
│   │   │   │   ├── pets.py                # ثبت، ویرایش و فعالیت‌های پت
│   │   │   │   ├── replenishment.py       # محاسبه پایان غذا و کرون جاب
│   │   │   │   ├── sellers.py             # پروفایل، آفرها و پنل تامین‌کننده
│   │   │   │   ├── services.py            # بوکینگ سرویس‌های گرومینگ و آرایش
│   │   │   │   ├── settlements.py         # محاسبه پورسانت و تسویه پایا
│   │   │   │   ├── subscriptions.py       # مدیریت اشتراک تکرارشونده غذا
│   │   │   │   ├── trainers.py            # رزرو و تکمیل جلسات مربیگری
│   │   │   │   ├── vets.py                # کلینیک‌ها، زمان‌های آزاد و نوبت
│   │   │   │   ├── wallet.py              # موجودی کیف پول و درخواست وجه
│   │   │   │   └── wms_webhooks.py        # وب‌هوک همگام‌سازی انبار تامین‌کننده
│   │   │   ├── services/                  # لایه منطق بیزنس و تجمیع خارجی
│   │   │   │   ├── excel_import.py        # ایمپورت دسته‌ای اکسل/CSV محصولات
│   │   │   │   ├── groq_service.py        # تولید هوشمند متادیتا و توضیحات بدون توهم
│   │   │   │   ├── image_pipeline.py      # اعتبارسنجی MIME، اسکن SVG و نرمال‌سازی تصویر
│   │   │   │   ├── payment.py             # درایور انتزاعی زرین‌پال و ماک گیت‌وی
│   │   │   │   ├── replenishment.py       # فرمول زوال غذا بر اساس وزن و نژاد
│   │   │   │   └── sms.py                 # درایور پیامک خدماتی (SMS.ir) و ماک
│   │   │   └── fixtures/                  # داده‌های اولیه و تست
│   │   │       ├── production_seed.py     # سید کاتالوگ و کلینیک‌های پروداکشن
│   │   │       └── qa_seeds.py            # اکانت‌ها و سناریوهای تستی QA
│   │   └── tests/                         # مجموعه تست‌های بک‌اند (pytest-asyncio)
│   │       ├── conftest.py                # کلاینت تست اسینکرون و دیتابیس حافظه‌ای
│   │       └── test_*.py (32 فایل)        # تست‌های یکپارچگی، رول‌ها، امنیت و سناریوها
│   │
│   └── web/                               # فرانت‌اند Next.js App Router
│       ├── package.json                   # پکیج‌ها و اسکریپت‌های وب
│       ├── next.config.ts                 # پیکربندی Next.js و تنظیمات عکس‌ها
│       ├── tailwind.config.ts             # تم رنگی، فونت وزیرمتن و انیمیشن‌ها
│       ├── postcss.config.mjs             # پلاگین‌های PostCSS و Autoprefixer
│       ├── playwright.config.ts           # پیکربندی تست‌های E2E
│       ├── e2e/                           # تست‌های اندتو‌اند Playwright
│       │   ├── core-flows.spec.ts         # تست جریان‌های احراز هویت و کاتالوگ
│       │   ├── golden-path.spec.ts        # تست مسیر طلایی از لندینگ تا خرید و مراقبت
│       │   └── playwright.d.ts            # تایپ‌های کمکی تله‌متری در تست
│       ├── scripts/
│       │   └── capture-all-screenshots.mjs# اسکریپت ضبط اسکرین‌شات دسکتاپ و موبایل
│       └── src/
│           ├── app/                       # صفحات روتینگ App Router
│           │   ├── layout.tsx             # لی‌اوت اصلی، فونت وزیرمتن و هدر/فوتر
│           │   ├── page.tsx               # صفحه اصلی و لندینگ پیج بونیو
│           │   ├── globals.css            # استایل‌های عمومی Tailwind و متغیرهای تم
│           │   ├── error.tsx              # مدیریت خطاهای رندرتایم سراسری
│           │   ├── not-found.tsx          # صفحه ۴۰۴ اختصاصی
│           │   ├── manifest.ts            # مانیفست PWA وب‌اپلیکیشن
│           │   ├── admin/                 # پیشخوان ادمین و لاگین ادمین
│           │   ├── adopt/                 # درگاه واگذاری و سرپرستی حیوانات
│           │   ├── boarding/              # رزرو مهد و پانسیون سگ و گربه
│           │   ├── cart/                  # سبد خرید چندتأمینی متصل به پت
│           │   ├── checkout/              # جریان تسویه، درگاه و تأیید پرداخت
│           │   ├── dashboard/             # پرتال کاربران، پت‌ها، وظایف، سفارشات و نقش‌ها
│           │   ├── discover/              # نقشه تعاملی خدمات شهری
│           │   ├── events/                # ایونت‌های جامعه سرپرستان
│           │   ├── medical-disclaimer/    # سلب مسئولیت پزشکی
│           │   ├── passport/              # صفحه اسکن تگ و بارکد عمومی پت
│           │   ├── privacy/               # سیاست‌های حریم خصوصی
│           │   ├── return-policy/         # قوانین مرجوعی کالا
│           │   ├── shop/                  # فروشگاه، فیلترها و جزئیات کالا
│           │   ├── terms/                 # قوانین و مقررات پلتفرم
│           │   ├── trainers/              # مربیان رفتارشناسی و آموزش
│           │   └── vets/                  # کلینیک‌ها و رزرو وقت دامپزشک
│           ├── components/                # کامپوننت‌های ماژولار و رابط کاربری
│           │   ├── admin/                 # نماهای مدیریت محصولات، نظرات و فیچرفلگ‌ها
│           │   ├── auth/                  # مدال OTP دورحله‌ای لاگین
│           │   ├── brand/                 # لوگوی SVG و نماد برند بونیو
│           │   ├── cards/                 # کارت‌های عمومی کالا، کلینیک، مربی و پانسیون
│           │   ├── care/                  # داشبورد وظایف روزانه، چت‌بات و ویجت تکرار غذا
│           │   ├── cart/                  # نمای سبد خرید و تفکیک محموله‌ها
│           │   ├── checkout/              # فرم تسویه حساب و صفحه موفقیت
│           │   ├── common/                # بنر قطعی اینترنت و گارد فیچرفلگ
│           │   ├── dashboard/             # ویجت امتیاز پنجه (Paw Points)
│           │   ├── home/                  # بخش‌های لندینگ، جزیره Three.js، ایونت‌ها و برندها
│           │   ├── layout/                # هدر و فوتر دسکتاپ و منوهای ناوبری موبایل
│           │   ├── logistics/             # نقشه زنده رهگیری پیک
│           │   ├── modules/               # کامپوننت‌های روتینگ نقشه و هدرهای سکشن
│           │   ├── passport/              # مدیریت پاسپورت توسط مالک و مدال لوکیشن یابنده
│           │   ├── pet/                   # سوئیچر چند پت و ویزارد ثبت پت جدید
│           │   ├── seller/                # داشبورد و آمار اختصاصی تامین‌کنندگان
│           │   ├── shop/                  # کاتالوگ فروشگاه، کشف محصول و بنرهای تبلیغاتی
│           │   ├── support/               # دراور تماس با پشتیبانی
│           │   └── ui/                    # المان‌های پایه (دکمه، اینپوت، نشان، ستاره و قیمت)
│           ├── context/                   # کانتکست‌های ری‌اکت و استیت منیجمنت
│           │   ├── auth-context.tsx       # وضعیت ورود، نقش جاری کاربر و متدهای OTP
│           │   ├── cart-context.tsx       # سبد خرید، محاسبه تفکیک محموله و سنک سرور
│           │   ├── pet-context.tsx        # انتخاب پت جاری، وظایف سلامت و ثبت مشخصات
│           │   └── theme-context.tsx      # دارک‌مود، لایت‌مود و پایداری در لوکال‌استوریج
│           ├── data/                      # داده‌های ماک و آفلاین
│           │   ├── mock-catalog.ts        # محصولات پیش‌فرض کاتالوگ
│           │   └── mock-pets.ts           # پت‌ها، روتین‌های روزانه و فعالیت‌های اولیه
│           ├── lib/                       # توابع کمکی و کلاینت‌های API
│           │   ├── analytics.ts           # ارسال تله‌متری و ضبط رویدادهای کاربری
│           │   ├── utils.ts               # اعداد و پول فارسی و ترکیب کلاس‌های Tailwind
│           │   └── api/                   # توابع ارتباطی با بک‌اند FastAPI
│           │       ├── client.ts          # تنظیم آدرس بیس `/api/v1`
│           │       ├── admin.ts           # فراخوانی ای‌پی‌آی‌های پنل ادمین
│           │       ├── catalog.ts         # دریافت محصولات و فیلترهای فروشگاه
│           │       ├── checkout.ts        # رزرو انبار، پیش‌فاکتور و همگام‌سازی سبد
│           │       ├── subscriptions.ts   # اشتراک دوره‌ای تحویل غذا
│           │       ├── vets.ts            # فراخوانی کلینیک‌ها و نوبت‌دهی
│           │       └── wallet.ts          # اطلاعات کیف پول و تراکنش‌ها
│           └── types/                     # تعاریف تایپ و اینترفیس‌های TypeScript
│               ├── auth.ts                # نقش‌ها، پروفایل کاربر و سشن
│               ├── cart.ts                # آیتم‌های سبد، مرسوله‌ها و تایم‌اسلات تحویل
│               ├── catalog.ts             # محصول کانونیکال، آفر فروشنده و واریانت‌ها
│               ├── pet.ts                 # ساختار اطلاعاتی پت، واکسیناسیون و تسک‌ها
│               ├── subscription.ts        # تناوب زمانی، وضعیت اشتراک و محموله
│               └── vet.ts                 # کلینیک، اسلات‌های زمانی و پرونده درمانی
```

---

## ۳. شناسنامه تک‌تک فایل‌ها (File Identity Directory)

### الف. ریشه، کانفیگ و زیرساخت (Root & DevOps)
- `package.json`: مونو‌ریپو اسکریپت رانر؛ مدیریت بیلد، تایپ‌چک و لینت فضای کاری `apps/web`.
  - *وابستگی‌ها*: `next`, `typescript`, `eslint`.
- `server.js`: سرور نود پروداکشن با سازگاری Cloud Run/Docker؛ مدخل اجرای بیلد Standalone با فال‌بک به `next start`.
  - *توابع/نقش*: راه‌اندازی هاست و پورت داینامیک، فراخوانی سرور خروجی مونو‌ریپو.
- `docker-compose.yml`: ارکستراسیون ۴ کانتینر ایزوله شامل Postgres 16، FastAPI backend، Next.js web و Nginx.
  - *متغیرها/شبکه*: اتصال بین پورت‌های ۳۰۰۰، ۸۰۰۰، ۵۴۳۲ و ۸۰.
- `nginx/nginx.conf`: ریورس پروکسی و هدایت مسیرهای `/api/` به بک‌اند و `/` به فرانت‌اند؛ هندلینگ Gzip و کش استاتیک.
- `scripts/copy-build-artifacts.js`: اتوماسیون پسابیلد برای انتقال دایرکتوری‌های `static` و `public` به پوشه standalone.
- `scripts/secret_scan.py`: اسکریپت اسکن سورس‌کد و جلوگیری از درج تصادفی توکن‌های JWT و کلیدهای خصوصی در گیت.
- `.env.example`: الگوی رسمی تنظیمات محیطی شامل پارامترهای دیتابیس، JWT، پیامک، زرین‌پال، هوش مصنوعی و QA.

---

### ب. هسته و تنظیمات بک‌اند (`apps/backend/src/core`)
- `apps/backend/src/core/config.py`: مدیریت مرکزی متغیرهای محیطی با Pydantic `BaseSettings` و متد اعتبارسنجی Fail-Fast پروداکشن.
  - *خروجی*: شیء `settings` حاوی آدرس دیتابیس، طول عمر OTP، سکرت JWT، کانفیگ SMS.ir و پارامترهای QA.
- `apps/backend/src/core/database.py`: کارخانه سشن‌های ناهمگام دیتابیس (`AsyncSessionLocal`) و کلاس پایه `Base`.
  - *وابستگی‌ها*: `sqlalchemy.ext.asyncio`, `src.core.config.settings`.
- `apps/backend/src/core/security.py`: متدهای صدور/اعتبارسنجی توکن JWT، هشینگ کد OTP و دیپندنسی `get_current_user`.
  - *ورودی/خروجی*: خواندن Bearer Header یا کوکی امن و برگرداندن آبجکت `User`.
- `apps/backend/src/core/admin_security.py`: الگوریتم‌های امنیتی اختصاصی ادمین، هشینگ پسورد با Argon2/Bcrypt، نرخ محدودیت ورود و سشن کوکی.
  - *توابع*: `hash_password`, `verify_password`, `create_admin_token`, `get_current_admin`.

---

### ج. مدل‌های پایگاه‌داده بک‌اند (`apps/backend/src/models`)
- `apps/backend/src/models/__init__.py`: نقطه تجمیع و بازصادرات تمام مدل‌های SQLAlchemy جهت شناسایی یکپارچه توسط Alembic.
- `apps/backend/src/models/user.py`: مدل‌های جدول `users`، سشن‌های لاگین، و اعتبارسنجی کد پیامکی (`OtpVerification`) با اینام `UserRole`.
- `apps/backend/src/models/admin.py`: جدول ادمین‌های سیستم (`AdminUser`)، لاگ رخدادهای حساس اداری (`AdminAuditLog`) و توکن‌های ریست پسورد.
- `apps/backend/src/models/pet.py`: جداول حیوانات (`Pet`)، پروفایل تکمیلی سلامت (`PetHealthProfile`)، تسک‌های روزانه (`CareTask`) و لاگ فعالیت‌ها (`PetActivity`).
- `apps/backend/src/models/catalog.py`: کاتالوگ جامع شامل `CanonicalProduct`، دسته‌بندی درختی (`Category`)، آفرهای تامین‌کنندگان (`SellerOffer`)، تصاویر و نظرات خریداران.
- `apps/backend/src/models/order.py`: پردازش سفارش (`Order`)، اقلام سفارش، رزرو موقت انبار (`InventoryReservation`)، سبد خرید پایدار و برنامه تکرار خرید.
- `apps/backend/src/models/vet.py`: ثبت کلینیک‌ها (`Clinic`)، پزشکان (`Veterinarian`)، وقت‌های رزرو شده (`Appointment`) و پرونده درمان (`MedicalRecord`).
- `apps/backend/src/models/trainer.py`: پروفایل مربیان مجاز سگ (`Trainer`) و رزرو جلسات آموزش حضوری/آنلاین (`TrainerSession`).
- `apps/backend/src/models/boarding.py`: مراکز نگهداری و پانسیون شبانه‌روزی (`BoardingCenter`) و قراردادهای اقامت پت (`BoardingBooking`).
- `apps/backend/src/models/event.py`: رویدادهای اجتماعی پت‌ها (`Event`)، بلیت‌های ثبت‌نامی (`EventTicket`) و وضعیت نظارت ادمین.
- `apps/backend/src/models/coupon.py`: کدهای تخفیف درصدی و نقدی (`Coupon`) با مکانیزم جلوگیری از مصرف مجدد (`CouponRedemption`).
- `apps/backend/src/models/wallet.py`: کیف پول ریالی کاربر (`Wallet`)، تاریخچه تراکنش‌ها (`WalletTransaction`) و درخواست‌های تسویه وجه بانکی.
- `apps/backend/src/models/feature_flag.py`: فلگ‌های پویای روشن/خاموش کردن فیچرهای پلتفرم بدون نیاز به دیپلوی مجدد (`PlatformFeatureFlag`).
- `apps/backend/src/models/subscription.py`: قراردادهای اشتراک خودکار سفارش غذا و ملزومات دوره‌ای (`PetFoodSubscription`).
- `apps/backend/src/models/logistics.py`: مدیریت سفارشات ارسالی با پیک درون‌شهری (`CourierShipment`)، موقعیت جغرافیایی و زمان‌بندی تحویل.
- `apps/backend/src/models/settlement.py`: جدول تسویه‌حساب فروشندگان مارکت‌پلیس (`VendorSettlement`) با نگهداری کارمزد پلتفرم و ردیف پایا.
- `apps/backend/src/models/nfc.py`: رجیستری سخت‌افزاری تگ‌های ضدآب قلاده هوشمند (`SmartCollarTag`) و نگاشت توکن فیزیکی به شناسه پت.
- `apps/backend/src/models/amber_alert.py`: وضعیت پت‌های گمشده (`LostPetAlert`)، ردیابی مشاهدات گزارش‌شده توسط عموم و ثبت انعام.
- `apps/backend/src/models/adoption.py`: ثبت مشخصات پت‌های نیازمند واگذاری اخلاقی رایگان (`AdoptionListing`) و فرم بررسی صلاحیت سرپرست جدید.
- `apps/backend/src/models/loyalty.py`: امتیاز پنجه کاربر (`PawPointsLedger`) و بن‌های تخفیف خریداری شده از طریق گیمیفیکیشن.

---

### د. اندپوینت‌ها و کنترلرهای بک‌اند (`apps/backend/src/api/v1`)
- `apps/backend/src/api/v1/health.py`: مسیر پایش سلامت زیرساخت (`GET /health`) برای پروپ‌های کوبرنتیز و داکر.
- `apps/backend/src/api/v1/auth.py`: لاگین و ثبت‌نام سریع؛ ارسال OTP پنج‌رقمی پیامکی (`POST /auth/otp/request`)، اعتبارسنجی (`POST /auth/otp/verify`) و پروفایل من (`GET /auth/me`).
- `apps/backend/src/api/v1/admin_auth.py`: احراز هویت ادمین‌ها با پسورد و ورود دو مرحله‌ای (`/admin/auth/login`)، لاگ‌آوت و گزارش لاگ‌های ممیزی.
- `apps/backend/src/api/v1/admin.py`: مدیریت اداری؛ تایید احراز هویت فروشندگان، مدیریت اختلافات مالی، ویرایش و ایمپورت اکسل محصولات و تایید نظرات.
- `apps/backend/src/api/v1/pets.py`: عملیات CRUD پت‌های کاربر (`/pets/`)، ثبت شناسنامه دیجیتال، و ثبت لاگ فعالیت‌های ورزشی.
- `apps/backend/src/api/v1/care.py`: مدیریت چک‌لیست روزانه مراقبت از پت (`/care/tasks`) و دریافت خلاصه‌وضعیت درصد تکمیل برنامه روزانه.
- `apps/backend/src/api/v1/passport.py`: پروفایل عمومی با قابلیت اسکن QR تگ (`GET /passport/{token}`)، تماس امن با صاحب و ارسال لوکیشن رویت توسط یابنده.
- `apps/backend/src/api/v1/catalog.py`: دریافت اقلام فروشگاه به تفکیک نژاد و رده (`GET /catalog/products`)، منطق Buy-Box بهترین قیمت، و درج نظر کاربر.
- `apps/backend/src/api/v1/checkout.py`: اتمیک رزرو موجودی انبار برای ۱۰ دقیقه (`POST /checkout/reserve`)، سنک سبد خرید سمت سرور و محاسبه مرسوله‌ها.
- `apps/backend/src/api/v1/payment.py`: تولید لینک درگاه بانکی (`POST /payment/request`) و اعتبارسنجی بازگشت وجه زرین‌پال (`GET /payment/verify`).
- `apps/backend/src/api/v1/replenishment.py`: پیش‌بینی تاریخ اتمام غذای پت بر اساس مصرف روزانه و فراخوانی خودکار جاب نوتیفیکیشن.
- `apps/backend/src/api/v1/sellers.py`: ثبت‌نام تامین‌کنندگان و KYC، تعریف و بروزرسانی قیمت و موجودی انبار، و تایید مراحل ارسال سفارشات.
- `apps/backend/src/api/v1/vets.py`: لیست کلینیک‌های دارای گواهی، نوبت‌های خالی پزشکان و ثبت وقت ویزیت آنلاین یا حضوری.
- `apps/backend/src/api/v1/medical_records.py`: ثبت یادداشت‌های بالینی و پرونده سابقه واکسیناسیون و داروهای پت توسط دامپزشک تایید شده.
- `apps/backend/src/api/v1/trainers.py`: فهرست مربیان معتبر رفتارشناسی سگ، دریافت رزومه و رزرو جلسات آموزشی اصلاح ناهنجاری.
- `apps/backend/src/api/v1/boarding.py`: فهرست پانسیون‌های دارای مجوز، تقویم ظرفیت و ثبت سفارش پذیرش پت به همراه امکانات جانبی.
- `apps/backend/src/api/v1/events.py`: رویدادهای اجتماعی و دورهمی‌های شهری سرپرستان پت، خرید بلیت و بررسی رویداد توسط ادمین.
- `apps/backend/src/api/v1/coupons.py`: اعتبارسنجی کدهای تخفیف با اعتبارسنجی سقف، حداقل سبد و تاریخ انقضا.
- `apps/backend/src/api/v1/wallet.py`: استعلام موجودی شارژ کیف پول و ارسال درخواست تسویه ریالی به حساب شبا.
- `apps/backend/src/api/v1/feature_flags.py`: دریافت وضعیت ماژول‌های فعال و سوییچ کردن دسترسی فیچرها برای کل پلتفرم.
- `apps/backend/src/api/v1/subscriptions.py`: ثبت اشتراک منظم ماهانه تحویل غذا، تغییر تاریخ یا توقف موقت سرویس.
- `apps/backend/src/api/v1/logistics.py`: برآورد هزینه حمل، ایجاد محموله پیک اختصاصی تهران و ره‌گیری آنلاین روی نقشه.
- `apps/backend/src/api/v1/settlements.py`: محاسبه دوره‌ای سهم فروشندگان پس از کسر کارمزد و صدور سند تسویه پایا.
- `apps/backend/src/api/v1/wms_webhooks.py`: وب‌هوک اتصال نرم‌افزار انبارداری فروشندگان خارجی جهت بروزرسانی لحظه‌ای انبار.
- `apps/backend/src/api/v1/nfc.py`: فعال‌سازی تگ خام گردنبند و تخصیص آن به پروفایل حیوان خانگی.
- `apps/backend/src/api/v1/amber_alert.py`: فعال‌سازی وضعیت اعلام مفقودی پت و ارسال هشدار درون‌برنامه‌ای به کاربران مجاور.
- `apps/backend/src/api/v1/adoption.py`: ثبت آگهی واگذاری بدون دریافت وجه و مدیریت فرم‌های تقاضای سرپرستی.
- `apps/backend/src/api/v1/loyalty.py`: اعطای امتیاز وفاداری (Paw Points) در ازای انجام تسک‌ها و صدور کدهای تخفیف.
- `apps/backend/src/api/v1/discovery.py`: اندپوینت سرچ جغرافیایی بر اساس مختصات کاربر برای یافتن نزدیک‌ترین کلینیک‌ها و پت‌شاپ‌ها.
- `apps/backend/src/api/v1/services.py`: ثبت نوبت‌های مربوط به آرایشگاه و گرومینگ به همراه اعتبارسنجی واکسن‌های لازم.
- `apps/backend/src/api/v1/ai_copilot.py`: وب‌سرویس مشاور هوش مصنوعی تغذیه و سلامت بونیو متصل به سرویس Groq با پرامپت محافظت‌شده.
- `apps/backend/src/api/v1/analytics.py`: اینجست سروری ایونت‌های کلیک و تعامل تله‌متری فرانت‌اند.

---

### ه. سرویس‌ها و منطق بیزنس بک‌اند (`apps/backend/src/services`)
- `apps/backend/src/services/excel_import.py`: پارسر اکسل/CSV کالاهای ورودی؛ اعتبارسنجی ردیفی، گزارش مغایرت و درج دسته‌ای کالاها در دیتابیس.
- `apps/backend/src/services/groq_service.py`: رابط هوش مصنوعی پروداکشن Groq جهت تولید عنوان‌های روان فارسی، مزایا و سئو بر اساس قوانین ضد توهم.
- `apps/backend/src/services/image_pipeline.py`: خط لوله امنیتی تصاویر کاتالوگ؛ اسکن حملات XSS فایل‌های SVG، تعیین اندازه و فرمت WebP.
- `apps/backend/src/services/payment.py`: ساختار چندلایه‌ای تراکنش مالی؛ پیاده‌سازی اتصال به درگاه زرین‌پال و ماک گیت‌وی جهت تست‌های خودکار.
- `apps/backend/src/services/replenishment.py`: الگوریتم محاسبه دوز مصرفی بر اساس جدول نژادی و پیش‌بینی هوشمند تاریخ انقضای بسته غذا.
- `apps/backend/src/services/sms.py`: سرویس اعزام پیامک وب‌سرویسی با پشتیبانی از خطوط خدماتی SMS.ir و حالت ماک برای محیط توسعه.

---

### و. صفحات و روت‌های وب (`apps/web/src/app`)
- `src/app/layout.tsx`: پوسته سراسری سایت؛ تنظیم متاداده، فونت محلی Vazirmatn، جهت RTL و ساختار کانتکست‌های ریشه.
- `src/app/page.tsx`: صفحه فرود (Home)؛ هدر سه بعدی جزیره شناور، معرفی سرویس‌ها، محصولات برگزیده و برندهای معتبر.
- `src/app/globals.css`: تعاریف استایل‌های اصلی، توکن‌های رنگی HSL، اسکرول‌بار سفارشی و تنظیمات تایپوگرافی فارسی.
- `src/app/error.tsx`: مرز خطای کلاینتی برای نمایش پیام خطا و دکمه بازیابی.
- `src/app/not-found.tsx`: صفحه ۴۰۴ سفارشی با طراحی دوستانه و دکمه بازگشت به خانه.
- `src/app/manifest.ts`: فایل تولید داینامیک وب‌مانیفست PWA.
- `src/app/admin/layout.tsx`: بررسی هویت و سشن ادمین و ارائه نوبار مدیریتی.
- `src/app/admin/page.tsx`: پنل اصلی ادمین شامل آمار پلتفرم، تایید محصولات و نظارت بر فروشندگان.
- `src/app/admin/login/page.tsx`: فرم لاگین امن ادمین با پشتیبانی از نام‌کاربری، رمز عبور و کد دوعاملی.
- `src/app/shop/page.tsx`: کاتالوگ فروشگاه؛ فیلتر بر اساس گونه حیوان، برند، رده‌بندی قیمتی و چیدمان محصولات.
- `src/app/shop/[slug]/page.tsx`: برگه محصول؛ نمایش تصاویر، انتخاب وزن، مشخصات فنی و جعبه خرید (Buy Box).
- `src/app/cart/page.tsx`: سبد خرید با تفکیک خودکار مرسوله‌ها و انتساب هر محصول به پت مشخص.
- `src/app/checkout/page.tsx`: صفحه تسویه‌حساب؛ انتخاب آدرس، زمان تحویل و اعمال کوپن تخفیف.
- `src/app/checkout/callback/page.tsx`: هندلینگ بازگشت کاربر از درگاه و تایید نهایی سفارش.
- `src/app/checkout/sandbox/page.tsx`: محیط شبیه‌ساز پرداخت زرین‌پال جهت اعتبارسنجی در تست‌های آفلاین.
- `src/app/checkout/success/page.tsx`: پیام موفقیت ثبت سفارش، شماره پیگیری و نمایش جزئیات مرسوله‌ها.
- `src/app/dashboard/page.tsx`: داشبورد اصلی صاحب پت؛ وضعیت وظایف روزانه و رژیم غذایی امروز.
- `src/app/dashboard/care/page.tsx`: نمای مدیریت وظایف سلامت، تغذیه و تحرک با دستیار Copilot.
- `src/app/dashboard/pets/page.tsx`: مدیریت پروفایل‌های پت، سوابق و دکمه اضافه کردن حیوان خانگی جدید.
- `src/app/dashboard/passport/page.tsx`: پیشخوان مدیریت پاسپورت QR، اعلان گم‌شدن و تنظیم اطلاعات تماس فوری.
- `src/app/dashboard/appointments/page.tsx`: مشاهده و لغو نوبت‌های رزرو شده کلینیک و آرایشگاه.
- `src/app/dashboard/subscriptions/page.tsx`: لیست اشتراک‌های تحویل خودکار غذا و امکان تغییر موعد تحویل.
- `src/app/dashboard/tracking/page.tsx`: ردیابی زنده وضعیت سفارش و موقعیت مکانی پیک موتوری.
- `src/app/dashboard/wallet/page.tsx`: مشاهده کیف پول، سوابق تراکنش‌ها و فرم درخواست تسویه شبا.
- `src/app/dashboard/profile/page.tsx`: تنظیمات اطلاعات شخصی کاربر و آدرس‌های تحویل.
- `src/app/dashboard/seller/page.tsx`: پنل اختصاصی فروشندگان جهت رویت سفارشات و تایید بسته‌بندی.
- `src/app/dashboard/vet/page.tsx`: پنل اختصاصی پزشک برای مشاهده نوبت‌ها و ثبت سابقه پزشکی.
- `src/app/dashboard/trainer/page.tsx`: پنل مربی جهت هماهنگی جلسات تربیت سگ.
- `src/app/dashboard/organizer/page.tsx`: مدیریت رویدادها و لیست شرکت‌کنندگان همایش‌ها.
- `src/app/dashboard/admin/page.tsx`: ریدایرکت یا نمای الحاقی داشبورد برای ادمین‌ها.
- `src/app/vets/page.tsx`: دایرکتوری جامع کلینیک‌های تهران با قابلیت جستجو و فیلتر تخصص.
- `src/app/vets/[id]/page.tsx`: صفحه معرفی کلینیک و فرم انتخاب پزشک و اسلات زمانی ویزیت.
- `src/app/trainers/page.tsx`: راهنمای مربیان رفتارشناسی، متدهای تشویقی و انتخاب مربی.
- `src/app/trainers/[id]/page.tsx`: پروفایل تکی مربی، تعرفه جلسات و رزرو دوره.
- `src/app/boarding/page.tsx`: لیست پانسیون‌ها و مراکز اقامت به تفکیک امکانات نظیر دوربین زنده.
- `src/app/boarding/[id]/page.tsx`: مشخصات هتل پت، گالری تصاویر و فرم رزرو تاریخ ورود و خروج.
- `src/app/events/page.tsx`: لیست رویدادهای اجتماعی جامعه سرپرستان به همراه وضعیت بلیت.
- `src/app/events/[id]/page.tsx`: معرفی جزئیات رویداد و خرید بلیت شرکت در دورهمی.
- `src/app/adopt/page.tsx`: پرتال واگذاری اخلاقی رایگان و فرم آنلاین ابراز علاقه سرپرستی.
- `src/app/discover/page.tsx`: نقشه تعاملی شهر برای کاوش پارک‌ها، بیمارستان‌ها و پت‌شاپ‌ها.
- `src/app/passport/[token]/page.tsx`: صفحه عمومی حاصل از اسکن QR قلاده حیوان؛ دسترسی به تماس اضطراری و لوکیشن‌یاب.
- `src/app/terms/page.tsx`: ضوابط حقوقی استفاده از پلتفرم بونیو.
- `src/app/privacy/page.tsx`: حریم خصوصی و پروتکل محافظت از داده‌های کاربران.
- `src/app/return-policy/page.tsx`: شرایط ۷ روزه بازگشت کالای پت و استثنائات بهداشتی.
- `src/app/medical-disclaimer/page.tsx`: متن قانونی سلب مسئولیت توصیه‌های دامپزشکی آنلاین.

---

### ز. کامپوننت‌های رابط کاربری (`apps/web/src/components`)
- `components/layout/desktop-header.tsx`: هدر دسکتاپ شامل لوگو، سرچ، سوییچر نقش، سبد خرید و دکمه پروفایل.
- `components/layout/desktop-footer.tsx`: فوتر دسکتاپ با لینک‌های پشتیبانی، مجوزها و شعار اکوسیستم.
- `components/layout/mobile-top-header.tsx`: هدر مینیمال برای صفحات موبایل با تاگل تم و سبد خرید.
- `components/layout/mobile-bottom-nav.tsx`: نوار ناوبری پایینی موبایل با دسترسی سریع به خانه، کاتالوگ، مراقبت و پروفایل.
- `components/layout/role-switcher.tsx`: منوی شناور تغییر نقش آزمایشی بین سرپرست، ادمین، فروشنده، پزشک و مربی.
- `components/brand/bonyo-logo.tsx`: کامپوننت رندر SVG نماد و نشان‌واره بونیو در حالت‌های افقی و عمودی.
- `components/auth/otp-auth-modal.tsx`: مدال دورحله‌ای ورود با شماره موبایل و ثبت کد پنج‌رقمی تایید پیامکی.
- `components/home/hero-island-banner.tsx`: بنر هدر لندینگ پیج با محفظه رندر ۳D جزیره بونیو.
- `components/home/three-island-canvas.tsx`: وب‌جی‌ال سه‌بعدی سبک مبتنی بر Three.js نمایش‌دهنده جزیره متحرک بونیو.
- `components/home/island-progressive-container.tsx`: محفظه تطبیق‌پذیر جهت لود گام‌به‌گام و سازگار با رندرینگ SSR.
- `components/home/featured-products-row.tsx`: اسلایدر افقی نمایش محصولات پیشنهادی همراه با دکمه خرید سریع.
- `components/home/personalized-products-section.tsx`: نمایش هوشمند تغذیه مناسب بر اساس سن و نژاد پت انتخاب‌شده.
- `components/home/product-categories-section.tsx`: گرید دسته‌بندی‌های اصلی شامل سگ، گربه، پرنده و ملزومات سلامت.
- `components/home/local-ecosystem-section.tsx`: معرفی پیوند میان خدمات محلی، کلینیک‌ها و تأمین‌کنندگان سریع.
- `components/home/latest-events-section.tsx`: کارت‌های نمایش جدیدترین گردهمایی‌های حضوری سرپرستان.
- `components/home/best-trainers-section.tsx`: سکشن مربیان دارای بالاترین امتیاز رضایت مشتریان.
- `components/home/partner-brands-section.tsx`: نمایش لوگوی برندهای معتبر همکار نظیر رویال کنین و پروپلن.
- `components/home/why-bonnivo-section.tsx`: اینفوگرافیک مزایای اصالت کالا، ضمانت تاریخ انقضا و پاسپورت دیجیتال.
- `components/home/social-proof-section.tsx`: نظرات تأییدشده و امتیاز رضایت مالکان حیوانات خانگی.
- `components/home/home-care-teaser.tsx`: خلاصه تعاملی برنامه روزانه غذای پت فعال در صفحه نخست.
- `components/home/city-event-banner.tsx`: بنر تبلیغاتی ایونت ویژه روز شهر تهران.
- `components/cards/product-card.tsx`: کارت محصول با برچسب اصالت، قیمت، تخفیف، و دکمه افزودن مستقیم به سبد.
- `components/cards/vet-card.tsx`: کارت نمایش سوابق کلینیک و دامپزشک با رتبه‌بندی کیفی.
- `components/cards/trainer-card.tsx`: کارت معرفی مهارت‌ها و قیمت هر جلسه مربی.
- `components/cards/boarding-card.tsx`: کارت اقامتگاه با تگ‌های دسترسی به فضای سبز و دوربین آنلاین.
- `components/cards/event-card.tsx`: کارت تاریخ برگزاری، مکان و ظرفیت باقیمانده رویداد.
- `components/cards/base-card.tsx`: کامپوننت والد با استایل‌های شیشه‌ای (Glassmorphism) و حاشیه‌های واکنش‌گرا.
- `components/care/today-care-dashboard.tsx`: صفحه تعاملی روتین‌های روزانه، ثبت دارو، میزان پیاده‌روی و لاگ غذا.
- `components/care/smart-reorder-widget.tsx`: ویجت اخطار زوال باقیمانده کیسه غذای خشک و دکمه تکرار خرید در ۱ کلیک.
- `components/care/bonyo-copilot-drawer.tsx`: کشوی چت با هوش مصنوعی مراقبت، تغذیه و هشدارهای سلامتی پت.
- `components/cart/cart-view.tsx`: صفحه سبد خرید، تفکیک انبارها، هزینه حمل مجزا و سوییچ انتساب پت.
- `components/checkout/checkout-view.tsx`: فرم کامل ثبت نشانی، هماهنگی زمان تحویل و درگاه بانکی.
- `components/checkout/checkout-success-view.tsx`: تبریک سفارش با کد پیگیری، فاکتور و زمانبندی تحویل هر بسته.
- `components/passport/owner-passport-manager.tsx`: رابط کاربری فعال‌سازی حالت گم‌شده، متن پیامک یابنده و QR اختصاصی.
- `components/passport/sighting-location-modal.tsx`: پاپ‌آپ یابنده جهت ارسال لوکیشن دقیق از طریق GPS مرورگر به صاحب پت.
- `components/pet/multi-pet-switcher.tsx`: نوار آیکون‌های پت‌ها در بالای داشبورد برای سوئیچ سریع پروفایل.
- `components/pet/pet-onboarding-wizard.tsx`: فرم چندمرحله‌ای افزودن پت جدید (نام، گونه، نژاد، تاریخ تولد و وزن).
- `components/shop/shop-catalog-view.tsx`: کامپوننت کلید مدیریت لیست کالاها، سایدبار فیلتر و رتبه‌بندی.
- `components/shop/shop-discovery-view.tsx`: نمایش برگزیده‌های کاتالوگ با ردیف‌های اختصاصی دسته‌ها.
- `components/shop/shop-category-list-view.tsx`: فهرست محصولات با قابلیت چیدمان متراکم و فیلتر آنی.
- `components/shop/shop-compact-row-card.tsx`: کارت افقی فشرده کالا مخصوص نمایش در موبایل و لیست‌های خرید.
- `components/shop/product-detail-view.tsx`: گالری، تب‌های مشخصات، انتخاب بسته‌بندی، باکس تخفیف و آفر فروشندگان.
- `components/shop/shop-promo-banners.tsx`: بنرهای ترغیب خرید دوره‌ای و ارسال رایگان درون کاتالوگ.
- `components/shop/shop-categories-banner.tsx`: بنر گرید آیکونی دسته‌های غذای خشک، کنسرو و تشویقی.
- `components/shop/shop-top-stores-row.tsx`: ردیف نمایش پت‌شاپ‌های معتبر مستقر در تهران با تحویل سریع.
- `components/admin/admin-panel-view.tsx`: تب‌های مدیریتی، لاگ ممیزی و آمار فروش.
- `components/admin/admin-product-management.tsx`: جدول کاتالوگ با قابلیت فعال/غیرفعال کردن، تولید توضیحات AI و ویرایش.
- `components/admin/admin-reviews-management.tsx`: صف بررسی و تایید نظرات کاربران قبل از انتشار در سایت.
- `components/admin/admin-feature-flags-management.tsx`: رابط کاربری سوییچ تک‌تک ماژول‌های فعال سامانه.
- `components/seller/seller-dashboard-view.tsx`: مدیریت بارکد انبار، تایید مرسولات آماده ارسال و تراز مالی فروشنده.
- `components/logistics/live-courier-map.tsx`: نمایش متحرک آیکون موتور پیک روی نقشه با زمان تخمینی رسیدن.
- `components/modules/map-route-view.tsx`: نمایشگر نقشه جهت مسیریابی آدرس کلینیک‌ها و رویدادها.
- `components/modules/section-header.tsx`: سربرگ هماهنگ سکشن‌ها با تایتل، ساب‌تایتل و دکمه مشاهده همه.
- `components/modules/service-dock.tsx`: نوار دسترسی داک مانند به چهار سرویس اصلی (خرید، دکتر، هتل و تربیت).
- `components/support/support-drawer.tsx`: کشوی تماس مستقیم تلفنی و تیکت آنلاین با کارشناسان پشتیبانی.
- `components/dashboard/paw-points-widget.tsx`: نمایش مدال‌ها و موجودی امتیاز پاداش فعالیت‌های کاربر.
- `components/common/feature-flag-guard.tsx`: کانتینر مسدودکننده کامپوننت در صورت غیرفعال بودن فیچرفلگ از بک‌اند.
- `components/common/offline-banner.tsx`: نوار اخطار بالای صفحه در صورت قطع اتصال اینترنت کاربر.
- `components/ui/index.ts`: بازصادرات المان‌های UI.
- `components/ui/button.tsx`: دکمه استاندارد دیزاین سیستم در انواع primary, secondary, outline, ghost.
- `components/ui/input.tsx`: فیلد ورودی متن با ساپورت استایل‌های RTL و وضعیت خطا.
- `components/ui/badge.tsx`: تگ‌های وضعیت (سبز، زرد، قرمز و خاکستری).
- `components/ui/price-tag.tsx`: نمایش استاندارد قیمت به تومان با اعداد فارسی و خط‌زدن تخفیف.
- `components/ui/rating-stars.tsx`: ستاره‌های امتیازدهی کیفی با اعداد اعشاری فارسی.
- `components/ui/benefit-grid.tsx`: گرید آیکونی مزایای رقابتی محصول.
- `components/ui/photo-dock.tsx`: نوار گالری تصاویر کوچک با قابلیت زوم.
- `components/ui/empty-state.tsx`: تصویر و متن راهنما برای لیست‌های خالی (سبد، سفارشات، پت‌ها).
- `components/ui/featured-promo-banner.tsx`: بنر پروموشن با گرادیانت مدرن و دکمه فراخوان.
- `components/ui/theme-toggle.tsx`: دکمه جابجایی بین حالت‌های روز و شب (Dark/Light).

---

### ح. کانتکست‌ها و مدیریت وضعیت فرانت‌اند (`apps/web/src/context`)
- `context/auth-context.tsx`: احراز هویت؛ نگهداری توکن سشن، پروفایل کاربر، متدهای درخواست/تایید OTP، لاگ‌آوت، و قابلیت تغییر نقش (Role-Switch).
- `context/cart-context.tsx`: سبد خرید؛ نگهداری اقلام، انتساب هر کالا به پت، محاسبه ساب‌توتال و تخفیف‌ها، تفکیک خودکار محموله‌ها (Split Shipment)، و همگام‌سازی دوطرفه با سرور.
- `context/pet-context.tsx`: پت‌ها و مراقبت؛ ثبت و سوییچ پت فعال، لیست تسک‌های روزانه، محاسبه پیشرفت چک‌لیست مراقبت، و کنترل ویزارد ثبت پت.
- `context/theme-context.tsx`: پوسته نمایشی؛ اعمال کلاس `dark` بر تگ HTML و ذخیره در لوکال‌استوریج.

---

### ط. توابع کمکی و کلاینت‌های API فرانت‌اند (`apps/web/src/lib`)
- `lib/utils.ts`: توابع عمومی شامل `cn` برای مرج کردن کلاس‌های Tailwind، و فرمت‌کننده‌های اعداد و مبالغ به زبان و کاراکترهای فارسی (`toPersianDigits`, `formatPersianCurrency`).
- `lib/analytics.ts`: ثبت تله‌متری و رهگیری رویدادهای کاربر بر اساس برنامه `docs/11-analytics-plan.md`؛ ارسال بیکن سروری و انتشار در `window.__bonnivo_events__`.
- `lib/api/client.ts`: مرجع مشترک تنظیم آدرس بیس API بر اساس متغیر `NEXT_PUBLIC_API_URL` و تضمین پسوند `/api/v1`.
- `lib/api/catalog.ts`: دریافت لیست و جزئیات کالاها با فیلتر گونه، رده و برند از دیتابیس FastAPI.
- `lib/api/checkout.ts`: رزرو اتمیک ۱۰ دقیقه‌ای کالاها، سنک کردن کارت، و استعلام پیش‌فاکتور از بک‌اند.
- `lib/api/admin.ts`: توابع ارتباطی با اندپوینت‌های ادمین و لاگین پنل مدیریت.
- `lib/api/subscriptions.ts`: ایجاد و استعلام اشتراک‌های دوره‌ای غذای پت از سرور.
- `lib/api/vets.ts`: واکشی کلینیک‌های طرف قرارداد و ثبت قطعی رزرو وقت ویزیت.
- `lib/api/wallet.ts`: دریافت مانده حساب کیف پول و ارسال تقاضای برداشت موجودی.

---

### ی. داده‌های ماک و تایپ‌های TypeScript (`apps/web/src/data` و `types`)
- `data/mock-catalog.ts`: دیتای اولیه ۲۲ قلم کالای حیوانات جهت بهره‌برداری آفلاین و تست بدون نیاز به راه‌اندازی دیتابیس.
- `data/mock-pets.ts`: سوابق پیش‌فرض پت‌ها، وظایف روزانه و نمودار فعالیت‌های ورزشی.
- `types/auth.ts`: تعاریف اینترفیس‌های کاربر، نقش‌ها (`CUSTOMER`, `ADMIN`, `VET`, `SELLER`, `TRAINER`, `ORGANIZER`) و پاسخ‌های OTP.
- `types/cart.ts`: ساختار داده سبد خرید، بسته‌های تفکیک‌شده محموله‌ها، و بازه‌های زمانی ارسال.
- `types/catalog.ts`: اینترفیس‌های کالای کانونیکال، آفر فروشنده با زمان آماده‌سازی، واریانت وزنی و امتیازات.
- `types/pet.ts`: ساختار پت، مشخصات واکسن و انگل‌تراپی، دسته‌بندی تسک‌ها و رکورد فعالیت.
- `types/subscription.ts`: مدل‌های تناوب تحویل دوره‌ای غذا و اطلاعات بسته‌ها.
- `types/vet.ts`: اینترفیس‌های کلینیک، دامپزشک، اسلات‌های تقویم و پرونده پزشکی.

---

### ک. تست‌ها و تضمین کیفیت (Tests & Verification)
- `apps/backend/tests/conftest.py`: فیکسچرهای تست Pytest با پایگاه‌داده موقت در حافظه SQLite و توکن‌های آماده ادمین و مشتری.
- `apps/backend/tests/test_*.py`: ۳۲ فایل تست جامع اعتبارسنجی فرآیندهای مالی، احراز هویت، انبارداری، سفارشات، ای‌پی‌آی‌ها و قوانین کسب‌وکار:
  - `test_admin_auth.py`, `test_admin_disputes.py`, `test_adoption.py`, `test_ai_copilot.py`, `test_amber_alert.py`, `test_analytics.py`, `test_auth_otp.py`, `test_buy_box.py`, `test_care_tasks.py`, `test_catalog_models.py`, `test_final_rework_business_rules.py`, `test_health.py`, `test_inventory_reservation.py`, `test_logistics_dispatch.py`, `test_loyalty.py`, `test_medical_records.py`, `test_nfc_tags.py`, `test_passport_emergency.py`, `test_payment.py`, `test_pets_crud_security.py`, `test_production_catalog_and_discovery.py`, `test_qa_role_simulation.py`, `test_replenishment.py`, `test_security_idor_audit.py`, `test_seller_inventory_fulfillment.py`, `test_seller_kyc.py`, `test_services_vaccine_guard.py`, `test_sms_dispatcher.py`, `test_subscriptions.py`, `test_vendor_settlement.py`, `test_vet_booking.py`, `test_wms_webhooks.py`.
- `apps/web/e2e/core-flows.spec.ts`: سناریوهای تستی Playwright برای فرم لاگین OTP و مشاهده کاتالوگ.
- `apps/web/e2e/golden-path.spec.ts`: سناریوی مسیر طلایی کامل از لندینگ تا خرید با سبد تفکیکی و ثبت تسک‌های روزانه.
- `apps/web/scripts/capture-all-screenshots.mjs`: ربات خودکار پویش تمام ۲۸ صفحه اپلیکیشن در دو ویوپورت موبایل و دسکتاپ و ذخیره شواهد تصویری در `docs/screenshots`.

---

## ۴. جدول نقاط کلیدی (Key Endpoints / Routes / State)

### جدول الف: مسیرهای اصلی فرانت‌اند (Front-End Core Routes)

| آدرس مسیر (URL) | عنوان و نقش صفحه | کامپوننت کلیدی | دسترسی / گارد |
| :--- | :--- | :--- | :--- |
| `/` | لندینگ پیج و معرفی اکوسیستم | `HomePage` + `HeroIslandBanner` | عمومی |
| `/shop` | فروشگاه و کاتالوگ محصولات | `ShopPage` + `ShopCatalogView` | عمومی |
| `/shop/[slug]` | صفحه اختصاصی کالا و بایک‌باکس | `ProductDetailPage` + `ProductDetailView` | عمومی |
| `/cart` | سبد خرید متصل به پت و تفکیک محموله | `CartPage` + `CartView` | عمومی |
| `/checkout` | تسویه حساب، آدرس و انتخاب بازه ارسال | `CheckoutPage` + `CheckoutView` | نیازمند ورود |
| `/checkout/success` | برگه موفقیت پرداخت و فاکتور نهایی | `CheckoutSuccessPage` | عمومی |
| `/dashboard` | داشبورد خلاصه فعالیت‌های امروز | `CustomerDashboardPage` | نیازمند ورود |
| `/dashboard/care` | چک‌لیست روتین روزانه و کوپایلوت AI | `CarePage` + `TodayCareDashboard` | نیازمند ورود |
| `/dashboard/pets` | مدیریت شناسنامه و پت‌های کاربر | `PetsHubPage` + `PetOnboardingWizard` | نیازمند ورود |
| `/dashboard/passport` | تنظیمات پاسپورت هوشمند و وضعیت مفقودی | `PassportPage` + `OwnerPassportManager` | نیازمند ورود |
| `/dashboard/tracking` | رهگیری زنده مرسولات روی نقشه | `OrderTrackingPage` + `LiveCourierMap` | نیازمند ورود |
| `/dashboard/wallet` | کیف پول و درخواست تسویه ریالی | `WalletDashboardPage` | نیازمند ورود |
| `/dashboard/subscriptions` | اشتراک تحویل خودکار غذا | `SubscriptionsDashboardPage` | نیازمند ورود |
| `/passport/[token]` | صفحه عمومی اسکن QR قلاده گمشده | `PublicPassportScanPage` | عمومی |
| `/vets` | دایرکتوری درمانگاه‌ها و بیمارستان‌ها | `VetsDirectoryPage` | عمومی |
| `/vets/[id]` | پروفایل درمانگاه و رزرو نوبت دکتر | `ClinicBookingPage` | عمومی |
| `/boarding` | رزرو هتل و مهد سگ و گربه | `BoardingPage` | عمومی |
| `/trainers` | دایرکتوری و رزرو جلسات مربیگری | `TrainersPage` | عمومی |
| `/events` | تقویم و خرید بلیت همایش‌های پت | `EventsPage` | عمومی |
| `/adopt` | سامانه واگذاری اخلاقی رایگان | `AdoptionPortalPage` | عمومی |
| `/admin` | پیشخوان مدیریت مرکزی پلتفرم | `AdminDashboardPage` + `AdminPanelView` | ادمین |
| `/admin/login` | ورود به کنترل‌پنل مدیریت | `AdminLoginPage` | عمومی |

---

### جدول ب: اندپوینت‌های کلیدی بک‌اند (Key API Endpoints)

| متد | آدرس اندپوینت (API Route) | وظیفه و منطق عملیاتی | مدل پایگاه‌داده درگیر |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/auth/otp/request` | تولید کد OTP و ارسال پیامک تاییدیه | `OtpVerification`, `User` |
| `POST` | `/api/v1/auth/otp/verify` | بررسی کد OTP و صدور JWT سشن | `OtpVerification`, `User`, `UserSession` |
| `GET` | `/api/v1/catalog/products` | دریافت کاتالوگ با تخفیف‌ها و بایک‌باکس | `CanonicalProduct`, `SellerOffer` |
| `GET` | `/api/v1/catalog/products/{slug}` | واکشی جزییات کالا، وزن‌ها و آفرها | `CanonicalProduct`, `ProductVariant` |
| `POST` | `/api/v1/checkout/reserve` | قفل موقت ۱۰ دقیقه‌ای موجودی کالا | `InventoryReservation`, `SellerOffer` |
| `GET` / `POST` | `/api/v1/checkout/cart/sync` | همگام‌سازی اقلام سبد خرید کاربر | `UserCartItem` |
| `POST` | `/api/v1/payment/request` | تولید آتوریتی و ارسال به درگاه زرین‌پال | `Order`, `PaymentTransaction` |
| `GET` | `/api/v1/payment/verify` | بازگشت از درگاه و نهایی‌سازی سفارش | `Order`, `InventoryReservation` |
| `GET` / `POST` | `/api/v1/pets/` | لیست و ایجاد پت جدید با فرم چندمرحله‌ای | `Pet`, `PetHealthProfile` |
| `GET` / `POST` | `/api/v1/care/tasks` | دریافت لیست و تیک‌زدن وظایف مراقبت | `CareTask`, `TaskCompletion` |
| `GET` | `/api/v1/replenishment/pet/{pet_id}` | محاسبه و اعلام روزهای باقیمانده غذا | `ReorderSchedule`, `Pet` |
| `GET` | `/api/v1/passport/{token}` | صفحه خوانش اسکن قلاده و اطلاعات اضطراری | `Pet`, `SmartCollarTag` |
| `POST` | `/api/v1/passport/{token}/emergency-sighting` | ثبت لوکیشن و شماره تماس یابنده پت | `LostPetAlert` |
| `POST` | `/api/v1/ai-copilot/chat` | پردازش سوالات نگهداری پت با مدل Groq | - (Stateless AI) |
| `GET` / `POST` | `/api/v1/vets/appointments` | رزرو وقت ویزیت کلینیک دامپزشکی | `Appointment`, `Veterinarian` |
| `POST` | `/api/v1/medical-records/` | ثبت نسخه و سوابق درمانی توسط دامپزشک | `MedicalRecord`, `Pet` |
| `GET` / `POST` | `/api/v1/logistics/dispatch` | صدور بارنامه پیک موتوری و ردیابی | `CourierShipment` |
| `POST` | `/api/v1/admin/auth/login` | ورود مدیریت با هشینگ رمز عبور | `AdminUser`, `AdminAuditLog` |
| `POST` | `/api/v1/admin/products/import/commit` | اعمال تغییرات دسته‌ای فایل اکسل محصولات | `CanonicalProduct`, `SellerOffer` |
| `GET` / `POST` | `/api/v1/feature-flags/` | واکشی و تغییر وضعیت ماژول‌های فعال پلتفرم | `PlatformFeatureFlag` |

---

### جدول ج: کانتکست‌ها و استیت‌های سراسری (Global State & Storage)

| نام کانتکست (Context) | دامنه مسئولیت (Scope) | توابع کلیدی و مقادیر ارائه‌شده | ذخیره‌سازی محلی / سرور |
| :--- | :--- | :--- | :--- |
| `AuthContext` | احراز هویت و نقش جاری | `user`, `currentRole`, `isAuthenticated`, `requestOtp()`, `verifyOtp()`, `switchRole()`, `logout()` | `bonnivo_access_token` (کوکی و حافظه) |
| `CartContext` | سبد، تخفیف و مرسوله‌ها | `items`, `splitShipments`, `addItem()`, `removeItem()`, `updateQuantity()`, `subtotalToman`, `payableGoodsTotalToman` | `bonnivo_cart_v1` (Local Storage + سنک به `/api/v1/checkout/cart`) |
| `PetContext` | انتخاب پت و مراقبت روزانه | `pets`, `activePet`, `selectPet()`, `addPet()`, `tasks`, `toggleTaskCompletion()`, `dailyProgressPercentage` | `bonnivo_pets_v1` (Local Storage + کش سشن) |
| `ThemeContext` | تم تاریک / روشن | `theme`, `isDark`, `toggleTheme()`, `setTheme()` | `bonyo-theme` (Local Storage + کلاس تگ HTML) |

---
*تهیه شده به صورت کامپکت و تلگرافی جهت استفاده در موتور استدلال ایجنت‌های توسعه، تست و ممیزی بونیو.*
