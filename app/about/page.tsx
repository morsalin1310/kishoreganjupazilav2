"use client";

import Image from "next/image";
import Link from "next/link";
import { useSiteStore } from "@/lib/siteStore";
import { NILPHAMARI_KISHOREGANJ_UNIONS } from "@/lib/types";
import {
  Award,
  Compass,
  Heart,
  Shield,
  Landmark,
  MapPin,
  Users,
  Music,
  Waves,
  Sparkles,
  Video,
} from "lucide-react";

const northernTraditions = [
  {
    title: "ভাওয়াইয়া সংগীত ও লোকসংস্কৃতি",
    icon: Music,
    description:
      "দোতারা ও সারিন্দার সুরে রচিত ভাওয়াইয়া গান কিশোরগঞ্জ ও উত্তরবঙ্গের মাটির সুর—যা নদীর মাঝি আর গাড়িয়ালের হৃদয়ের কথা বলে।",
  },
  {
    title: "৯টি ইউনিয়নের ভ্রাতৃত্ব",
    icon: Compass,
    description:
      "কিশোরগঞ্জ সদর, পুটিমারী, চাঁদখানা, বাহাগিলি, রণচণ্ডী, বড়ভিটা, নিতাই, মাগুড়া ও গাড়াগ্রাম—৯টি ইউনিয়নের সুদৃঢ় পারিবারিক বন্ধন।",
  },
  {
    title: "আন্তরিকতা ও মেহমানদারী",
    icon: Heart,
    description:
      "উত্তরবঙ্গের অমায়িক আতিথেয়তা ও সহজ-সরল জীবনধারার গৌরব ঢাকার বুকেও পরম যত্নে ধারণ করে চলেছি আমরা।",
  },
];

export default function AboutPage() {
  const { settings, heritageItems } = useSiteStore();

  return (
    <div className="min-h-screen pt-28 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-[#FDFBF7] font-bangla">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Intro Banner */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-100/90 text-[#0B3B2C] text-xs font-bold mb-4 shadow-xs">
            <Compass className="w-3.5 h-3.5 text-[#FBBF24]" />
            {settings.subTitle || "কিশোরগঞ্জ উপজেলা, জেলা: নীলফামারী"}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0B3B2C] mb-4">
            {settings.aboutHeading || settings.slogan || "শেকড়ের টানে একতার বন্ধনে"}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {settings.heroSubheadline || "নীলফামারী জেলার চাড়ালকাটা ও তিস্তা নদী বিধৌত ঐতিহ্যবাহী কিশোরগঞ্জ উপজেলা থেকে রাজধানী ঢাকায় বসবাসরত নাগরিকদের পারস্পরিক ঐক্য, সৌহার্দ্য ও মানবিক সেবার মিলনমঞ্চ।"}
          </p>
        </div>

        {/* Association History & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-sm">
          <div>
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#0B3B2C] flex items-center justify-center mb-5 ring-1 ring-emerald-200">
              <Award className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold text-[#0B3B2C] mb-3">
              সমিতির পটভূমি ও লক্ষ্য
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
              {settings.aboutText1 || "শিক্ষা, চাকরি ও জীবন-জীবিকার প্রয়োজনে নীলফামারী জেলার কিশোরগঞ্জ উপজেলা থেকে রাজধানী ঢাকায় আগত ভাই-বোনদের নিয়ে এই অরাজনৈতিক ও কল্যাণমূলক সংগঠনের পথচলা শুরু।"}
            </p>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              {settings.aboutText2 || "ঢাকার বুকে নীলফামারীর কিশোরগঞ্জের মানুষের পারস্পরিক ভ্রাতৃত্ব বজায় রাখা, জরুরি রক্তদান, শিক্ষা সহায়তা, বিপদে পাশে দাঁড়ানো এবং নিজেদের ঐতিহ্য টিকিয়ে রাখাই আমাদের মূল অঙ্গীকার।"}
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 flex items-start gap-3">
              <Shield className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-sm text-slate-800">সম্পূর্ণ অরাজনৈতিক সামাজিক ঐক্য</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  দলমত নির্বিশেষে কিশোরগঞ্জ উপজেলার প্রতিটি নাগরিকের মিলনমেলা।
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100 flex items-start gap-3">
              <Heart className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-sm text-slate-800">শিক্ষা বৃত্তি ও চিকিৎসা সহায়তা</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  গরীব ও মেধাবী ছাত্র-ছাত্রীদের উপবৃত্তি এবং অসুস্থদের জরুরি চিকিৎসা অনুদান।
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-sky-50/50 border border-sky-100 flex items-start gap-3">
              <Waves className="w-5 h-5 text-[#00A3E0] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-sm text-slate-800">চাড়ালকাটার মায়া ও মিলনমেলা</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  প্রতি বছর ঢাকার মনোরম পরিবেশে সপরিবারে মহাসমারোহে মিলনমেলা ও সাংস্কৃতিক সন্ধ্যা।
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 9 Unions Section */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xs">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-extrabold text-[#0B3B2C] mb-2">
              কিশোরগঞ্জ উপজেলার ৯টি ইউনিয়নের পরিচিতি
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              নীলফামারী জেলার কিশোরগঞ্জ উপজেলার অন্তর্ভুক্ত প্রশাসনিক ইউনিয়নসমূহ:
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {NILPHAMARI_KISHOREGANJ_UNIONS.map((union, idx) => (
              <div
                key={union}
                className="p-4 rounded-2xl bg-[#FDFBF7] border border-slate-200 flex items-center gap-3 hover:border-[#0B3B2C] hover:shadow-sm transition-all"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-[#0B3B2C] font-bold text-xs flex items-center justify-center shrink-0">
                  {idx + 1}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-800">{union}</h4>
                  <span className="text-[10px] text-slate-400">ইউনিয়ন পরিষদ</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Historical Spots of Kishoreganj, Nilphamari */}
        <div>
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B3B2C]">
              কিশোরগঞ্জ ও নীলফামারীর ঐতিহাসিক নিদর্শন
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              প্রকৃতি, নদী ও শতবর্ষী ঐতিহ্যের অনন্য স্মৃতিচিহ্ন ({heritageItems.length} টি)
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {heritageItems.map((spot) => (
              <div
                key={spot.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {spot.image_url && (
                    <div className="w-full h-44 rounded-2xl overflow-hidden mb-4 relative bg-slate-100">
                      <Image
                        src={spot.image_url}
                        alt={spot.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#0B3B2C] text-[#FBBF24] flex items-center justify-center shrink-0">
                      <Landmark className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-slate-800 mb-1">{spot.title}</h3>
                      <span className="text-xs font-semibold text-[#00A3E0] flex items-center gap-1 mb-2">
                        <MapPin className="w-3.5 h-3.5" />
                        {spot.union}
                      </span>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {spot.description}
                      </p>
                    </div>
                  </div>
                </div>

                {spot.video_url && (
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <a
                      href={spot.video_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-700"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>ভিডিও ডকুমেন্টারি দেখুন</span>
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Culture & Bhawaiya Traditions */}
        <div>
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B3B2C]">
              আমাদের লোকসংস্কৃতি ও ঐতিহ্যের মূল
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              চাড়ালকাটার কলতান ও উত্তরবঙ্গের ভাওয়াইয়া সংগীতের মাটির সুর
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {northernTraditions.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs text-center flex flex-col items-center"
                >
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-base text-slate-800 mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
