"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import { MemberProfile } from "@/lib/types";
import { useSiteStore } from "@/lib/siteStore";
import { Download, Printer, ShieldAlert, CheckCircle2, Clock } from "lucide-react";
import html2canvas from "html2canvas";

interface DigitalIdCardProps {
  member: MemberProfile;
}

export default function DigitalIdCard({ member }: DigitalIdCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const { settings } = useSiteStore();

  const isApproved = member.status === "approved";

  const getMemberTypeLabel = (type: string) => {
    switch (type) {
      case "lifetime": return "আজীবন সদস্য আইডি কার্ড";
      case "donor": return "দাতা সদস্য আইডি কার্ড";
      default: return "সাধারণ সদস্য আইডি কার্ড";
    }
  };

  const handleDownloadImage = async () => {
    if (!cardRef.current || !isApproved) return;
    try {
      setDownloading(true);
      const canvas = await html2canvas(cardRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: "#ffffff",
      });
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `ID-CARD-${member.member_no || "KSD"}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("ID Card download error:", err);
    } finally {
      setDownloading(false);
    }
  };

  const verifyUrl = `https://kishoreganjupazila.com/verify/${member.member_no || member.id}`;

  // If member is not approved yet, do NOT generate ID card as per instruction
  if (!isApproved) {
    return (
      <div className="w-full max-w-lg bg-amber-50 rounded-3xl p-8 border-2 border-amber-300 text-center space-y-4 font-bangla">
        <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto ring-8 ring-amber-50">
          <Clock className="w-8 h-8 animate-pulse text-amber-600" />
        </div>
        <div className="space-y-1">
          <span className="text-xs font-bold text-amber-800 bg-amber-200/80 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
            পেমেন্ট ও তথ্য যাচাইাধীন (Pending)
          </span>
          <h3 className="text-xl font-extrabold text-[#07261B]">
            আইডি কার্ড এখনো জেনারেট হয়নি
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
          সদস্য নিবন্ধন সম্পন্ন করার পর অ্যাডমিন কর্তৃক পেমেন্ট ভেরিফিকেশন (TrxID যাচাই) সম্পন্ন হলে স্বয়ংক্রিয়ভাবে আপনার ডিজিটাল স্মার্ট আইডি কার্ড জেনারেট হবে এবং ডাউনলোড অপশন সক্রিয় হবে।
        </p>
        <div className="bg-white p-3.5 rounded-2xl border border-amber-200 text-xs text-left max-w-xs mx-auto space-y-1">
          <div className="flex justify-between">
            <span className="text-slate-500">নাম:</span>
            <strong className="text-slate-800">{member.full_name}</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">মোবাইল:</span>
            <strong className="font-mono text-slate-800">{member.phone}</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">TrxID:</span>
            <strong className="font-mono text-emerald-800">{member.trx_id || "জমা হয়নি"}</strong>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center font-bangla">
      {/* ===== ID Card Matching Reference Image Exactly ===== */}
      <div
        ref={cardRef}
        className="w-[430px] sm:w-[490px] rounded-2xl overflow-hidden shadow-2xl border border-slate-300 bg-white select-none print:shadow-none"
        style={{ fontFamily: "'Hind Siliguri', 'Tiro Bangla', sans-serif" }}
      >
        {/* ====== TOP HEADER: Dark Green Bar ====== */}
        <div className="bg-[#07261B] text-white px-5 py-4 relative">
          <div className="flex items-center justify-between">
            {/* Left: Official Circular Logo */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden shrink-0 flex items-center justify-center">
              <img
                src="/logo.png"
                alt="কিশোরগঞ্জ উপজেলা সমিতি লোগো"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Center: Title & Dynamic Member Category Subtitle */}
            <div className="flex-1 ml-3.5 mr-2">
              <h3 className="text-lg sm:text-[19px] font-extrabold text-white leading-tight tracking-tight">
                কিশোরগঞ্জ উপজেলা সমিতি, ঢাকা
              </h3>
              <p className="text-xs text-[#FBBF24] font-semibold mt-0.5 tracking-wide">
                {getMemberTypeLabel(member.member_type)}
              </p>
            </div>

            {/* Right: ID Badge - Dark teal pill matching sample image */}
            <div className="bg-[#043324] border border-[#1b6b50] rounded-xl px-4 py-2 text-white font-extrabold text-sm sm:text-base tracking-wider shadow-inner shrink-0 text-center min-w-[90px]">
              {member.member_no || "KSD-101"}
            </div>
          </div>
        </div>

        {/* ====== BODY: White area with circular emblem watermark ====== */}
        <div className="px-5 py-5 relative bg-white min-h-[200px]">
          {/* Circular Logo Emblem Watermark centered behind text matching reference image */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.13] pointer-events-none select-none overflow-hidden">
            <img
              src="/logo.png"
              alt="ওয়াটারমার্ক"
              className="w-56 h-56 object-contain"
            />
          </div>

          <div className="flex items-start gap-5 relative z-10">
            {/* Member Photo: Rounded Rectangle with light border matching sample */}
            <div className="shrink-0">
              <div className="w-28 h-32 rounded-2xl overflow-hidden border-2 border-slate-300 shadow-sm bg-slate-100 flex items-center justify-center">
                {member.photo_url ? (
                  <img
                    src={member.photo_url}
                    alt={member.full_name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-emerald-50 text-emerald-800">
                    <span className="text-4xl font-extrabold text-[#07261B]">
                      {member.full_name.slice(0, 1)}
                    </span>
                    <span className="text-[9px] text-slate-400 mt-1">সদস্য ছবি</span>
                  </div>
                )}
              </div>
            </div>

            {/* Member Details Column matching sample typography */}
            <div className="flex-1 space-y-2 text-slate-800">
              {/* Member Full Name */}
              <h4 className="text-xl sm:text-[22px] font-black text-[#07261B] leading-tight pb-0.5">
                {member.full_name}
              </h4>

              {/* Workplace / Institution */}
              <div className="text-[13px] leading-snug">
                <span className="font-bold text-[#07261B]">প্রতিষ্ঠান:</span>{" "}
                <span className="font-medium text-slate-700">
                  {member.workplace || member.workplace_designation
                    ? `${member.workplace_designation ? member.workplace_designation + ", " : ""}${member.workplace || member.profession}`
                    : member.profession}
                </span>
              </div>

              {/* Union */}
              <div className="text-[13px] leading-snug">
                <span className="font-bold text-[#07261B]">ইউনিয়ন:</span>{" "}
                <span className="font-medium text-slate-700">
                  {member.permanent_union.includes("ইউনিয়ন") ? member.permanent_union : `${member.permanent_union} ইউনিয়ন`}
                </span>
              </div>

              {/* Village/Ward */}
              <div className="text-[13px] leading-snug">
                <span className="font-bold text-[#07261B]">গ্রাম/ওয়ার্ড:</span>{" "}
                <span className="font-medium text-slate-700">
                  {member.permanent_village || "৭"}
                </span>
              </div>

              {/* Mobile Phone */}
              <div className="text-[13px] leading-snug">
                <span className="font-bold text-[#07261B]">মোবাইল:</span>{" "}
                <span className="font-mono font-bold text-slate-800">
                  {member.phone}
                </span>
              </div>
            </div>

            {/* QR Code Column - Right side matching sample */}
            <div className="shrink-0 flex flex-col items-center justify-center pt-1">
              <div className="p-1.5 bg-white rounded-xl border border-slate-200 shadow-xs">
                <QRCodeSVG
                  value={verifyUrl}
                  size={92}
                  level="M"
                  fgColor="#07261B"
                />
              </div>
              <span className="text-[11px] text-slate-600 font-bold mt-1.5 tracking-wider">
                স্ক্যান করুন
              </span>
            </div>
          </div>
        </div>

        {/* ====== FOOTER: Dark Green Bar matching sample image ====== */}
        <div className="bg-[#07261B] text-white px-5 py-2.5 flex items-center justify-between border-t border-emerald-900/40">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full overflow-hidden shrink-0 flex items-center justify-center">
              <img src="/logo.png" alt="লোগো" className="w-full h-full object-contain" />
            </div>
            <span className="text-[11px] sm:text-xs font-bold text-[#FBBF24] tracking-wide">
              https://kishoreganjupazila.com/
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[#DC2626] text-xs">📞</span>
            <span className="text-[11px] sm:text-xs font-bold text-white tracking-wide">
              Helpline: <strong className="font-mono text-emerald-200 font-bold">{settings.contactPhone || "01353743247"}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 mt-6 no-print">
        <button
          onClick={handleDownloadImage}
          disabled={downloading}
          className="px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold bg-[#07261B] text-[#FBBF24] hover:bg-[#0c402e] shadow-md transition-all flex items-center gap-2 active:scale-95"
        >
          {downloading ? (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          ) : (
            <Download className="w-4 h-4 text-[#FBBF24]" />
          )}
          <span>আইডি কার্ড ডাউনলোড (PNG)</span>
        </button>

        <button
          onClick={() => window.print()}
          className="px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 shadow-sm transition-all flex items-center gap-2 active:scale-95"
        >
          <Printer className="w-4 h-4 text-[#00A3E0]" />
          <span>প্রিন্ট করুন</span>
        </button>
      </div>
    </div>
  );
}
