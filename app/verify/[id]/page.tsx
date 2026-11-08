"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSiteStore } from "@/lib/siteStore";
import { MemberProfile } from "@/lib/types";
import { CheckCircle2, XCircle, User, Phone, Droplet, MapPin, Award, Briefcase } from "lucide-react";

export default function VerifyMemberPage({ params }: { params: { id: string } }) {
  const { members, isLoaded } = useSiteStore();
  const [member, setMember] = useState<MemberProfile | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;
    const found = members.find(
      (m) => m.member_no === params.id || m.id === params.id
    );
    if (found) {
      setMember(found);
      setNotFound(false);
    } else {
      setNotFound(true);
    }
  }, [isLoaded, members, params.id]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen pt-28 sm:pt-32 pb-16 px-4 flex items-center justify-center font-bangla bg-[#FDFBF7]">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-[#07261B] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm text-slate-600">তথ্য লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen pt-28 sm:pt-32 pb-16 px-4 flex items-center justify-center font-bangla bg-[#FDFBF7]">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border-2 border-rose-200 shadow-2xl text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
            <XCircle className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-bold text-rose-700">সদস্য খুঁজে পাওয়া যায়নি</h2>
          <p className="text-xs text-slate-500">
            আইডি <strong className="font-mono">{params.id}</strong> দিয়ে কোনো নিবন্ধিত সদস্য খুঁজে পাওয়া যায়নি। অনুগ্রহ করে সঠিক আইডি নম্বর ব্যবহার করুন।
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-2.5 rounded-xl text-xs font-bold bg-[#07261B] text-white hover:bg-[#145A43] transition-all"
          >
            হোমপেজে ফিরে যান
          </Link>
        </div>
      </div>
    );
  }

  if (!member) return null;

  const getMemberTypeLabel = (type: string) => {
    switch (type) {
      case "lifetime": return "আজীবন সদস্য";
      case "donor": return "দাতা সদস্য";
      default: return "সাধারণ সদস্য";
    }
  };

  return (
    <div className="min-h-screen pt-28 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-[#FDFBF7] flex items-center justify-center font-bangla">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border-2 border-emerald-900/20 shadow-2xl text-center">
        {/* Header Logo */}
        <div className="relative w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden ring-4 ring-[#FBBF24] p-0.5 shadow-md">
          <Image src="/logo.png" alt="লোগো" fill className="object-contain" priority />
        </div>
        <h2 className="text-lg font-bold text-[#0B3B2C]">কিশোরগঞ্জ উপজেলা সমিতি, ঢাকা</h2>
        <p className="text-[#FBBF24] text-xs font-semibold">জেলা: নীলফামারী | শেকড়ের টানে একতার বন্ধনে</p>

        {/* Verification Status Banner */}
        <div className="my-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
          <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-2">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
          </div>
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
            সদস্যপদ বৈধ ও নিশ্চিতকৃত ✓
          </span>
          <p className="text-[11px] text-emerald-700 mt-0.5">
            এই ব্যক্তি নীলফামারীর কিশোরগঞ্জ উপজেলা সমিতির একজন নিবন্ধিত ও সক্রিয় সদস্য।
          </p>
        </div>

        {/* Member Photo */}
        {member.photo_url && (
          <div className="mb-4 flex justify-center">
            <div className="w-24 h-28 rounded-xl overflow-hidden ring-2 ring-[#07261B]/20 shadow-md">
              <img src={member.photo_url} alt={member.full_name} className="w-full h-full object-cover" />
            </div>
          </div>
        )}

        {/* Member Details */}
        <div className="text-left space-y-2.5 text-xs bg-slate-50 p-5 rounded-2xl border border-slate-200 mb-6">
          <div className="flex justify-between border-b pb-2">
            <span className="text-slate-500 flex items-center gap-1"><Award className="w-3.5 h-3.5" /> সদস্য নম্বর:</span>
            <span className="font-mono font-bold text-slate-800">{member.member_no}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-slate-500 flex items-center gap-1"><User className="w-3.5 h-3.5" /> নাম:</span>
            <span className="font-bold text-[#0B3B2C] text-sm">{member.full_name}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-slate-500">ক্যাটাগরি:</span>
            <span className="font-bold text-slate-800">{getMemberTypeLabel(member.member_type)}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-slate-500 flex items-center gap-1"><Droplet className="w-3.5 h-3.5" /> রক্তের গ্রুপ:</span>
            <span className="font-bold text-rose-600">{member.blood_group}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-slate-500 flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" /> পেশা:</span>
            <span className="font-medium text-slate-800">{member.profession}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-slate-500 flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> মূল ইউনিয়ন ও গ্রাম:</span>
            <span className="font-medium text-slate-800">{member.permanent_union}, {member.permanent_village}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-slate-500">উপজেলা ও জেলা:</span>
            <span className="font-medium text-slate-800">কিশোরগঞ্জ, নীলফামারী</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-slate-500 flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> মোবাইল:</span>
            <span className="font-mono font-medium text-slate-800">{member.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">অনুমোদনের তারিখ:</span>
            <span className="font-medium text-slate-800">{member.approved_at || "২০২৬"}</span>
          </div>
        </div>

        <Link
          href="/"
          className="w-full py-2.5 rounded-xl text-xs font-bold bg-[#0B3B2C] text-white hover:bg-[#145A43] transition-all block"
        >
          সমিতির মূল ওয়েবসাইটে প্রবেশ করুন
        </Link>
      </div>
    </div>
  );
}
