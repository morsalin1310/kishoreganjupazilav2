"use client";

import HeroSection from "@/components/home/HeroSection";
import FeaturedServices from "@/components/home/FeaturedServices";
import NewsletterSection from "@/components/home/NewsletterSection";
import ContactSection from "@/components/home/ContactSection";
import Link from "next/link";
import { useSiteStore } from "@/lib/siteStore";
import { NILPHAMARI_KISHOREGANJ_UNIONS } from "@/lib/types";
import {
  Droplet,
  FileText,
  HeartHandshake,
  ArrowRight,
  ShieldCheck,
  Building,
  Users2,
  Calendar,
  Sparkles,
  MapPin,
  CheckCircle,
  Compass,
} from "lucide-react";

export default function HomePage() {
  const { settings } = useSiteStore();

  return (
    <div className="flex flex-col font-bangla">
      {/* 1. Hero Section with Animated Logo & Northern Scenery */}
      <HeroSection />

      {/* 2. Dynamic Impact Statistics (Admin customizable) */}
      <section className="bg-white border-y border-slate-100 py-8 shadow-xs relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-3 bg-emerald-50/40 rounded-2xl border border-emerald-100/60">
              <div className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0B3B2C]">
                {settings.statMembers}
              </div>
              <div className="text-xs sm:text-sm text-slate-600 font-semibold mt-1">
                ঢাকাস্থ কিশোরগঞ্জবাসী
              </div>
            </div>

            <div className="p-3 bg-sky-50/40 rounded-2xl border border-sky-100/60">
              <div className="text-2xl sm:text-3xl md:text-4xl font-black text-[#00A3E0]">
                {settings.statUnions}
              </div>
              <div className="text-xs sm:text-sm text-slate-600 font-semibold mt-1">
                উপজেলার ৯টি ইউনিয়ন
              </div>
            </div>

            <div className="p-3 bg-amber-50/40 rounded-2xl border border-amber-100/60">
              <div className="text-2xl sm:text-3xl md:text-4xl font-black text-[#F59E0B]">
                {settings.statExecutive}
              </div>
              <div className="text-xs sm:text-sm text-slate-600 font-semibold mt-1">
                কার্যনির্বাহী পরিষদ
              </div>
            </div>

            <div className="p-3 bg-rose-50/40 rounded-2xl border border-rose-100/60">
              <div className="text-2xl sm:text-3xl md:text-4xl font-black text-[#DC2626]">
                {settings.statDonors}
              </div>
              <div className="text-xs sm:text-sm text-slate-600 font-semibold mt-1">
                নিবন্ধিত রক্তদাতা
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 9 Unions Showcase Banner (Kishoreganj Upazila, Nilphamari) */}
      <section className="py-10 bg-[#FAF8F2] border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3 shrink-0 text-center lg:text-left">
              <div className="w-12 h-12 rounded-2xl bg-[#0B3B2C] text-[#FBBF24] flex items-center justify-center shrink-0 shadow-md">
                <Compass className="w-6 h-6 animate-[spin_12s_linear_infinite]" />
              </div>
              <div>
                <h3 className="font-extrabold text-base sm:text-lg text-[#0B3B2C]">
                  কিশোরগঞ্জ উপজেলার ৯টি ইউনিয়ন পরিবার
                </h3>
                <p className="text-xs text-slate-500">
                  নীলফামারী জেলার চাড়ালকাটা ও তিস্তা নদী অববাহিকার ইউনিয়নসমূহ
                </p>
              </div>
            </div>

            {/* Union Chips */}
            <div className="flex flex-wrap items-center justify-center lg:justify-end gap-2">
              {NILPHAMARI_KISHOREGANJ_UNIONS.map((union, idx) => (
                <span
                  key={union}
                  className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-white text-slate-700 border border-slate-200/80 shadow-xs hover:border-[#0B3B2C] hover:text-[#0B3B2C] hover:scale-105 transition-all cursor-default"
                >
                  📍 {union}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Featured Services (Bento Grid) */}
      <FeaturedServices />

      {/* 5. Emergency Blood Bank Banner */}
      <section className="py-12 bg-gradient-to-r from-rose-50/70 via-white to-rose-50/70 border-y border-rose-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-6 sm:p-8 rounded-3xl border border-rose-200/60 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                <Droplet className="w-8 h-8 fill-rose-600" />
              </div>
              <div>
                <span className="text-xs font-bold text-rose-600 uppercase tracking-wider bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                  কিশোরগঞ্জ ব্লাড ব্যাংক
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-800 mt-1">
                  ঢাকায় জরুরি রক্তের প্রয়োজন?
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm">
                  নীলফামারী জেলার কিশোরগঞ্জ উপজেলাবাসীর স্বেচ্ছায় রক্তদাতাদের তালিকা থেকে সহজে ডোনার খুঁজুন।
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <Link
                href="/blood-bank"
                className="w-full sm:w-auto px-6 py-3 rounded-full text-xs sm:text-sm font-bold bg-[#DC2626] text-white hover:bg-rose-700 shadow-sm transition-all text-center flex items-center justify-center gap-2"
              >
                <Droplet className="w-4 h-4" />
                রক্তদাতা খুঁজুন
              </Link>
              <Link
                href="/blood-bank"
                className="w-full sm:w-auto px-5 py-3 rounded-full text-xs sm:text-sm font-semibold border border-rose-300 text-rose-700 hover:bg-rose-50 transition-all text-center"
              >
                রক্তদাতা হতে চান?
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Newsletter Subscription */}
      <NewsletterSection />

      {/* 7. Contact Section */}
      <ContactSection />
    </div>
  );
}
