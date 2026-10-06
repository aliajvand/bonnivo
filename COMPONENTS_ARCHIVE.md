# COMPONENTS_ARCHIVE: مرجع و شناسنامه جامع کامپوننت‌های فرانت‌اند بونیو (Bonnivo)

> **قلمرو و محدوده فعال نسخه جاری (Current Core Scope)**:
> - پلتفرم متمرکز بر ۳ ستون اصلی: **فروشگاه هوشمند (E-Commerce)**، **شبکه سلامت و دامپزشکی / ویزیت آنلاین (Vets & Tele-Health)** و **شناسنامه ابری (Cloud Pet Passport)**.
> - بخش‌های مربیگری (`trainers`) و رویدادها (`events`) از چرخه فعال خارج و ایزوله شده‌اند.
> - **قوانین تقویم و نوبت‌دهی**: کاربران عادی حداکثر تا ۷ روز آینده (یک هفته) مجاز به مشاهده و رزرو تایم‌های آزاد روی نقشه هستند؛ در حالی که پنل دامپزشکان امکان برنامه‌ریزی تقویم کاری، روزهای حضور و تعطیلی را تا ۱ سال آینده فراهم می‌کند.
> - **جداسازی کامل درگاه‌های ورود**: ورود مشتریان (سرپرستان)، ورود دامپزشکان (پرتال پزشک) و ورود مدیر ارشد سامانه (پیشخوان ادمین) کاملاً مجزا و تفکیک‌شده است.

---

## ۱. کامپوننت‌های پایه و دیزاین سیستم مینیمال و مدرن (`src/components/ui/`)

| نام کامپوننت | مسیر فایل | کاربرد و وظیفه |
| :--- | :--- | :--- |
| `Button` | `apps/web/src/components/ui/button.tsx` | دکمه استاندارد دیزاین سیستم با واریانت‌های primary, secondary, outline, ghost و استیت‌های لودینگ/غیرفعال |
| `Input` | `apps/web/src/components/ui/input.tsx` | فیلد ورودی متن مدرن، پشتیبانی از آیکون، فرمت اعداد فارسی و اعتبارسنجی |
| `Badge` | `apps/web/src/components/ui/badge.tsx` | نشان‌های شیشه‌ای وضعیت سفارش، وضعیت ویزیت آنلاین، تخفیف و تایپ پت |
| `PriceTag` | `apps/web/src/components/ui/price-tag.tsx` | نمایش استاندارد قیمت به تومان با ارقام فارسی، درصد تخفیف و قیمت خط‌خورده |
| `RatingStars` | `apps/web/src/components/ui/rating-stars.tsx` | نمایش ستاره‌های امتیازدهی (۱ تا ۵) با عدد اعشاری و تعداد نظرات ثبت‌شده |
| `EmptyState` | `apps/web/src/components/ui/empty-state.tsx` | کامپوننت وضعیت خالی برای سبد خرید، تاریخچه ویزیت‌ها و نتایج جستجو |
| `ThemeToggle` | `apps/web/src/components/ui/theme-toggle.tsx` | سوییچ نرم حالت دارک/لایت مود بر پایه توکن‌های رنگی ارگانیک بونیو |
| `PhotoDock` | `apps/web/src/components/ui/photo-dock.tsx` | داک اسکرول افقی کتگوری‌ها و خدمات پزشکی/شاپ برای فیلتر سریع |
| `BenefitGrid` | `apps/web/src/components/ui/benefit-grid.tsx` | گرید ۴ تایی ویژگی‌های خدمات (پشتیبانی ۲۴ ساعته، اصالت کالا، ویزیت ویدیویی فوری) |
| `FeaturedPromoBanner` | `apps/web/src/components/ui/featured-promo-banner.tsx` | بنر شاخص بالای صفحات با افکت بلور مدرن و دکمه‌های اکشن سریع |

---

## ۲. کارت‌های نمایش و اطلاعاتی (`src/components/cards/`)

| نام کامپوننت | مسیر فایل | کاربرد و وظیفه |
| :--- | :--- | :--- |
| `BaseCard` | `apps/web/src/components/cards/base-card.tsx` | کانتینر پایه کارت‌ها با حاشیه ظریف، سایه نرم و افکت Glassmorphism |
| `ProductCard` | `apps/web/src/components/cards/product-card.tsx` | کارت محصول فروشگاهی شامل تصویر، برند، قیمت بهینه‌شده بای‌باکس و افزودن سریع |
| `VetCard` | `apps/web/src/components/cards/vet-card.tsx` | کارت پزشک/کلینیک شامل تخصص، امتیاز، بازه‌های آزاد تا ۷ روز آینده و نشان ویزیت آنلاین |

---

## ۳. سلامت، دامپزشکی و ویزیت آنلاین (`src/components/vets/` & `src/components/modules/`)

