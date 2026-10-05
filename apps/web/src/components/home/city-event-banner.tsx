"use client";

import React, { useState, useEffect } from "react";
import { Calendar, MapPin } from "lucide-react";
import { FeaturedPromoBanner } from "@/components/ui/featured-promo-banner";

export function CityEventBanner() {
  const [userCity, setUserCity] = useState("تهران");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCity = localStorage.getItem("bonnivo_user_city");
      if (savedCity) {
        setUserCity(savedCity);
      }
    }
  }, []);

  return (
    <FeaturedPromoBanner
      imageSrc="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=80"
      imageAlt={`دورهمی و کارگاه رفتارشناسی پت‌های ${userCity}`}
      badge={{
        text: `رویداد ویژه سرپرستان ${userCity}`,
        pulse: true,
      }}
      meta={[
        { text: "جمعه این هفته • ساعت ۱۶:۰۰", icon: Calendar },
        { text: "بوستان آب و آتش", icon: MapPin },
      ]}
      title="دورهمی بزرگ سرپرستان و کارگاه تخصصی رفتارشناسی"
      description="آموزش عملی راه رفتن با قلاده بدون کشش، روش‌های رفع اضطراب آپارتمانی و مشاوره رودررو با برجسته‌ترین مربیان و رفتارشناسان مجرب بنیوو."
      primaryCta={{
        label: "مشاهده جزئیات و ثبت‌نام رایگان",
        href: "/events/ev-1",
      }}
      note="ظرفیت محدود • پذیرایی رایگان"
      colorTheme="emerald"
    />
  );
}
