"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSiteStore } from "@/lib/siteStore";
import { NILPHAMARI_KISHOREGANJ_UNIONS } from "@/lib/types";
import {
  Search,
  MapPin,
  Briefcase,
  Droplet,
  ShieldCheck,
  UserCheck,
  Phone,
  Compass,
  Lock,
  Award,
  Sparkles,
  Users,
} from "lucide-react";

export default function MembersDirectoryPage() {
  const { members } = useSiteStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUnion, setSelectedUnion] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  // Calculate counts
  const generalCount = members.filter((m) => m.member_type === "general").length;
  const lifetimeCount = members.filter((m) => m.member_type === "lifetime").length;
  const donorCount = members.filter((m) => m.member_type === "donor").length;

  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      m.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.member_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.permanent_village.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.profession.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesUnion =
      selectedUnion === "all" || m.permanent_union === selectedUnion;
    const matchesType =
      selectedType === "all" || m.member_type === selectedType;

    return matchesSearch && matchesUnion && matchesType && !m.is_blocked;
  });

  // Mask phone for public privacy protection
  const maskPhone = (phone: string) => {
    if (!phone || phone.length < 8) return "০১৭১*-******";
    return phone.slice(0, 5) + "-***" + phone.slice(-3);
  };

  return (
    <div className="min-h-screen pt-28 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-[#FDFBF7] font-bangla">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-[#07261B] text-xs font-bold mb-3 shadow-xs">
            <UserCheck className="w-3.5 h-3.5 text-[#FBBF24]" />
            অফিসিয়াল সদস্য ডিরেক্টরি
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#07261B]">
            কিশোরগঞ্জ উপজেলা সমিতি সদস্য ডিরেক্টরি
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-2">
            নীলফামারী জেলার কিশোরগঞ্জ উপজেলার ৯টি ইউনিয়নের ঢাকায় অবস্থানরত সম্মানিত সদস্যবৃন্দের সাধারণ তালিকা।
          </p>
        </div>

        {/* 3 Member Category Counter Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-500 block">সাধারণ সদস্য</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-[#07261B]">
                {generalCount} জন
              </span>
              <span className="text-[11px] text-emerald-600 block mt-1">ভর্তি ফি ৫০০৳ + চাঁদা ২৫৳</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#07261B] flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-500 block">আজীবন সদস্য</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-[#F59E0B]">
                {lifetimeCount} জন
              </span>
              <span className="text-[11px] text-amber-600 block mt-1">এককালীন ১০,০০০৳ অনুদান</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-500 block">সম্মানিত দাতা সদস্য</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-[#00A3E0]">
                {donorCount} জন
              </span>
              <span className="text-[11px] text-sky-600 block mt-1">সর্বনিম্ন ৫০,০০০৳ অনুদান</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-[#00A3E0] flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Search & Union Filters */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="নাম, সদস্য নম্বর, পেশা বা গ্রাম দিয়ে খুঁজুন..."
                className="w-full pl-11 pr-4 py-2.5 rounded-2xl border border-slate-200 text-xs sm:text-sm outline-none focus:border-[#07261B]"
              />
            </div>

            <div>
              <select
                value={selectedUnion}
                onChange={(e) => setSelectedUnion(e.target.value)}
                className="w-full py-2.5 px-4 rounded-2xl border border-slate-200 text-xs sm:text-sm bg-white outline-none focus:border-[#07261B]"
              >
                <option value="all">৯টি ইউনিয়ন (সকল সদস্য)</option>
                {NILPHAMARI_KISHOREGANJ_UNIONS.map((u) => {
                  const countInUnion = members.filter((m) => m.permanent_union === u).length;
                  return (
                    <option key={u} value={u}>
                      {u} ইউনিয়ন ({countInUnion} জন)
                    </option>
                  );
                })}
              </select>
            </div>

            <div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full py-2.5 px-4 rounded-2xl border border-slate-200 text-xs sm:text-sm bg-white outline-none focus:border-[#07261B]"
              >
                <option value="all">সকল সদস্য ক্যাটাগরি</option>
                <option value="general">সাধারণ সদস্য</option>
                <option value="lifetime">আজীবন সদস্য</option>
                <option value="donor">দাতা সদস্য</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
            <span>
              ফিল্টারে মোট <strong>{filteredMembers.length}</strong> জন সক্রিয় সদস্য প্রদর্শিত হচ্ছে
            </span>
            <span className="flex items-center gap-1 text-slate-400">
              <Lock className="w-3 h-3 text-slate-400" />
              ব্যক্তিগত তথ্যের গোপনীয়তা সুরক্ষায় ফোন নম্বর মাস্ক করা রয়েছে
            </span>
          </div>
        </div>

        {/* Members Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 hover:shadow-lg transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#07261B] flex items-center justify-center font-bold text-lg border border-emerald-200 group-hover:bg-[#07261B] group-hover:text-[#FBBF24] transition-colors">
                      {member.full_name[0] || "স"}
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-slate-800 leading-tight">
                        {member.full_name}
                      </h3>
                      <span className="font-mono text-xs text-emerald-700 font-semibold">
                        {member.member_no}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                      member.member_type === "lifetime"
                        ? "bg-amber-100 text-amber-800 border border-amber-300"
                        : member.member_type === "donor"
                        ? "bg-sky-100 text-sky-800 border border-sky-300"
                        : "bg-emerald-100 text-emerald-800 border border-emerald-300"
                    }`}
                  >
                    {member.member_type === "lifetime"
                      ? "আজীবন"
                      : member.member_type === "donor"
                      ? "দাতা"
                      : "সাধারণ"}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#07261B] shrink-0" />
                    <span>
                      স্থায়ী: <strong>{member.permanent_union}</strong> ({member.permanent_village})
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Briefcase className="w-3.5 h-3.5 text-[#07261B] shrink-0" />
                    <span>পেশা: {member.profession}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Droplet className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                    <span>রক্তের গ্রুপ: <strong className="text-rose-700">{member.blood_group}</strong></span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-400">
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="font-mono">{maskPhone(member.phone)}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  ভেরিফাইড সদস্য
                </span>
                <span className="text-slate-400">কিশোরগঞ্জ, নীলফামারী</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
