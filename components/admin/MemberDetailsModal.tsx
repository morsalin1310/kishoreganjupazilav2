"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { MemberProfile } from "@/lib/types";
import {
  Download,
  Printer,
  X,
  CreditCard,
  User,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  Droplet,
  Calendar,
  ShieldCheck,
  FileText,
  ExternalLink,
  MessageSquare,
  CheckCircle2,
  Clock,
  Ban,
} from "lucide-react";
import html2canvas from "html2canvas";

interface MemberDetailsModalProps {
  member: MemberProfile | null;
  onClose: () => void;
  onViewIdCard?: (member: MemberProfile) => void;
  onSendMessage?: (member: MemberProfile) => void;
}

export default function MemberDetailsModal({
  member,
  onClose,
  onViewIdCard,
  onSendMessage,
}: MemberDetailsModalProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  if (!member) return null;

  const handleDownload = async () => {
    if (!sheetRef.current) return;
    try {
      setDownloading(true);
      const canvas = await html2canvas(sheetRef.current, {
        scale: 2.5,
        useCORS: true,
        backgroundColor: "#ffffff",
      });
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `MEMBER-PROFILE-${member.member_no || member.id}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Profile sheet download error:", err);
    } finally {
      setDownloading(false);
    }
  };

  const getMemberTypeLabel = (type: string) => {
    switch (type) {
      case "lifetime": return "আজীবন সদস্য";
      case "donor": return "দাতা সদস্য";
      default: return "সাধারণ সদস্য";
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto font-bangla">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Top Control Bar */}
        <div className="p-4 sm:p-5 bg-[#07261B] text-white flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-800/80 rounded-xl text-[#FBBF24]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold">
                সদস্যের পূর্ণাঙ্গ প্রোফাইল ও তথ্যাবলী
              </h3>
              <p className="text-xs text-emerald-200">
                সদস্য আইডি: <span className="font-mono font-bold text-[#FBBF24]">{member.member_no}</span> | স্ট্যাটাস: {member.status === "approved" ? "অনুমোদিত" : "অপেক্ষমাণ"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#FBBF24] text-[#07261B] hover:bg-[#F59E0B] shadow-sm transition-all flex items-center gap-1.5 active:scale-95 disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{downloading ? "ডাউনলোড হচ্ছে..." : "প্রোফাইল ডাউনলোড"}</span>
            </button>
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white transition-all flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>প্রিন্ট</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all"
              title="বন্ধ করুন"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Sheet */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          <div
            ref={sheetRef}
            className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6 text-slate-800 print:border-none print:shadow-none"
            style={{ fontFamily: "'Hind Siliguri', 'Tiro Bangla', sans-serif" }}
          >
            {/* Sheet Official Header */}
            <div className="flex items-center justify-between border-b-2 border-emerald-900/30 pb-5 gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 flex items-center justify-center">
                  <img
                    src="/logo.png"
                    alt="Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    অফিশিয়াল মেম্বারশিপ রেকর্ড
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-[#07261B]">
                    কিশোরগঞ্জ উপজেলা সমিতি, ঢাকা
                  </h2>
                  <p className="text-xs text-slate-600">
                    কার্যালয়: বাড়ি-১৬, রোড-৩/১, ব্লক-এ, সেক্টর-১৬, উত্তরা, ঢাকা-১২৩০
                  </p>
                </div>
              </div>

              {/* Passport Photo Preview */}
              <div className="shrink-0 text-center">
                <div className="w-24 h-28 rounded-xl overflow-hidden border-2 border-emerald-900/30 bg-slate-50 relative shadow-sm">
                  {member.photo_url ? (
                    <img
                      src={member.photo_url}
                      alt={member.full_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 text-[10px]">
                      <User className="w-8 h-8 text-slate-300 mb-1" />
                      <span>ছবি নেই</span>
                    </div>
                  )}
                </div>
                <span className="text-[10px] font-mono font-bold text-[#07261B] mt-1 block">
                  {member.member_no}
                </span>
              </div>
            </div>

            {/* Key Badges */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full font-bold bg-[#07261B] text-[#FBBF24]">
                  ক্যাটাগরি: {getMemberTypeLabel(member.member_type)}
                </span>
                <span className="px-3 py-1 rounded-full font-bold bg-rose-50 text-rose-700 border border-rose-200">
                  রক্তের গ্রুপ: {member.blood_group}
                </span>
                {member.is_offline_entry && (
                  <span className="px-3 py-1 rounded-full font-bold bg-amber-100 text-amber-900 border border-amber-300">
                    অফলাইন হার্ডকপি নিবন্ধন
                  </span>
                )}
              </div>
              <div>
                {member.status === "approved" ? (
                  <span className="px-3 py-1 rounded-full font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    অনুমোদিত ও সক্রিয়
                  </span>
                ) : member.is_blocked ? (
                  <span className="px-3 py-1 rounded-full font-bold bg-rose-100 text-rose-800 border border-rose-300 flex items-center gap-1">
                    <Ban className="w-3.5 h-3.5 text-rose-600" />
                    লগইন স্থগিত (Blocked)
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full font-bold bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    যাচাইাধীন (Pending)
                  </span>
                )}
              </div>
            </div>

            {/* Grid 1: Personal Information */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-[#07261B] uppercase tracking-wider border-b border-slate-200 pb-1 flex items-center gap-1.5">
                <User className="w-4 h-4 text-emerald-700" />
                ১. ব্যক্তিগত পরিচিতি (Personal Details)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                <div className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="text-slate-500">পূর্ণ নাম:</span>
                  <strong className="text-slate-900">{member.full_name}</strong>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="text-slate-500">পিতার নাম:</span>
                  <span className="text-slate-800 font-medium">{member.father_name || "—"}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="text-slate-500">মাতার নাম:</span>
                  <span className="text-slate-800 font-medium">{member.mother_name || "—"}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="text-slate-500">জন্ম তারিখ:</span>
                  <span className="text-slate-800 font-mono">{member.date_of_birth || "—"}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="text-slate-500">জাতীয় পরিচয়পত্র (NID):</span>
                  <span className="font-mono text-slate-800 font-bold">{member.nid_no || "—"}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="text-slate-500">রক্তের গ্রুপ:</span>
                  <strong className="text-rose-700">{member.blood_group}</strong>
                </div>
              </div>
            </div>

            {/* Grid 2: Addresses & Contact */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-[#07261B] uppercase tracking-wider border-b border-slate-200 pb-1 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-700" />
                ২. স্থায়ী ও বর্তমান ঠিকানা (Addresses & Contact)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                <div className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="text-slate-500">মোবাইল নম্বর:</span>
                  <strong className="font-mono text-emerald-800 font-bold">{member.phone}</strong>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="text-slate-500">ই-মেইল:</span>
                  <span className="text-slate-800">{member.email || "—"}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="text-slate-500">স্থায়ী ইউনিয়ন:</span>
                  <span className="text-slate-800 font-bold">{member.permanent_union}, কিশোরগঞ্জ</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="text-slate-500">স্থায়ী গ্রাম / ওয়ার্ড:</span>
                  <span className="text-slate-800">{member.permanent_village || "—"}</span>
                </div>
                <div className="sm:col-span-2 flex justify-between border-b border-slate-100 pb-1">
                  <span className="text-slate-500 shrink-0 mr-2">বর্তমান ঢাকার ঠিকানা:</span>
                  <span className="text-slate-800 text-right">{member.present_dhaka_address || "—"} {member.dhaka_area ? `(${member.dhaka_area})` : ""}</span>
                </div>
              </div>
            </div>

            {/* Grid 3: Profession & Workplace */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-[#07261B] uppercase tracking-wider border-b border-slate-200 pb-1 flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-emerald-700" />
                ৩. পেশা ও কর্মস্থল (Profession & Workplace)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                <div>
                  <span className="text-slate-500 block text-[11px]">পেশা:</span>
                  <strong className="text-slate-800">{member.profession || "—"}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">পদবী:</span>
                  <span className="text-slate-800 font-medium">{member.workplace_designation || "—"}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">প্রতিষ্ঠানের ঠিকানা:</span>
                  <span className="text-slate-800">{member.workplace_address || "—"}</span>
                </div>
              </div>
            </div>

            {/* Grid 4: Payment Details */}
            <div className="space-y-2 bg-emerald-50/60 p-4 rounded-xl border border-emerald-200">
              <h4 className="text-xs font-bold text-[#07261B] uppercase tracking-wider border-b border-emerald-200 pb-1 flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-emerald-700" />
                ৪. পেমেন্ট ও সদস্য ফি তথ্য (Financial Records)
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div>
                  <span className="text-slate-500 block text-[11px]">ফি এর পরিমাণ:</span>
                  <strong className="text-base text-[#07261B] font-mono">৳ {member.fee_amount?.toLocaleString("bn-BD") || "৫০০"}/-</strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">পেমেন্ট মাধ্যম:</span>
                  <span className="font-bold uppercase font-sans text-slate-800">{member.payment_method || (member.is_offline_entry ? "ক্যাশ জমা" : "bKash")}</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-slate-500 block text-[11px]">ট্রানজেকশন ID (TrxID):</span>
                  <span className="font-mono font-bold text-rose-700">{member.trx_id || (member.is_offline_entry ? "CASH-OFFICE-VERIFIED" : "—")}</span>
                </div>
              </div>
            </div>

            {/* Scanned Paper Form if Offline */}
            {member.paper_form_url && (
              <div className="space-y-2 pt-2 border-t border-slate-200">
                <h4 className="text-xs font-bold text-[#07261B] uppercase tracking-wider flex items-center justify-between">
                  <span>📄 অফলাইনে পূরণকৃত মূল ফরমের স্ক্যান কপি:</span>
                  <a
                    href={member.paper_form_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>পূর্ণ স্ক্রিনে দেখুন</span>
                  </a>
                </h4>
                <div className="max-h-72 overflow-hidden rounded-xl border-2 border-slate-300 bg-slate-50 flex items-center justify-center p-2">
                  <img
                    src={member.paper_form_url}
                    alt="মূল ফরম স্ক্যান"
                    className="max-h-68 max-w-full object-contain rounded-lg shadow-xs"
                  />
                </div>
              </div>
            )}

            {/* Footer Signatures */}
            <div className="pt-6 border-t-2 border-dashed border-slate-300 flex items-end justify-between gap-4 text-xs">
              <div className="text-center w-40">
                <div className="h-10 border-b border-slate-400 flex items-end justify-center pb-1">
                  <span className="text-xs italic text-slate-600">{member.full_name}</span>
                </div>
                <div className="text-[11px] font-bold text-slate-700 pt-1">
                  সদস্যের স্বাক্ষর
                </div>
              </div>
              <div className="text-center w-48">
                <div className="h-10 border-b border-slate-400 flex items-end justify-center pb-1">
                  <span className="text-[10px] font-serif font-bold text-emerald-900 italic">
                    অনুমোদিত ও সংরক্ষিত
                  </span>
                </div>
                <div className="text-[11px] font-bold text-[#07261B] pt-1">
                  সাধারণ সম্পাদক
                </div>
                <div className="text-[9px] text-slate-500">
                  কিশোরগঞ্জ উপজেলা সমিতি, ঢাকা
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            {onViewIdCard && (
              <button
                onClick={() => onViewIdCard(member)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#07261B] text-[#FBBF24] hover:bg-[#0c402e] shadow-sm flex items-center gap-1.5 transition-all"
              >
                <span>ডিজিটাল আইডি কার্ড দেখুন</span>
              </button>
            )}
            {onSendMessage && (
              <button
                onClick={() => onSendMessage(member)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-sm flex items-center gap-1.5 transition-all"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>এসএমএস পাঠান</span>
              </button>
            )}
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 transition-all"
          >
            বন্ধ করুন
          </button>
        </div>

      </div>
    </div>
  );
}

