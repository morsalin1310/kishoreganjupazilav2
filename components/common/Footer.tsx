"use client";

import Link from "next/link";
import Image from "next/image";
import { useSiteStore } from "@/lib/siteStore";
import { NILPHAMARI_KISHOREGANJ_UNIONS } from "@/lib/types";
import { Compass, Shield, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const { settings } = useSiteStore();

  return (
    <footer className="footer relative bg-[#0c2f21] text-white/85 text-center pt-16 pb-12 overflow-hidden font-bangla mt-10">
      {/* Exact Wave Divider from Demo Project */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none -translate-y-[98%] pointer-events-none">
        <svg
          className="footer-wave w-full h-14 sm:h-20 text-[#0c2f21]"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 40 C240 80 480 0 720 30 C960 60 1200 10 1440 40 L1440 80 L0 80Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Brand Header */}
        <div className="flex flex-col items-center justify-center mb-10 pb-8 border-b border-white/10">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-3">
            <Image
              src="/logo-sm.webp"
              alt="কিশোরগঞ্জ উপজেলা সমিতি লোগো"
              fill
              className="object-contain"
            />
          </div>
          <h2 className="footer-title text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1">
            {settings.siteTitle}
          </h2>
          <p className="footer-slogan font-serifBangla text-[#fbcf0e] text-sm sm:text-base font-semibold">
            {settings.slogan}
          </p>
          <p className="text-white/70 text-xs sm:text-sm max-w-xl mt-2 leading-relaxed">
            নীলফামারী জেলার কিশোরগঞ্জ উপজেলার চাড়ালকাটা ও তিস্তা নদী অববাহিকার ৯টি ইউনিয়নের ঢাকায় বসবাসরত সকল নাগরিকের ঐতিহ্যবাহী মিলনমঞ্চ।
          </p>
        </div>

        {/* 4 Columns Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10 text-left text-sm">
          {/* Col 1: 9 Unions */}
          <div>
            <h3 className="text-[#fbcf0e] font-bold text-base mb-3 flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#3cc3ee]" />
              কিশোরগঞ্জের ৯টি ইউনিয়ন
            </h3>
            <div className="flex flex-wrap gap-1.5 text-[11px]">
              {NILPHAMARI_KISHOREGANJ_UNIONS.map((union) => (
                <span
                  key={union}
                  className="px-2 py-0.5 rounded-md bg-white/10 text-white/90 border border-white/10"
                >
                  {union}
                </span>
              ))}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="text-[#fbcf0e] font-bold text-base mb-3 flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#3cc3ee]" />
              গুরুত্বপূর্ণ পাতা
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-white/80">
              <li>
                <Link href="/about" className="hover:text-[#fbcf0e] transition-colors">
                  পরিচিতি ও নীলফামারীর ঐতিহ্য
                </Link>
              </li>
              <li>
                <Link href="/constitution" className="hover:text-[#fbcf0e] transition-colors">
                  গঠনতন্ত্র (১-৩৫ ধারা)
                </Link>
              </li>
              <li>
                <Link href="/committee" className="hover:text-[#fbcf0e] transition-colors">
                  উপদেষ্টা ও কার্যনির্বাহী পরিষদ
                </Link>
              </li>
              <li>
                <Link href="/notices" className="hover:text-[#fbcf0e] transition-colors">
                  নোটিশ ও দাপ্তরিক আদেশ
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#fbcf0e] transition-colors">
                  অ্যাডমিন ড্যাশবোর্ড ও CMS
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h3 className="text-[#fbcf0e] font-bold text-base mb-3 flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#3cc3ee]" />
              নাগরিক সেবাসমূহ
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-white/80">
              <li>
                <Link href="/register" className="hover:text-[#fbcf0e] transition-colors">
                  অনলাইন সদস্য নিবন্ধন
                </Link>
              </li>
              <li>
                <Link href="/blood-bank" className="hover:text-[#fbcf0e] transition-colors">
                  কিশোরগঞ্জ ব্লাড ব্যাংক
                </Link>
              </li>
              <li>
                <Link href="/welfare" className="hover:text-[#fbcf0e] transition-colors">
                  শিক্ষা ও চিকিৎসা অনুদান
                </Link>
              </li>
              <li>
                <Link href="/members" className="hover:text-[#fbcf0e] transition-colors">
                  সদস্য ডিরেক্টরি
                </Link>
              </li>
              <li>
                <Link href="/activities" className="hover:text-[#fbcf0e] transition-colors">
                  অনুষ্ঠান ও ফটো গ্যালারি
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h3 className="text-[#fbcf0e] font-bold text-base mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#3cc3ee]" />
              অফিশিয়াল দপ্তর
            </h3>
            <p className="text-white/80 text-xs leading-relaxed mb-3">
              {settings.contactAddress}
            </p>
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center gap-2 text-white/80">
                <Phone className="w-3.5 h-3.5 text-[#fbcf0e]" />
                <a href={`tel:${settings.contactPhone}`} className="hover:underline">
                  {settings.contactPhone}
                </a>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Mail className="w-3.5 h-3.5 text-[#3cc3ee]" />
                <a href={`mailto:${settings.contactEmail}`} className="hover:underline break-all">
                  {settings.contactEmail}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright matching demo project */}
        <div className="pt-6 border-t border-white/10 text-center text-xs text-white/60">
          <p className="copy">
            © ২০২৬ কিশোরগঞ্জ উপজেলা সমিতি, ঢাকা। সর্বস্বত্ব সংরক্ষিত।
          </p>
        </div>
      </div>
    </footer>
  );
}
