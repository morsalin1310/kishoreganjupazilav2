"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DigitalIdCard from "@/components/dashboard/DigitalIdCard";
import { useSiteStore } from "@/lib/siteStore";
import { MemberProfile } from "@/lib/types";
import {
  User,
  CreditCard,
  Bell,
  Droplet,
  CheckCircle,
  Clock,
  Printer,
  Calendar,
  ShieldCheck,
  LogOut,
  ChevronRight,
  Edit3,
  Save,
  KeyRound,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  AlertCircle,
  QrCode,
  Sparkles,
  Download,
  FileText,
  DollarSign,
  Check,
  X,
} from "lucide-react";
import PaymentReceipt, { PaymentReceiptData } from "@/components/common/PaymentReceipt";

export default function DashboardPage() {
  const router = useRouter();
  const { members, currentUser, logoutMember, updateMemberProfile, settings } = useSiteStore();
  const [activeTab, setActiveTab] = useState<"idcard" | "payments" | "profile">("idcard");
  
  // Use logged-in member or fallback to first approved member
  const member: MemberProfile = currentUser || members[0];

  // Self-update form state
  const [profileForm, setProfileForm] = useState({
    phone: member.phone || "",
    email: member.email || "",
    present_dhaka_address: member.present_dhaka_address || "",
    profession: member.profession || "",
    workplace_designation: member.workplace_designation || "",
    workplace_address: member.workplace_address || "",
    blood_group: member.blood_group || "B+",
    password: member.password || "",
  });

  const [saveSuccess, setSaveSuccess] = useState(false);

  // Monthly Dues State & Handlers
  const [duesMonths, setDuesMonths] = useState<number>(3);
  const [duesMethod, setDuesMethod] = useState<"bkash" | "nagad" | "rocket" | "bank">("bkash");
  const [duesTrxId, setDuesTrxId] = useState("");
  const [duesSubmitting, setDuesSubmitting] = useState(false);
  const [duesSuccessMsg, setDuesSuccessMsg] = useState("");
  const [duesHistory, setDuesHistory] = useState<Array<{
    id: string;
    receiptNo: string;
    date: string;
    months: number;
    amount: number;
    method: string;
    trxId: string;
    status: string;
  }>>([
    {
      id: "dues-seed-1",
      receiptNo: `REC-M-${member.member_no?.replace(/[^0-9]/g, "") || "101"}-01`,
      date: "০১ জানুয়ারি, ২০২৬",
      months: 6,
      amount: 150,
      method: "bKash",
      trxId: "BKSH9182371",
      status: "verified",
    },
  ]);
  const [selectedReceipt, setSelectedReceipt] = useState<PaymentReceiptData | null>(null);

  const duesRatePerMonth = 25; // 25 BDT per month
  const totalDuesAmount = duesMonths * duesRatePerMonth;

  const handlePayDues = (e: React.FormEvent) => {
    e.preventDefault();
    if (!duesTrxId.trim()) return;
    setDuesSubmitting(true);

    const newReceiptNo = `REC-M-${member.member_no?.replace(/[^0-9]/g, "") || "101"}-${Date.now().toString().slice(-4)}`;
    const newRecord = {
      id: `dues-${Date.now()}`,
      receiptNo: newReceiptNo,
      date: new Date().toLocaleDateString("bn-BD", { year: "numeric", month: "long", day: "numeric" }),
      months: duesMonths,
      amount: totalDuesAmount,
      method: duesMethod.toUpperCase(),
      trxId: duesTrxId.trim(),
      status: "verified",
    };

    setDuesHistory([newRecord, ...duesHistory]);
    setDuesSuccessMsg("চাঁদা পেমেন্ট সফলভাবে সম্পন্ন হয়েছে!");
    setDuesTrxId("");
    setDuesSubmitting(false);

    // Open receipt modal immediately
    setSelectedReceipt({
      receiptNo: newRecord.receiptNo,
      date: newRecord.date,
      memberName: member.full_name,
      fatherName: member.father_name || undefined,
      memberPhone: member.phone,
      memberNo: member.member_no,
      memberType: member.member_type,
      union: member.permanent_union,
      village: member.permanent_village,
      presentAddress: member.present_dhaka_address,
      paymentMethod: newRecord.method,
      trxId: newRecord.trxId,
      amount: newRecord.amount,
      purpose: `মাসিক সদস্য চাঁদা (${duesMonths.toLocaleString("bn-BD")} মাস)`,
      monthsCount: duesMonths,
      status: "verified",
    });

    setTimeout(() => setDuesSuccessMsg(""), 4000);
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateMemberProfile(member.id, {
      phone: profileForm.phone,
      email: profileForm.email,
      present_dhaka_address: profileForm.present_dhaka_address,
      profession: profileForm.profession,
      workplace_designation: profileForm.workplace_designation,
      workplace_address: profileForm.workplace_address,
      blood_group: profileForm.blood_group as any,
      password: profileForm.password || member.password,
    });

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleLogout = () => {
    logoutMember();
    router.push("/login");
  };

  return (
    <div className="min-h-screen pt-28 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-[#FDFBF7] font-bangla">
      <div className="max-w-6xl mx-auto">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-[#07261B] via-[#0B3B2C] to-[#145A43] text-white rounded-3xl p-6 sm:p-8 shadow-xl mb-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-emerald-900/40">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden ring-4 ring-[#FBBF24] shrink-0 bg-white p-0.5 shadow-md">
              <Image
                src={member.photo_url || "/logo.png"}
                alt={member.full_name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-800/80 border border-emerald-500/40 text-[#FBBF24] text-xs font-semibold mb-1">
                <CheckCircle className="w-3.5 h-3.5 text-[#FBBF24]" />
                ভেরিফাইড ও সক্রিয় সদস্য
              </div>
              <h1 className="text-xl sm:text-2xl font-black">{member.full_name}</h1>
              <p className="text-emerald-200/90 text-xs sm:text-sm">
                সদস্য নম্বর: <strong className="text-[#FBBF24] font-mono">{member.member_no}</strong> |{" "}
                ক্যাটাগরি:{" "}
                <span className="font-semibold text-white">
                  {member.member_type === "lifetime"
                    ? "আজীবন সদস্য"
                    : member.member_type === "donor"
                    ? "দাতা সদস্য"
                    : "সাধারণ সদস্য"}
                </span>{" "}
                | স্থায়ী ইউনিয়ন: {member.permanent_union}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/"
              className="px-4 py-2 rounded-full text-xs font-bold bg-white/10 hover:bg-white/20 border border-white/20 transition-all text-white"
            >
              মূল ওয়েবসাইট
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-full text-xs font-bold bg-[#DC2626] hover:bg-red-700 text-white shadow-md transition-all flex items-center gap-1.5 active:scale-95"
            >
              <LogOut className="w-3.5 h-3.5" />
              লগআউট
            </button>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3 mb-8 overflow-x-auto">
          {[
            { id: "idcard", label: "ডিজিটাল আইডি কার্ড ও QR কোড", icon: QrCode },
            { id: "payments", label: "পেমেন্ট ও সদস্য চাঁদা হিসাব", icon: CreditCard },
            { id: "profile", label: "প্রোফাইল তথ্য ও সেলফ-আপডেট", icon: Edit3 },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-[#07261B] text-[#FBBF24] shadow-md ring-2 ring-emerald-600/30"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                <Icon className="w-4 h-4 text-[#FBBF24]" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Digital ID Card */}
        {activeTab === "idcard" && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm flex flex-col items-center">
            <div className="text-center mb-6 max-w-xl">
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block mb-2">
                সাধারণ সম্পাদকের স্বাক্ষরযুক্ত অফিসিয়াল কার্ড
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#07261B] mb-1">
                আপনার অফিসিয়াল ডিজিটাল সদস্য আইডি কার্ড
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm">
                এই কার্ডের কিউআর কোড স্ক্যান করে যেকোনো সময় আপনার সদস্যপদ যাচাই করা যাবে। সাধারণ সম্পাদকের স্বাক্ষরযুক্ত এই কার্ডটি ডাউনলোড বা প্রিন্ট করে সংরক্ষণ করুন।
              </p>
            </div>

            <DigitalIdCard member={member} />
          </div>
        )}

        {/* Tab 2: Payments & Dues */}
        {activeTab === "payments" && (
          <div className="space-y-6">
            {/* Pay Monthly Dues Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#FBBF24]" />
                    সমিতির সদস্য চাঁদা পরিশোধ পোর্টাল
                  </div>
                  <h2 className="text-xl font-black text-[#07261B]">
                    মাসিক চাঁদা পরিশোধ করুন
                  </h2>
                  <p className="text-slate-500 text-xs mt-0.5">
                    সাধারণ সদস্যদের মাসিক চাঁদার হার ২৫৳ (পঁচিশ টাকা)। ১ মাস, ৩ মাস, ৪ মাস, ৬ মাস বা ১ বছরের চাঁদা একবারে পরিশোধ করতে পারেন।
                  </p>
                </div>

                <div className="bg-emerald-50/80 px-4 py-2 rounded-2xl border border-emerald-200 text-right">
                  <span className="text-[11px] text-slate-500 block">মাসিক চাঁদা হার</span>
                  <strong className="text-lg text-[#07261B] font-mono font-black">২৫৳ / মাস</strong>
                </div>
              </div>

              {duesSuccessMsg && (
                <div className="p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2 animate-in fade-in">
                  <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>{duesSuccessMsg}</span>
                </div>
              )}

              <form onSubmit={handlePayDues} className="space-y-6">
                {/* Duration Selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2.5">
                    চাঁদার মেয়াদ নির্বাচন করুন <span className="text-rose-500">*</span>:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {[
                      { months: 1, label: "১ মাস", amount: 25 },
                      { months: 3, label: "৩ মাস", amount: 75, popular: true },
                      { months: 4, label: "৪ মাস", amount: 100 },
                      { months: 6, label: "৬ মাস", amount: 150 },
                      { months: 12, label: "১ বছর", amount: 300, badge: "সেরা পছন্দ" },
                    ].map((opt) => (
                      <button
                        type="button"
                        key={opt.months}
                        onClick={() => setDuesMonths(opt.months)}
                        className={`p-3.5 rounded-2xl border-2 text-center transition-all relative ${
                          duesMonths === opt.months
                            ? "border-[#07261B] bg-emerald-50/80 shadow-md ring-2 ring-emerald-500/20"
                            : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        {opt.badge && (
                          <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-[#FBBF24] text-[#07261B] text-[9px] font-bold shadow-xs whitespace-nowrap">
                            {opt.badge}
                          </span>
                        )}
                        <div className="text-xs font-bold text-slate-800">{opt.label}</div>
                        <div className="text-base font-black text-[#07261B] font-mono mt-0.5">
                          ৳ {opt.amount}/-
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          {opt.months} × ২৫৳
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amount Summary & Payment Info */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
                  <div>
                    <span className="text-slate-500 block mb-1">মোট প্রদেয় টাকা:</span>
                    <strong className="text-2xl text-[#07261B] font-mono font-black">
                      ৳ {totalDuesAmount.toLocaleString("bn-BD")}/-
                    </strong>
                    <span className="text-[10px] text-slate-500 block mt-0.5">
                      ({duesMonths.toLocaleString("bn-BD")} মাসের জন্য)
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block mb-1">সমিতির পেমেন্ট নম্বর:</span>
                    <strong className="text-base text-rose-700 font-mono font-bold block">
                      {settings.bkashNumber || settings.contactPhone || "০১৩৫৩-৭৪৩৫৪৭"}
                    </strong>
                    <span className="text-[10px] text-slate-500">বিকাশ / নগদ / রকেট (Send Money / Payment)</span>
                  </div>
                  <div>
                    <label className="text-slate-700 font-bold block mb-1">পেমেন্ট মেথড:</label>
                    <select
                      value={duesMethod}
                      onChange={(e) => setDuesMethod(e.target.value as any)}
                      className="w-full p-2 rounded-xl border border-slate-300 bg-white font-semibold text-xs focus:border-[#07261B] outline-none"
                    >
                      <option value="bkash">বিকাশ (bKash)</option>
                      <option value="nagad">নগদ (Nagad)</option>
                      <option value="rocket">রকেট (Rocket)</option>
                      <option value="bank">ব্যাংক একাউন্ট</option>
                    </select>
                  </div>
                </div>

                {/* TrxID Input & Submit */}
                <div className="flex flex-col sm:flex-row items-end gap-4">
                  <div className="flex-1 w-full">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      পেমেন্ট ট্রানজেকশন আইডি (TrxID) <span className="text-rose-500">*</span>:
                    </label>
                    <input
                      type="text"
                      value={duesTrxId}
                      onChange={(e) => setDuesTrxId(e.target.value)}
                      placeholder="যেমন: BKSH91829374"
                      className="w-full p-3 rounded-xl border border-slate-300 focus:border-[#07261B] outline-none font-mono uppercase font-bold text-sm text-slate-800"
                      required
                    />
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      বিকাশ বা নগদ থেকে সফল সেন্ড মানির পর প্রাপ্ত TrxID এখানে লিখুন।
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={duesSubmitting || !duesTrxId.trim()}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-[#07261B] text-[#FBBF24] hover:bg-[#0c402e] shadow-md transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>চাঁদা পরিশোধ সম্পন্ন করুন ও রসিদ পান</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Payment History & Receipts */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-[#07261B]">পরিশোধিত চাঁদা ও ফি এর তালিকা</h2>
                  <p className="text-slate-500 text-xs">আপনার সকল পরিশোধিত রেজিস্ট্রেশন ফি ও মাসিক চাঁদার অফিশিয়াল রসিদসমূহ</p>
                </div>
                <div className="px-4 py-1.5 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-bold border border-emerald-200 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>স্ট্যাটাস: নিয়মিত পরিশোধিত ও সক্রিয়</span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-700 uppercase font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3">রসিদ নম্বর</th>
                      <th className="p-3">তারিখ</th>
                      <th className="p-3">ফি এর বিবরণ</th>
                      <th className="p-3">মেথড</th>
                      <th className="p-3">TrxID</th>
                      <th className="p-3">পরিমাণ</th>
                      <th className="p-3">স্ট্যাটাস</th>
                      <th className="p-3 text-right">মানি রসিদ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {/* Dues Payments */}
                    {duesHistory.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3 font-mono font-bold text-[#07261B]">
                          {item.receiptNo}
                        </td>
                        <td className="p-3 text-slate-600">{item.date}</td>
                        <td className="p-3 font-bold text-slate-800">
                          মাসিক চাঁদা ({item.months.toLocaleString("bn-BD")} মাস)
                        </td>
                        <td className="p-3 uppercase font-sans font-semibold text-slate-700">{item.method}</td>
                        <td className="p-3 font-mono text-rose-700 font-bold">{item.trxId}</td>
                        <td className="p-3 font-mono font-bold text-[#07261B] text-sm">
                          ৳ {item.amount.toLocaleString("bn-BD")}/-
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold inline-flex items-center gap-1">
                            <Check className="w-3 h-3 text-emerald-600" />
                            গৃহীত
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() =>
                              setSelectedReceipt({
                                receiptNo: item.receiptNo,
                                date: item.date,
                                memberName: member.full_name,
                                fatherName: member.father_name || undefined,
                                memberPhone: member.phone,
                                memberNo: member.member_no,
                                memberType: member.member_type,
                                union: member.permanent_union,
                                village: member.permanent_village,
                                presentAddress: member.present_dhaka_address,
                                paymentMethod: item.method,
                                trxId: item.trxId,
                                amount: item.amount,
                                purpose: `মাসিক সদস্য চাঁদা (${item.months.toLocaleString("bn-BD")} মাস)`,
                                monthsCount: item.months,
                                status: "verified",
                              })
                            }
                            className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 font-bold flex items-center gap-1 text-[11px] ml-auto transition-all"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>রসিদ দেখুন / ডাউনলোড</span>
                          </button>
                        </td>
                      </tr>
                    ))}

                    {/* Registration Fee */}
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 font-mono font-bold text-[#07261B]">
                        REC-REG-{member.member_no?.replace(/[^0-9]/g, "") || "101"}
                      </td>
                      <td className="p-3 text-slate-600">১৫ জানুয়ারি, ২০২৬</td>
                      <td className="p-3 font-medium text-slate-800">
                        {member.member_type === "lifetime"
                          ? "আজীবন সদস্য এককালীন ফি"
                          : member.member_type === "donor"
                          ? "দাতা সদস্য অনুদান"
                          : "সাধারণ সদস্যপদ এককালীন ফি"}
                      </td>
                      <td className="p-3 uppercase font-sans font-semibold text-slate-700">
                        {member.payment_method || (member.is_offline_entry ? "ক্যাশ জমা (অফিস)" : "bKash")}
                      </td>
                      <td className="p-3 font-mono text-slate-600">
                        {member.trx_id || (member.is_offline_entry ? "CASH-OFFLINE" : "BKSH-ONLINE")}
                      </td>
                      <td className="p-3 font-mono font-bold text-[#07261B] text-sm">
                        ৳ {(member.fee_amount || (member.member_type === "lifetime" ? 10000 : 500)).toLocaleString("bn-BD")}/-
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          ভেরিফাইড
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() =>
                            setSelectedReceipt({
                              receiptNo: `REC-REG-${member.member_no?.replace(/[^0-9]/g, "") || "101"}`,
                              date: "১৫ জানুয়ারি, ২০২৬",
                              memberName: member.full_name,
                              fatherName: member.father_name || undefined,
                              memberPhone: member.phone,
                              memberNo: member.member_no,
                              memberType: member.member_type,
                              union: member.permanent_union,
                              village: member.permanent_village,
                              presentAddress: member.present_dhaka_address,
                              paymentMethod: member.payment_method || "bKash",
                              trxId: member.trx_id || "BKSH-SEED",
                              amount: member.fee_amount || (member.member_type === "lifetime" ? 10000 : 500),
                              purpose: `সদস্য নিবন্ধন ফি (${member.member_type === "lifetime" ? "আজীবন সদস্য" : member.member_type === "donor" ? "দাতা সদস্য" : "সাধারণ সদস্য"})`,
                              status: "verified",
                            })
                          }
                          className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 font-bold flex items-center gap-1 text-[11px] ml-auto transition-all"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>রসিদ দেখুন / ডাউনলোড</span>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Self Profile Update */}
        {activeTab === "profile" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="border-b pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-xl font-bold text-[#07261B]">আমার প্রোফাইল ও তথ্য হালনাগাদ</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  আপনার মোবাইল নম্বর, ইমেল, বর্তমান ঠিকানা, কর্মস্থল ও পাসওয়ার্ড পরিবর্তন করতে পারেন।
                </p>
              </div>

              {saveSuccess && (
                <div className="px-3.5 py-1.5 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-1.5 animate-in fade-in">
                  <CheckCircle className="w-4 h-4 text-emerald-700" />
                  <span>তথ্য সফলভাবে সংরক্ষিত হয়েছে!</span>
                </div>
              )}
            </div>

            {/* Read-Only Basic Information Notice */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-2">
              <span className="font-bold text-slate-800 block">স্থায়ী ও অপরিবর্তনযোগ্য তথ্য:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <span className="text-slate-400 block">নাম:</span>
                  <strong className="text-slate-800">{member.full_name}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">পিতার নাম:</span>
                  <strong className="text-slate-800">{member.father_name}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">মাতার নাম:</span>
                  <strong className="text-slate-800">{member.mother_name}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">স্থায়ী ইউনিয়ন ও গ্রাম:</span>
                  <strong className="text-slate-800">{member.permanent_union}, {member.permanent_village}</strong>
                </div>
              </div>
            </div>

            {/* Editable Form */}
            <form onSubmit={handleUpdateProfile} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    মোবাইল নম্বর (লগইন আইডি হিসেবে ব্যবহৃত):
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      required
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 font-mono focus:border-[#07261B] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">ই-মেইল ঠিকানা:</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:border-[#07261B] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">রক্তের গ্রুপ:</label>
                  <select
                    value={profileForm.blood_group}
                    onChange={(e) => setProfileForm({ ...profileForm, blood_group: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-bold text-rose-700"
                  >
                    {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((bg) => (
                      <option key={bg} value={bg}>
                        {bg}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">পেশা:</label>
                  <input
                    type="text"
                    value={profileForm.profession}
                    onChange={(e) => setProfileForm({ ...profileForm, profession: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">কর্মস্থলের পদবী:</label>
                  <input
                    type="text"
                    value={profileForm.workplace_designation}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, workplace_designation: e.target.value })
                    }
                    placeholder="যেমন: সিনিয়র অফিসার"
                    className="w-full p-2.5 rounded-xl border border-slate-300"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">কর্মস্থলের ঠিকানা:</label>
                  <input
                    type="text"
                    value={profileForm.workplace_address}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, workplace_address: e.target.value })
                    }
                    placeholder="যেমন: মতিঝিল বা কারওয়ান বাজার, ঢাকা"
                    className="w-full p-2.5 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  বর্তমান ঢাকার ঠিকানা:
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <textarea
                    rows={2}
                    value={profileForm.present_dhaka_address}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, present_dhaka_address: e.target.value })
                    }
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 focus:border-[#07261B] outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200">
                <label className="font-semibold text-slate-700 block mb-1">
                  পাসওয়ার্ড পরিবর্তন করুন (নতুন পাসওয়ার্ড না দিলে ফাঁকা রাখুন):
                </label>
                <div className="relative max-w-sm">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={profileForm.password}
                    onChange={(e) => setProfileForm({ ...profileForm, password: e.target.value })}
                    placeholder="নতুন পাসওয়ার্ড দিন"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#07261B] text-[#FBBF24] hover:bg-[#0c402e] shadow-md transition-all flex items-center gap-2 active:scale-95"
                >
                  <Save className="w-4 h-4 text-[#FBBF24]" />
                  <span>তথ্য আপডেট ও সংরক্ষণ করুন</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Modal: Official Money Receipt / Payment Slip */}
        {selectedReceipt && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-4 sm:p-6 shadow-2xl relative animate-in zoom-in-95 duration-150 my-8">
              <PaymentReceipt
                receipt={selectedReceipt}
                onClose={() => setSelectedReceipt(null)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
