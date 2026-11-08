"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSiteStore } from "@/lib/siteStore";
import { NILPHAMARI_KISHOREGANJ_UNIONS, KishoreganjUnion } from "@/lib/types";
import {
  Landmark,
  MapPin,
  Phone,
  Compass,
  Users,
  Award,
  Sparkles,
  Camera,
  Search,
} from "lucide-react";

export default function UnionProfilesPage() {
  const { unionProfiles, heritageItems } = useSiteStore();
  const [selectedUnionName, setSelectedUnionName] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUnions = unionProfiles.filter((u) => {
    const matchesUnion = selectedUnionName === "all" || u.name === selectedUnionName;
    const matchesSearch =
      u.name.includes(searchTerm) ||
      u.chairman_name.includes(searchTerm) ||
      u.description.includes(searchTerm);
    return matchesUnion && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-28 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-[#FDFBF7] font-bangla">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-emerald-100 text-[#07261B] text-xs font-bold mb-3 shadow-xs">
            <Landmark className="w-3.5 h-3.5 text-[#FBBF24]" />
            নীলফামারী জেলা • ৯টি ইউনিয়ন পরিষদ
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#07261B]">
            কিশোরগঞ্জ উপজেলার ইউনিয়ন পরিচিতি ও স্থানীয় সরকার
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-3 leading-relaxed">
            কিশোরগঞ্জ সদর, পুটিমারী, চাঁদখানা, বাহাগিলি, রণচণ্ডী, বড়ভিটা, নিতাই, মাগুড়া ও গাড়াগ্রাম—৯টি ইউনিয়নের বিবরণ, বর্তমান চেয়ারম্যান, ১-৯ নং ওয়ার্ডের মেম্বার ও দর্শনীয় স্থানসমূহ।
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setSelectedUnionName("all")}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
              selectedUnionName === "all"
                ? "bg-[#07261B] text-[#FBBF24] shadow-md ring-2 ring-emerald-500/30"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            ৯টি ইউনিয়ন একসাথে
          </button>
          {NILPHAMARI_KISHOREGANJ_UNIONS.map((u) => (
            <button
              key={u}
              onClick={() => setSelectedUnionName(u)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                selectedUnionName === u
                  ? "bg-[#07261B] text-[#FBBF24] shadow-md ring-2 ring-emerald-500/30"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {u}
            </button>
          ))}
        </div>

        {/* Unions Showcase */}
        <div className="space-y-8">
          {filteredUnions.map((uni) => (
            <div
              key={uni.id}
              className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-6"
            >
              {/* Union Header & Chairman Info */}
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border-b border-slate-100 pb-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-[#07261B] text-xs font-bold border border-emerald-200">
                    <Compass className="w-3.5 h-3.5 text-[#FBBF24]" />
                    কিশোরগঞ্জ উপজেলা, নীলফামারী
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#07261B]">
                    {uni.name} ইউনিয়ন পরিষদ
                  </h2>
                  <p className="text-slate-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
                    {uni.description}
                  </p>
                </div>

                {/* Chairman Card */}
                <div className="bg-gradient-to-br from-[#07261B] to-[#0E4432] text-white p-5 rounded-2xl shadow-lg border border-[#FBBF24]/40 w-full sm:w-auto shrink-0 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-[#FBBF24] tracking-wider block">
                    বর্তমান চেয়ারম্যান
                  </span>
                  <div className="text-base sm:text-lg font-black text-white">
                    {uni.chairman_name}
                  </div>
                  <div className="text-xs text-emerald-200 flex items-center gap-1.5 font-mono pt-1">
                    <Phone className="w-3.5 h-3.5 text-[#FBBF24]" />
                    <span>{uni.chairman_phone}</span>
                  </div>
                </div>
              </div>

              {/* Tourist / Sightseeing Spots */}
              {uni.tourist_spots && uni.tourist_spots.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-bold text-sm text-[#07261B] flex items-center gap-1.5">
                    <Camera className="w-4 h-4 text-[#FBBF24]" />
                    <span>{uni.name} ইউনিয়নের দর্শনীয় ও ঐতিহাসিক স্থানসমূহ</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {uni.tourist_spots.map((spot, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 flex items-start gap-3"
                      >
                        <div className="w-10 h-10 rounded-xl bg-white text-[#07261B] flex items-center justify-center shrink-0 shadow-xs border border-emerald-200">
                          <MapPin className="w-5 h-5 text-[#07261B]" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-slate-800">{spot.name}</h4>
                          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                            {spot.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 1 to 9 Ward Members List */}
              <div className="space-y-3 pt-2">
                <h3 className="font-bold text-sm text-[#07261B] flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-[#FBBF24]" />
                  <span>{uni.name} ইউনিয়নের ১ থেকে ৯ নং ওয়ার্ডের সম্মানিত ইউপি সদস্যবৃন্দ</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2.5">
                  {uni.ward_members.map((member) => (
                    <div
                      key={member.ward_no}
                      className="p-3 rounded-2xl bg-slate-50 border border-slate-200 hover:bg-emerald-50/40 transition-colors flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#07261B] text-[#FBBF24] font-bold text-[10px] flex items-center justify-center shrink-0">
                          {member.ward_no}
                        </span>
                        <div>
                          <strong className="text-slate-800 block">{member.name}</strong>
                          <span className="text-[10px] text-slate-400">{member.ward_no} নং ওয়ার্ড মেম্বার</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Heritage & Culture Highlight Section */}
        <div className="bg-[#07261B] text-white rounded-3xl p-8 sm:p-12 shadow-2xl border-2 border-[#FBBF24]/30 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#FBBF24] uppercase tracking-wider block">
              ঐতিহাসিক নিদর্শন ও লোকসংস্কৃতি
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              চাড়ালকাটার মায়া ও কিশোরগঞ্জের গৌরবগাথা
            </h2>
            <p className="text-emerald-200/80 text-xs sm:text-sm">
              শতবর্ষের মোঘল স্থাপত্য, সুফি সাধকদের পুণ্যভূমি ও উত্তরবঙ্গের প্রাণের সুর ভাওয়াইয়া সংগীত।
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {heritageItems.map((h) => (
              <div
                key={h.id}
                className="bg-white/10 rounded-2xl p-5 border border-white/15 hover:bg-white/15 transition-all space-y-2.5"
              >
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FBBF24] text-[#07261B] inline-block">
                  {h.category}
                </span>
                <h3 className="font-bold text-base text-white">{h.title}</h3>
                <p className="text-xs text-emerald-100/80 leading-relaxed line-clamp-3">
                  {h.description}
                </p>
                <div className="pt-2 text-[11px] text-[#FBBF24] font-semibold">
                  অবস্থান: {h.union}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

