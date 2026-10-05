"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  ShieldCheck,
  Info,
  CheckCircle2,
  Filter,
  Sparkles,
  MapPin,
  Calendar,
  AlertTriangle,
  Send,
  X,
  Search,
  ChevronLeft,
} from "lucide-react";
import { FeatureFlagGuard } from "@/components/common/feature-flag-guard";
import { FeaturedPromoBanner } from "@/components/ui/featured-promo-banner";
import { PhotoDock, PhotoDockItem } from "@/components/ui/photo-dock";
import { BenefitGrid, BenefitItem } from "@/components/ui/benefit-grid";
import { cn } from "@/lib/utils";

interface AdoptionPet {
  id: string;
  publisher_id: string;
  pet_name: string;
  species: string;
  breed: string;
  age_months: number;
  sex: string;
  description: string;
  city: string;
  district?: number;
  health_status: string;
  vaccination_status: string;
  is_neutered: boolean;
  adoption_fee_tomans: number;
  status: string;
  photo_url?: string;
  created_at: string;
}

const ADOPT_PHOTO_DOCK: (PhotoDockItem & { speciesKey: string })[] = [
  {
    id: "ad-cat",
    label: "گربه‌های ملوس",
    imageSrc: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80",
    href: "#adopt-listings",
    speciesKey: "CAT",
  },
  {
    id: "ad-dog",
    label: "سگ‌های باوفا",
    imageSrc: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=400&q=80",
    href: "#adopt-listings",
    speciesKey: "DOG",
  },
  {
    id: "ad-kitten",
    label: "توله‌ها و خردسال",
    imageSrc: "https://images.unsplash.com/photo-1591160690555-5debfba289f0?auto=format&fit=crop&w=400&q=80",
    href: "#adopt-listings",
    speciesKey: "PUPPY",
    badge: "نیاز به توجه",
  },
  {
    id: "ad-rescue",
    label: "پت‌های امدادی",
    imageSrc: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=400&q=80",
    href: "#adopt-listings",
    speciesKey: "RESCUE",
  },
  {
    id: "ad-neutered",
    label: "عقیم‌شده",
    imageSrc: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=400&q=80",
    href: "#adopt-listings",
    speciesKey: "NEUTERED",
  },
  {
    id: "ad-bird",
    label: "پرندگان",
    imageSrc: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=400&q=80",
    href: "#adopt-listings",
    speciesKey: "BIRD",
  },
  {
    id: "ad-small",
    label: "خرگوش و همستر",
    imageSrc: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=400&q=80",
    href: "#adopt-listings",
    speciesKey: "SMALL",
  },
  {
    id: "ad-special",
    label: "نیاز به مراقبت",
    imageSrc: "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=400&q=80",
    href: "#adopt-listings",
    speciesKey: "SPECIAL",
  },
];

const ADOPT_BENEFITS: BenefitItem[] = [
  {
    id: "ab-1",
    title: "واگذاری ۱۰۰٪ رایگان و اخلاقی",
    description: "ممنوعیت کامل هرگونه خرید، فروش، توله‌کشی و تجارت حیوانات خانگی در سراسر پلتفرم",
    icon: ShieldCheck,
    badge: "اخلاقی",
    theme: "rose",
  },
  {
    id: "ab-2",
    title: "چکاپ اولیه و پرونده پزشکی",
    description: "تمامی موارد واگذاری دارای معاینه بالینی، واکسیناسیون و تایید سلامت در کلینیک‌های معتمد هستند",
    icon: Heart,
    badge: "سلامت",
    theme: "emerald",
  },
  {
    id: "ab-3",
    title: "احراز هویت و صلاحیت سرپرست",
    description: "فرم استاندارد ارزیابی شرایط نگهداری و محیط زندگی برای اطمینان از آرامش و امنیت مادام‌العمر پت",
    icon: Sparkles,
    badge: "امنیت",
    theme: "blue",
  },
  {
    id: "ab-4",
    title: "بسته حمایتی و مشاوره رایگان",
    description: "تخفیف ویژه واکسیناسیون، غذای اولیه و مشاوره رفتارشناسی بونیو برای همراهی در ماه‌های نخست",
    icon: Calendar,
    badge: "حمایتی",
    theme: "purple",
  },
];

