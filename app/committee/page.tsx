"use client";

import { useState } from "react";
import Image from "next/image";
import { useSiteStore } from "@/lib/siteStore";
import { Users, Phone, MapPin, Award, Compass, Sparkles } from "lucide-react";

export default function CommitteePage() {
  const [activeTab, setActiveTab] = useState<"executive" | "advisory">("executive");
  const { committee } = useSiteStore();

  const list = committee.filter((m) => m.committee_type === activeTab);

  return (
    <div className="min-h-screen pt-28 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-[#FDFBF7] font-bangla">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-[#07261B] text-xs font-bold mb-3 shadow-xs">
            <Award className="w-3.5 h-3.5 text-[#FBBF24]" />
            নেতৃত্ব ও সাংগঠনিক কাঠামো
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#07261B]">
            উপদেষ্টা ও কার্যনির্বাহী পরিষদ
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-2">
            ঢাকাস্থ কিশোরগঞ্জ উপজেলা সমিতি (নীলফামারী)-র ২০২৬-২০২৮ মেয়াদের সম্মানিত উপদেষ্টা ও কার্যনির্বাহী পরিষদের নেতৃত্ব।
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setActiveTab("executive")}
            className={`px-7 py-3 rounded-full text-xs sm:text-sm font-bold transition-all shadow-sm ${
              activeTab === "executive"
                ? "bg-[#07261B] text-[#FBBF24] ring-2 ring-emerald-600 shadow-md scale-105"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            কার্যনির্বাহী পরিষদ ({committee.filter((c) => c.committee_type === "executive").length} জন)
          </button>
          <button
            onClick={() => setActiveTab("advisory")}
            className={`px-7 py-3 rounded-full text-xs sm:text-sm font-bold transition-all shadow-sm ${
              activeTab === "advisory"
                ? "bg-[#07261B] text-[#FBBF24] ring-2 ring-emerald-600 shadow-md scale-105"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            উপদেষ্টা পরিষদ ({committee.filter((c) => c.committee_type === "advisory").length} জন)
          </button>
        </div>

        {/* Members Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4 group"
            >
              <div className="flex items-start gap-4">
                {/* Photo Frame with initial */}
                <div className="relative w-16 h-20 rounded-2xl overflow-hidden ring-2 ring-[#07261B]/20 bg-emerald-50 text-emerald-900 flex items-center justify-center font-bold text-2xl shrink-0 group-hover:ring-[#FBBF24] transition-all">
                  {member.name.slice(0, 1)}
                </div>

                {/* Info */}
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-[#07261B]">
                      {member.designation}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {member.term || "২০২৬-২০২৮"}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-slate-800 leading-snug">
                    {member.name}
                  </h3>

                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <Compass className="w-3.5 h-3.5 text-[#00A3E0]" />
                    <span>ইউনিয়ন: {member.union}</span>
                  </p>
                  <p className="text-xs text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>গ্রাম: {member.village}</span>
                  </p>
                </div>
              </div>

              {member.bio && (
                <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 italic line-clamp-2">
                  &quot;{member.bio}&quot;
                </p>
              )}

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <a
                  href={`tel:${member.phone}`}
                  className="text-xs text-[#00A3E0] hover:text-[#0284C7] font-semibold flex items-center gap-1"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{member.phone}</span>
                </a>
                <span className="text-[11px] text-emerald-700 font-semibold">কিশোরগঞ্জ, নীলফামারী</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