| نام کامپوننت | مسیر فایل | کاربرد و وظیفه |
| :--- | :--- | :--- |
| `VetDirectoryView` | `apps/web/src/components/vets/vet-directory-view.tsx` | فهرست کلینیک‌ها و دامپزشکان با فیلتر تخصص، منطقه و دسترسی به نوبت‌های ۷ روزه |
| `OnlineTeleConsultView` | `apps/web/src/components/vets/online-tele-consult-view.tsx` | صفحه اختصاصی ویزیت آنلاین تصویری/چت فوری با دامپزشکان شیفت فعال |
| `VetBookingScheduleModal` | `apps/web/src/components/vets/vet-booking-schedule-modal.tsx` | مدال انتخاب نوبت تقویم ۷ روزه کاربر متصل به کیف‌پول بونیو |
| `VetAvailabilityManager` | `apps/web/src/components/vets/vet-availability-manager.tsx` | ابزار پرتال پزشک برای تنظیم تقویم کاری، شیفت‌ها و مرخصی‌ها تا ۱ سال آینده |
| `MapRouteView` | `apps/web/src/components/modules/map-route-view.tsx` | نقشه موقعیت‌یابی کلینیک‌ها با نمایش نوبت‌های فعال هفتگی روی نقشه |

---

## ۴. فروشگاه، کاتالوگ و تسویه‌حساب (`src/components/shop/`, `cart/`, `checkout/`)

| نام کامپوننت | مسیر فایل | کاربرد و وظیفه |
| :--- | :--- | :--- |
| `ShopCatalogView` | `apps/web/src/components/shop/shop-catalog-view.tsx` | پیشخوان اصلی فروشگاه با سوییچ میان حالت Discovery و لیست دسته‌بندی‌ها |
| `ProductDetailView` | `apps/web/src/components/shop/product-detail-view.tsx` | صفحه جزئیات محصول با گرید ۲ ستونه مدرن، گالری با داتس و استپر تعداد |
| `ShopCategoryListView` | `apps/web/src/components/shop/shop-category-list-view.tsx` | لیست گرید و ردیفی کالاها با فیلتر برند، وزن، موجودی و مرتب‌سازی |
| `CartView` | `apps/web/src/components/cart/cart-view.tsx` | سبد خرید هوشمند با تخصیص کالا به پت، تفکیک مرسوله‌ها و محاسبه تخفیف |
| `CheckoutView` | `apps/web/src/components/checkout/checkout-view.tsx` | فرآیند تسویه‌حساب، انتخاب زمان تحویل پیک تهران و اتصال به درگاه پرداخت |
| `CheckoutSuccessView` | `apps/web/src/components/checkout/checkout-success-view.tsx` | صفحه تأیید نهایی پرداخت، صدور کد پیگیری شاپرک و ره‌گیری مرسوله |

---

## ۵. پاسپورت هوشمند و مراقبت پت (`src/components/passport/`, `care/`, `pet/`)

| نام کامپوننت | مسیر فایل | کاربرد و وظیفه |
| :--- | :--- | :--- |
| `OwnerPassportManager` | `apps/web/src/components/passport/owner-passport-manager.tsx` | شناسنامه آنلاین ابری پت، بارکد QR اختصاصی قلاده، سوابق واکسیناسیون و هشدار گمشده |
| `SightingLocationModal` | `apps/web/src/components/passport/sighting-location-modal.tsx` | مدال ثبت موقعیت جغرافیایی رویت حیوان گمشده توسط اسکن‌کننده QR |
| `TodayCareDashboard` | `apps/web/src/components/care/today-care-dashboard.tsx` | داشبورد مدیریت وظایف روزانه سلامت و رژیم غذایی پت با پروگرس‌بار |
| `MultiPetSwitcher` | `apps/web/src/components/pet/multi-pet-switcher.tsx` | سوئیچر تغییر آنی پت فعال در کل هدر و سایدبار اپلیکیشن |
| `PetOnboardingWizard` | `apps/web/src/components/pet/pet-onboarding-wizard.tsx` | ویزارد ثبت اطلاعات و تشکیل شناسنامه آنلاین پت جدید |

---

## ۶. تفکیک درگاه‌های ورود و مدیریت (`src/components/auth/`, `admin/`, `layout/`)

| نام کامپوننت | مسیر فایل | کاربرد و وظیفه |
| :--- | :--- | :--- |
| `OtpAuthModal` | `apps/web/src/components/auth/otp-auth-modal.tsx` | درگاه ورود/ثبت‌نام اختصاصی سرپرستان پت با شماره موبایل و کد یکبارمصرف SMS |
| `VetLoginView` | `apps/web/src/components/auth/vet-login-view.tsx` | درگاه ورود اختصاصی دامپزشکان و کلینیک‌ها با کد نظام دامپزشکی و احراز هویت |
| `AdminLoginView` | `apps/web/src/app/admin/login/page.tsx` | درگاه ایزوله ورود ادمین با گذرواژه، سشن امنیتی و محافظت CSRF |
| `AdminPanelView` | `apps/web/src/components/admin/admin-panel-view.tsx` | پیشخوان جامع مدیریت کل سیستم، کاتالوگ، تسویه‌حساب‌ها و لاگ‌های ممیزی |
| `DesktopHeader` | `apps/web/src/components/layout/desktop-header.tsx` | هدر مدرن با منوی تفکیک‌شده (فروشگاه، دامپزشکان و ویزیت آنلاین، پاسپورت ابری) |
| `MobileBottomNav` | `apps/web/src/components/layout/mobile-bottom-nav.tsx` | نوار ناوبری موبایل منطبق بر اسکوپ ۳ گانه (خانه، شاپ، ویزیت، پاسپورت، پروفایل) |