export default function AdoptionPortalPage() {
  const [selectedSpecies, setSelectedSpecies] = useState<string>("ALL");
  const [selectedPet, setSelectedPet] = useState<AdoptionPet | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [appForm, setAppForm] = useState({
    name: "علی ایجرندی",
    phone: "09121234567",
    experience: "۲ سال نگهداری از پت",
    hasOtherPets: true,
    housingType: "آپارتمان اختصاصی با بالکن محصور",
    motivation: "آمادگی کامل برای پذیرش مسئولیت همیشگی، واکسیناسیون به موقع و فراهم کردن زندگی شاد برای این پت.",
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const [listings, setListings] = useState<AdoptionPet[]>([
    {
      id: "adopt-1",
      publisher_id: "user-1",
      pet_name: "میشا",
      species: "CAT",
      breed: "DSH ایرانی حمایتی",
      age_months: 8,
      sex: "FEMALE",
      description: "میشا گربه بسیار آرام و مهربانی است که از آسیب خیابان نجات یافته و درمان کامل شده است. به فرد یا خانواده متعهد واگذار می‌شود.",
      city: "تهران",
      district: 2,
      health_status: "سلامت کامل، انگل‌تراپی انجام شده",
      vaccination_status: "واکسیناسیون ۲ دوز اولیه کامل",
      is_neutered: true,
      adoption_fee_tomans: 0,
      status: "AVAILABLE",
      photo_url: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&auto=format&fit=crop",
      created_at: new Date().toISOString(),
    },
    {
      id: "adopt-2",
      publisher_id: "user-2",
      pet_name: "تدی",
      species: "DOG",
      breed: "میکس تریر امدادی",
      age_months: 14,
      sex: "MALE",
      description: "تدی باهوش، عقیم‌شده و بسیار خوش‌اخلاق است. رابطه عالی با کودکان دارد و کاملاً جای دستشویی را بلد است.",
      city: "تهران",
      district: 5,
      health_status: "چکاپ دوره‌ای کامل و شناسنامه‌دار",
      vaccination_status: "هاری و چندگانه سالانه تزریق شده",
      is_neutered: true,
      adoption_fee_tomans: 0,
      status: "AVAILABLE",
      photo_url: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&auto=format&fit=crop",
      created_at: new Date().toISOString(),
    },
    {
      id: "adopt-3",
      publisher_id: "user-3",
      pet_name: "سیمبا",
      species: "CAT",
      breed: "بریتیش مو کوتاه (واگذاری امدادی)",
      age_months: 18,
      sex: "MALE",
      description: "صاحب قبلی به دلیل مهاجرت واگذار کرده است. کاملاً خانگی، مهربان و نیازمند سرپرست دلسوز و دائمی.",
      city: "تهران",
      district: 1,
      health_status: "سالم با پرونده پزشکی معتبر در بیمارستان پایتخت",
      vaccination_status: "واکسیناسیون کامل",
      is_neutered: true,
      adoption_fee_tomans: 0,
      status: "AVAILABLE",
      photo_url: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=600&auto=format&fit=crop",
      created_at: new Date().toISOString(),
    },
  ]);

  const filteredListings = listings.filter((item) => {
    if (selectedSpecies === "ALL") return true;
    return item.species === selectedSpecies;
  });

  const handleOpenApplication = (pet: AdoptionPet) => {
    setSelectedPet(pet);
    setIsApplying(true);
    setSubmitSuccess(false);
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitSuccess(true);
    }, 600);
  };

  return (
    <FeatureFlagGuard
      moduleKey="adopt"
      moduleTitleFa="سامانه امداد و سرپرستی رایگان"
      descriptionFa="پلتفرم واگذاری اخلاقی حیوانات خانگی بونیو پس از تکمیل اعتبارسنجی احراز هویت سرپرستان و هماهنگی با پناهگاه‌های رسمی فعال خواهد شد."
    >
      <div className="w-full py-4 sm:py-6 space-y-8 select-none" dir="rtl">
        
        {/* 1. Header Promo Banner using FeaturedPromoBanner */}
        <FeaturedPromoBanner
          imageSrc="https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=1200&q=80"
          imageAlt="سامانه سرپرستی و نجات حیوانات خانگی بونیو"
          badge={{
            text: "سامانه سرپرستی و واگذاری مسئولانه بونیو",
            pulse: true,
          }}
          meta={[
            { text: "واگذاری ۱۰۰٪ رایگان بدون خرید و فروش", icon: ShieldCheck },
            { text: "چکاپ بالینی و واکسیناسیون اولیه", icon: Heart },
            { text: "پشتیبانی دائمی و بسته خوش‌آمدگویی", icon: Sparkles },
          ]}
          title="سرپرستی، نجات و پناه امن برای حیوانات خانگی"
          description="به جای خرید، با سرپرستی یک فرشته نجات‌یافته خانه‌تان را پر از عشق کنید. تمامی حیوانات این بخش معاینه کامل شده و دارای شناسنامه سلامت هستند."
          primaryCta={{
            label: "مشاهده فرشته‌های آماده سرپرستی",
            href: "#adopt-listings",
          }}
          secondaryCta={{
            label: "داشبورد پت‌های من",
            href: "/dashboard/pets",
          }}
          note="هرگونه خرید و فروش و معامله تجاری پت اکیداً ممنوع است"
          colorTheme="rose"
        />

        {/* 2. Photo Dock for Pet Categories */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-sm font-black text-foreground">
                دسته‌بندی فرشته‌های چشم‌انتظار
              </h2>
              <span className="text-[11px] text-stone-500 font-light">
                کلیک برای فیلتر سریع گونه‌ها
              </span>
            </div>

            <div className="w-full max-w-5xl mx-auto select-none" dir="rtl">
              <div className="rounded-3xl p-3 sm:p-4 bg-white/95 dark:bg-[#0c1813]/95 backdrop-blur-2xl border border-stone-200/90 dark:border-emerald-950/80 shadow-lg">
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5 sm:gap-3.5">
                  {ADOPT_PHOTO_DOCK.map((item) => {
                    const isSelected = selectedSpecies === item.speciesKey;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setSelectedSpecies(isSelected ? "ALL" : item.speciesKey);
                        }}
                        className={cn(
                          "flex flex-col items-center justify-center p-1.5 sm:p-2 rounded-2xl transition-all duration-300 group active:scale-95 cursor-pointer",
                          isSelected
                            ? "bg-rose-600/10 text-rose-700 dark:text-rose-300 font-black scale-105"
                            : "hover:bg-rose-50/50 dark:hover:bg-stone-800/50 text-stone-700 dark:text-stone-300"
                        )}
                      >
                        <div
                          className={cn(
                            "relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden shadow-xs ring-2 transition-all duration-300 group-hover:scale-105 bg-stone-100 dark:bg-stone-800",
                            isSelected
                              ? "ring-rose-600 shadow-md shadow-rose-500/25 ring-offset-2"
                              : "ring-stone-200 dark:ring-stone-700 group-hover:ring-rose-500/80"
                          )}
                        >
                          <Image
                            src={item.imageSrc}
                            alt={item.label}
                            fill
                            sizes="(max-width: 640px) 48px, 64px"
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          {item.badge && (
                            <span className="absolute top-1 start-1 bg-rose-600 text-white text-[9px] font-black rounded-full px-1.5 py-0.5">
                              {item.badge}
                            </span>
                          )}
                        </div>

                        <span
                          className={cn(
                            "text-[11px] sm:text-xs font-bold truncate text-center w-full mt-1.5 transition-colors",
                            isSelected
                              ? "text-rose-700 dark:text-rose-400 font-black"
                              : "group-hover:text-rose-700 dark:group-hover:text-rose-400 text-stone-800 dark:text-stone-200"
                          )}
                        >
                          {item.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Ethical Warning Banner */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="p-4 rounded-3xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed font-light">
              <strong className="font-black">منشور اخلاقی بونیو:</strong> خرید، فروش، جفت‌گیری تجاری و توله‌کشی در بونیو اکیداً ممنوع است. تمام آگهی‌های این بخش رایگان بوده و متقاضیان پس از تکمیل فرم احراز شرایط نگهداری انتخاب می‌شوند.
            </div>
          </div>
        </div>

        {/* 4. Adoption Listings Grid */}
        <section id="adopt-listings" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-600 dark:text-rose-400 fill-rose-600" />
              <h2 className="text-base font-black text-foreground">فرشته‌های چشم‌انتظار سرپرست</h2>
            </div>
            {selectedSpecies !== "ALL" && (
              <button
                type="button"
                onClick={() => setSelectedSpecies("ALL")}
                className="text-xs text-rose-600 dark:text-rose-400 font-bold hover:underline"
              >
                نمایش همه فرشته‌ها
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((pet) => (
              <div
                key={pet.id}
                className="group rounded-3xl p-5 bg-white dark:bg-[#0f1d17] border border-stone-200/90 dark:border-rose-950/80 hover:border-rose-500/60 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Photo & Top Badges */}
                  <div className="relative w-full h-52 rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-800">
                    <Image
                      src={pet.photo_url || "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&auto=format&fit=crop"}
                      alt={pet.pet_name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                    <div className="absolute top-3 end-3 px-2.5 py-1 rounded-full bg-emerald-600/90 backdrop-blur-xs text-white text-[10px] font-black">
                      واگذاری رایگان
                    </div>

                    <div className="absolute bottom-3 start-3 px-2.5 py-0.5 rounded-lg bg-black/60 backdrop-blur-xs text-white text-xs font-bold flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-rose-400" />
                      <span>{pet.city} {pet.district ? `(منطقه ${pet.district})` : ""}</span>
                    </div>
                  </div>

                  {/* Title & Breed */}
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-black text-foreground group-hover:text-rose-600 transition-colors">
                        {pet.pet_name}
                      </h3>
                      <span className="text-xs font-bold text-stone-500">
                        {pet.age_months} ماهه • {pet.sex === "MALE" ? "نر" : "ماده"}
                      </span>
                    </div>

                    <p className="text-xs font-bold text-rose-600 dark:text-rose-400 mt-0.5">
                      {pet.breed}
                    </p>

                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-2 line-clamp-2 leading-relaxed font-light">
                      {pet.description}
                    </p>
                  </div>

                  {/* Health Badges */}
                  <div className="space-y-1.5 pt-2 border-t border-stone-200/80 dark:border-stone-800/80 text-[11px] text-stone-600 dark:text-stone-300">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span className="truncate">{pet.health_status}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span className="truncate">{pet.vaccination_status}</span>
                    </div>
                  </div>
                </div>

                {/* Apply CTA Button */}
                <div className="pt-4 mt-4 border-t border-stone-200/80 dark:border-stone-800/80">
                  <button
                    type="button"
                    onClick={() => handleOpenApplication(pet)}
                    className="w-full py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 active:scale-95 text-white text-xs font-bold text-center shadow-md shadow-rose-600/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Heart className="w-4 h-4 fill-white" />
                    <span>ثبت درخواست سرپرستی {pet.pet_name}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Benefits Grid using BenefitGrid */}
        <BenefitGrid
          items={ADOPT_BENEFITS}
          title="اصول و استانداردهای سرپرستی در بونیو"
          subtitle="تعهد به سلامت، امنیت اخلاقی و حمایت دائمی از حیوانات نجات‌یافته تا پایان عمر"
          columns={4}
          className="pt-8"
        />

        {/* 6. Application Modal */}
        {isApplying && selectedPet && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200" dir="rtl">
            <div className="w-full max-w-lg bg-white dark:bg-[#0f1d17] border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
              
              <div className="flex items-start justify-between border-b border-stone-200/60 dark:border-stone-800 pb-3">
                <div>
                  <span className="text-[11px] font-bold text-rose-600 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
                    درخواست سرپرستی اخلاقی
                  </span>
                  <h3 className="font-black text-base text-foreground mt-1">
                    فرم سرپرستی {selectedPet.pet_name} ({selectedPet.breed})
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsApplying(false)}
                  className="p-1.5 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {submitSuccess ? (
                <div className="space-y-4 text-center animate-in zoom-in-95 duration-200">
                  <div className="w-16 h-16 mx-auto rounded-3xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-lg font-black text-foreground">درخواست سرپرستی شما ثبت شد!</h4>
                    <p className="text-xs text-stone-500 leading-relaxed max-w-md mx-auto">
                      اطلاعات شما به سرپرست/امدادگر فعلی {selectedPet.pet_name} ارسال گردید. پس از بررسی شرایط اولیه، جهت هماهنگی و گفت‌وگو با شما تماس گرفته خواهد شد.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsApplying(false)}
                    className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md cursor-pointer"
                  >
                    متوجه شدم و بازگشت
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitApplication} className="space-y-4 text-right">
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-bold text-foreground block mb-1">
                        نام و نام خانوادگی متقاضی
                      </label>
                      <input
                        type="text"
                        required
                        value={appForm.name}
                        onChange={(e) => setAppForm({ ...appForm, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs focus:ring-2 focus:ring-rose-500/20"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-foreground block mb-1">
                        شماره تماس فعال
                      </label>
                      <input
                        type="tel"
                        required
                        value={appForm.phone}
                        onChange={(e) => setAppForm({ ...appForm, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs focus:ring-2 focus:ring-rose-500/20 font-mono text-left"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-foreground block mb-1">
                        نوع سکونت و شرایط محیطی
                      </label>
                      <input
                        type="text"
                        required
                        value={appForm.housingType}
                        onChange={(e) => setAppForm({ ...appForm, housingType: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs focus:ring-2 focus:ring-rose-500/20"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-foreground block mb-1">
                        توضیحات و انگیزه شما از سرپرستی
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={appForm.motivation}
                        onChange={(e) => setAppForm({ ...appForm, motivation: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs focus:ring-2 focus:ring-rose-500/20 leading-relaxed"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 active:scale-98 text-white text-xs font-bold shadow-lg shadow-rose-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <span>ارسال نهایی فرم ارزیابی سرپرستی</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </FeatureFlagGuard>
  );
}
