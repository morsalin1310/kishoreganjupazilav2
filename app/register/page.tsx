"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSiteStore } from "@/lib/siteStore";
import { MemberType, BloodGroup, NILPHAMARI_KISHOREGANJ_UNIONS, KishoreganjUnion } from "@/lib/types";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  Droplet,
  CreditCard,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Lock,
  Calendar,
  Upload,
  AlertCircle,
  Sparkles,
  Camera,
  Shield,
  FileText,
  Building,
  Printer,
  Download,
} from "lucide-react";
import PaymentReceipt, { PaymentReceiptData } from "@/components/common/PaymentReceipt";

const STEPS = [
  { id: 1, title: "সদস্যের ধরন", icon: User, subtitle: "ক্যাটাগরি নির্বাচন" },
  { id: 2, title: "ব্যক্তিগত তথ্য", icon: FileText, subtitle: "ঠিকানা ও কর্মস্থল" },
  { id: 3, title: "লগইন ও ছবি", icon: Shield, subtitle: "সিকিউরিটি সেটআপ" },
  { id: 4, title: "পেমেন্ট", icon: CreditCard, subtitle: "ফি প্রদান ও সাবমিট" },
];

export default function RegisterPage() {
  const { registerMember, sendSms, settings } = useSiteStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [memberType, setMemberType] = useState<MemberType>("general");
  const [submitted, setSubmitted] = useState(false);
  const [createdPending, setCreatedPending] = useState<any>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    fatherName: "",
    motherName: "",
    dateOfBirth: "",
    permanentDistrict: "নীলফামারী",
    permanentUpazila: "কিশোরগঞ্জ",
    permanentUnion: "কিশোরগঞ্জ সদর" as KishoreganjUnion,
    permanentVillage: "",
    presentDhakaAddress: "",
    dhakaArea: "উত্তরা",
    profession: "",
    workplaceDesignation: "",
    workplaceAddress: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    nidNo: "",
    bloodGroup: "O+" as BloodGroup,
    photoUrl: "",
    paymentMethod: "bkash" as "bkash" | "nagad" | "rocket" | "bank",
    trxId: "",
  });

  const [photoPreview, setPhotoPreview] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState("");

  const getFeeAmount = (type: MemberType) => {
    switch (type) {
      case "lifetime": return 10000;
      case "donor": return 50000;
      default: return 500;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // File Upload Handler — converts to base64 data URL for localStorage
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg("ছবির সাইজ ৫ MB এর বেশি হতে পারবে না।");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setPhotoPreview(base64);
      setFormData((prev) => ({ ...prev, photoUrl: base64 }));
      setErrorMsg("");
    };
    reader.readAsDataURL(file);
  };

  // Validation per step
  const validateStep = (step: number): boolean => {
    setErrorMsg("");
    switch (step) {
      case 1:
        return true; // member type always has a default
      case 2:
        if (!formData.fullName.trim()) { setErrorMsg("আপনার নাম পূরণ করুন।"); return false; }
        if (!formData.fatherName.trim()) { setErrorMsg("পিতার নাম পূরণ করুন।"); return false; }
        if (!formData.motherName.trim()) { setErrorMsg("মাতার নাম পূরণ করুন।"); return false; }
        if (!formData.dateOfBirth) { setErrorMsg("জন্ম তারিখ নির্বাচন করুন।"); return false; }
        if (!formData.permanentVillage.trim()) { setErrorMsg("স্থায়ী ঠিকানা (গ্রাম) পূরণ করুন।"); return false; }
        if (!formData.presentDhakaAddress.trim()) { setErrorMsg("ঢাকার বর্তমান ঠিকানা পূরণ করুন।"); return false; }
        if (!formData.profession.trim()) { setErrorMsg("পেশা উল্লেখ করুন।"); return false; }
        if (!formData.nidNo.trim()) { setErrorMsg("জাতীয় পরিচয়পত্র নং (NID) প্রদান করুন।"); return false; }
        return true;
      case 3:
        if (!formData.phone.trim()) { setErrorMsg("মোবাইল নম্বর পূরণ করুন (এটিই লগইন আইডি)।"); return false; }
        if (!formData.photoUrl) { setErrorMsg("সদস্যের ছবি আপলোড করা বাধ্যতামূলক।"); return false; }
        if (!formData.password || formData.password.length < 6) { setErrorMsg("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।"); return false; }
        if (formData.password !== formData.confirmPassword) { setErrorMsg("পাসওয়ার্ড এবং কনফার্ম পাসওয়ার্ড মেলেনি।"); return false; }
        return true;
      case 4:
        if (!formData.trxId.trim()) { setErrorMsg("পেমেন্ট ট্রানজেকশন আইডি (TrxID) বাধ্যতামূলক।"); return false; }
        return true;
      default:
        return true;
    }
  };

  const goNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goPrev = () => {
    setErrorMsg("");
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = () => {
    if (!validateStep(4)) return;
    setErrorMsg("");

    const fee = getFeeAmount(memberType);

    const pendingObj = registerMember({
      full_name: formData.fullName.trim(),
      father_name: formData.fatherName.trim(),
      mother_name: formData.motherName.trim(),
      date_of_birth: formData.dateOfBirth,
      permanent_district: "নীলফামারী",
      permanent_upazila: "কিশোরগঞ্জ",
      permanent_union: formData.permanentUnion,
      permanent_village: formData.permanentVillage.trim(),
      present_dhaka_address: formData.presentDhakaAddress.trim(),
      dhaka_area: formData.dhakaArea,
      profession: formData.profession.trim(),
      workplace_designation: formData.workplaceDesignation.trim() || undefined,
      workplace_address: formData.workplaceAddress.trim() || undefined,
      phone: formData.phone.trim(),
      email: formData.email.trim() || undefined,
      password: formData.password,
      nid_no: formData.nidNo.trim(),
      blood_group: formData.bloodGroup,
      photo_url: formData.photoUrl || undefined,
      member_type: memberType,
      payment_method: formData.paymentMethod,
      trx_id: formData.trxId.trim(),
      fee_amount: fee,
    });

    // Send Registration SMS
    sendSms({
      recipient_type: "individual",
      recipient_target: `${formData.fullName.trim()} (${formData.phone.trim()})`,
      phone_count: 1,
      sample_phone: formData.phone.trim(),
      message: `আপনার নিবন্ধন সম্পন্ন হয়েছে। আইডি: ${pendingObj.id}। অ্যাডমিন অনুমোদনের পর মোবাইল নম্বর ও পাসওয়ার্ড দিয়ে লগইন করুন এবং আইডি কার্ড ডাউনলোড করে নিন। - কিশোরগঞ্জ উপজেলা সমিতি, ঢাকা`,
    });

    setCreatedPending(pendingObj);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen pt-28 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-[#FDFBF7] font-bangla">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-[#07261B] text-xs font-bold mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#FBBF24]" />
            অফিসিয়াল অনলাইন সদস্য নিবন্ধন
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#07261B]">
            কিশোরগঞ্জ উপজেলা সমিতি, ঢাকা (নীলফামারী)
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-2">
            নীলফামারী জেলার কিশোরগঞ্জ উপজেলার ৯টি ইউনিয়নের ঢাকায় বসবাসরত ভাই-বোনদের জন্য অনলাইন সদস্যপদ ফরম।
          </p>
        </div>

        {/* Success View */}
        {submitted ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border-2 border-emerald-500/40 shadow-xl text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto ring-8 ring-emerald-50">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300 inline-block">
                আবেদন স্ট্যাটাস: অপেক্ষমাণ (Pending Verification)
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#07261B]">
                আপনার সদস্য নিবন্ধন ফরম সফলভাবে গৃহীত হয়েছে!
              </h2>
              <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
                ধন্যবাদ <strong>{formData.fullName}</strong>। আপনার পেমেন্ট ট্রানজেকশন আইডি (<strong className="font-mono text-[#07261B]">{formData.trxId}</strong>) এবং আবেদনটি বর্তমানে পর্যালোচনাধীন রয়েছে।
              </p>
            </div>

            {/* SMS Notification Info */}
            <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-200 max-w-lg mx-auto text-left text-xs space-y-2">
              <div className="flex items-center gap-2 text-emerald-800 font-bold mb-1">
                <Phone className="w-4 h-4" />
                <span>এসএমএস নোটিফিকেশন প্রেরিত:</span>
              </div>
              <p className="text-emerald-700 bg-emerald-100/60 p-3 rounded-xl border border-emerald-200/80 italic">
                &ldquo;আপনার নিবন্ধন সম্পন্ন হয়েছে। অ্যাডমিন অনুমোদনের পর মোবাইল নম্বর ও পাসওয়ার্ড দিয়ে লগইন করুন এবং আইডি কার্ড ডাউনলোড করে নিন।&rdquo;
              </p>
            </div>

            {/* Verification Notice Card */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 max-w-lg mx-auto text-left text-xs space-y-2.5">
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">লগইন মোবাইল নম্বর (User ID):</span>
                <strong className="font-mono text-slate-800">{formData.phone}</strong>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">সদস্যের ধরন:</span>
                <span className="font-bold text-[#07261B]">
                  {memberType === "lifetime" ? "আজীবন সদস্য (১০,০০০৳)" : memberType === "donor" ? "দাতা সদস্য (৫০,০০০৳)" : "সাধারণ সদস্য (৫০০৳)"}
                </span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">পেমেন্ট মেথড:</span>
                <span className="uppercase font-semibold">{formData.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">স্থায়ী ইউনিয়ন:</span>
                <span>{formData.permanentUnion}, কিশোরগঞ্জ</span>
              </div>
            </div>

            {/* Official Payment Slip / Money Receipt */}
            <div className="pt-4 border-t border-slate-200">
              <div className="mb-4 text-center">
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100/80 px-4 py-1.5 rounded-full inline-block">
                  📄 আপনার অফিশিয়াল পেমেন্ট স্লিপ / মানি রসিদ তৈরি হয়েছে
                </span>
                <p className="text-xs text-slate-500 mt-1">
                  ভবিষ্যৎ রেফারেন্স ও সদস্যপদ যাচাইয়ের জন্য রসিদটি এখনই ডাউনলোড বা প্রিন্ট করে সংরক্ষণ করুন।
                </p>
              </div>

              <PaymentReceipt
                receipt={{
                  receiptNo: `REC-REG-${createdPending?.id?.replace(/[^0-9]/g, "") || Date.now().toString().slice(-6)}`,
                  memberName: formData.fullName || "আবেদনকারী",
                  fatherName: formData.fatherName || undefined,
                  memberPhone: formData.phone || "",
                  memberNo: "যাচাইাধীন",
                  memberType: memberType,
                  union: formData.permanentUnion,
                  village: formData.permanentVillage,
                  presentAddress: formData.presentDhakaAddress,
                  paymentMethod: formData.paymentMethod,
                  trxId: formData.trxId,
                  amount: getFeeAmount(memberType),
                  purpose: `অনলাইন সদস্য নিবন্ধন ফি (${memberType === "lifetime" ? "আজীবন সদস্য" : memberType === "donor" ? "দাতা সদস্য" : "সাধারণ সদস্য"})`,
                  status: "pending",
                }}
              />
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs max-w-lg mx-auto flex items-start gap-3 text-left">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p>
                <strong>জরুরি নির্দেশিকা:</strong> অ্যাডমিন প্যানেল থেকে আপনার তথ্য ও পেমেন্ট TrxID যাচাই করে <strong>&apos;Approve&apos;</strong> করলেই আপনার মোবাইলে কনফার্মেশন এসএমএস ও স্মার্ট মেম্বার আইডি যাবে এবং আপনি লগইন করতে পারবেন।
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                href="/login"
                className="px-8 py-3 rounded-full text-xs sm:text-sm font-bold bg-[#07261B] text-[#FBBF24] hover:bg-[#0c402e] shadow-md transition-all flex items-center gap-2"
              >
                <span>লগইন পেজে যান</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/"
                className="px-6 py-3 rounded-full text-xs sm:text-sm font-semibold border border-slate-300 text-slate-700 hover:bg-slate-50"
              >
                হোমপেজে ফিরে যান
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Step Progress Indicator */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between">
                {STEPS.map((step, index) => (
                  <div key={step.id} className="flex items-center flex-1">
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                          currentStep === step.id
                            ? "bg-[#07261B] text-[#FBBF24] ring-4 ring-emerald-200 shadow-lg"
                            : currentStep > step.id
                            ? "bg-emerald-500 text-white"
                            : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        {currentStep > step.id ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <step.icon className="w-5 h-5" />
                        )}
                      </div>
                      <span className={`text-[10px] sm:text-xs mt-1.5 font-bold text-center leading-tight ${
                        currentStep === step.id ? "text-[#07261B]" : currentStep > step.id ? "text-emerald-600" : "text-slate-400"
                      }`}>
                        {step.title}
                      </span>
                      <span className="text-[9px] text-slate-400 hidden sm:block">{step.subtitle}</span>
                    </div>
                    {index < STEPS.length - 1 && (
                      <div className={`flex-1 h-1 mx-2 rounded-full transition-all ${
                        currentStep > step.id ? "bg-emerald-400" : "bg-slate-200"
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-300 text-rose-700 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Step Content */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl">
              
              {/* ========== STEP 1: Member Type ========== */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-[#07261B] flex items-center justify-center gap-2">
                      <User className="w-6 h-6 text-[#FBBF24]" />
                      ধাপ ১: সদস্যের ধরন নির্বাচন করুন
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">আপনি কোন ধরনের সদস্য হিসেবে নিবন্ধন করতে চান?</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { type: "general" as MemberType, title: "সাধারণ সদস্য", fee: "ভর্তি ফি ৫০০৳ + চাঁদা ২৫৳/মাস", badge: "নিয়মিত সদস্য", emoji: "👤", desc: "সাধারণ সদস্যপদ নিয়ে সমিতির সকল কার্যক্রমে অংশ নিন।" },
                      { type: "lifetime" as MemberType, title: "আজীবন সদস্য", fee: "এককালীন ১০,০০০৳ অনুদান", badge: "আজীবন সদস্যপদ", emoji: "⭐", desc: "আজীবন সদস্যপদ গ্রহণ করে চিরদিনের জন্য সমিতির অবিচ্ছেদ্য অংশ হোন।" },
                      { type: "donor" as MemberType, title: "দাতা সদস্য", fee: "এককালীন সর্বনিম্ন ৫০,০০০৳", badge: "সম্মানিত পৃষ্ঠপোষক", emoji: "🏆", desc: "দাতা সদস্য হিসেবে সমিতির উন্নয়নে বিশেষ অবদান রাখুন।" },
                    ].map((item) => (
                      <button
                        key={item.type}
                        type="button"
                        onClick={() => setMemberType(item.type)}
                        className={`p-6 rounded-2xl border text-left transition-all relative overflow-hidden ${
                          memberType === item.type
                            ? "border-[#07261B] bg-emerald-50/50 shadow-md ring-2 ring-[#07261B]/20"
                            : "border-slate-200 hover:border-slate-300 bg-white hover:shadow-sm"
                        }`}
                      >
                        <div className="text-3xl mb-3">{item.emoji}</div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-sm text-[#07261B]">{item.title}</span>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 inline-block mb-2">
                          {item.badge}
                        </span>
                        <div className="text-xs text-slate-500 font-semibold mb-2">{item.fee}</div>
                        <p className="text-[11px] text-slate-400 leading-relaxed">{item.desc}</p>
                        {memberType === item.type && (
                          <div className="absolute top-3 right-3">
                            <CheckCircle className="w-6 h-6 text-emerald-600" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ========== STEP 2: Personal Info + Address + Workplace ========== */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#07261B] flex items-center gap-2">
                    <FileText className="w-6 h-6 text-[#FBBF24]" />
                    ধাপ ২: ব্যক্তিগত তথ্য, ঠিকানা ও কর্মস্থল
                  </h2>

                  {/* Personal Info */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-[#07261B] flex items-center gap-2 border-b border-slate-100 pb-2">
                      <User className="w-4 h-4 text-[#FBBF24]" />
                      ব্যক্তিগত পরিচিতি
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">পূর্ণ নাম (বাংলায়) <span className="text-rose-500">*</span>:</label>
                        <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="উদা: মো. কামরুল হাসান" className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#07261B] outline-none" required />
                      </div>
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">পিতার নাম <span className="text-rose-500">*</span>:</label>
                        <input type="text" name="fatherName" value={formData.fatherName} onChange={handleInputChange} placeholder="পিতার নাম লিখুন" className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#07261B] outline-none" required />
                      </div>
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">মাতার নাম <span className="text-rose-500">*</span>:</label>
                        <input type="text" name="motherName" value={formData.motherName} onChange={handleInputChange} placeholder="মাতার নাম লিখুন" className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#07261B] outline-none" required />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">জন্ম তারিখ <span className="text-rose-500">*</span>:</label>
                        <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#07261B] outline-none bg-white" required />
                      </div>
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">রক্তের গ্রুপ <span className="text-rose-500">*</span>:</label>
                        <select name="bloodGroup" value={formData.bloodGroup} onChange={handleInputChange} className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#07261B] outline-none bg-white">
                          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                            <option key={bg} value={bg}>{bg}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">জাতীয় পরিচয়পত্র নং (NID) <span className="text-rose-500">*</span>:</label>
                        <input type="text" name="nidNo" value={formData.nidNo} onChange={handleInputChange} placeholder="১০ বা ১৭ ডিজিটের NID নম্বর" className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#07261B] outline-none font-mono" required />
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-[#07261B] flex items-center gap-2 border-b border-slate-100 pb-2">
                      <MapPin className="w-4 h-4 text-[#FBBF24]" />
                      স্থায়ী ও বর্তমান ঠিকানা
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">স্থায়ী ইউনিয়ন (কিশোরগঞ্জ) <span className="text-rose-500">*</span>:</label>
                        <select name="permanentUnion" value={formData.permanentUnion} onChange={handleInputChange} className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#07261B] outline-none bg-white font-semibold text-[#07261B]">
                          {NILPHAMARI_KISHOREGANJ_UNIONS.map((u) => (
                            <option key={u} value={u}>{u}</option>
                          ))}
                        </select>
                      </div>
                      <div className="sm:col-span-2">
                        <label className="font-semibold text-slate-700 block mb-1">স্থায়ী গ্রাম / পাড়া <span className="text-rose-500">*</span>:</label>
                        <input type="text" name="permanentVillage" value={formData.permanentVillage} onChange={handleInputChange} placeholder="যেমন: কেশবা / ডাঙ্গাপাড়া" className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#07261B] outline-none" required />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                      <div className="sm:col-span-2">
                        <label className="font-semibold text-slate-700 block mb-1">বর্তমান ঢাকার পূর্ণ ঠিকানা <span className="text-rose-500">*</span>:</label>
                        <input type="text" name="presentDhakaAddress" value={formData.presentDhakaAddress} onChange={handleInputChange} placeholder="বাড়ি নং, রোড নং, এলাকা, থানা, ঢাকা" className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#07261B] outline-none" required />
                      </div>
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">ঢাকার এলাকা (Zone):</label>
                        <input type="text" name="dhakaArea" value={formData.dhakaArea} onChange={handleInputChange} placeholder="উদা: উত্তরা / মিরপুর" className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#07261B] outline-none" />
                      </div>
                    </div>
                  </div>

                  {/* Workplace */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-[#07261B] flex items-center gap-2 border-b border-slate-100 pb-2">
                      <Briefcase className="w-4 h-4 text-[#FBBF24]" />
                      পেশা ও কর্মস্থল
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">পেশা <span className="text-rose-500">*</span>:</label>
                        <input type="text" name="profession" value={formData.profession} onChange={handleInputChange} placeholder="যেমন: চাকরিজীবী / ব্যবসায়ী" className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#07261B] outline-none" required />
                      </div>
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">কর্মস্থলের পদবী:</label>
                        <input type="text" name="workplaceDesignation" value={formData.workplaceDesignation} onChange={handleInputChange} placeholder="যেমন: সিনিয়র অফিসার" className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#07261B] outline-none" />
                      </div>
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">কর্মস্থলের ঠিকানা:</label>
                        <input type="text" name="workplaceAddress" value={formData.workplaceAddress} onChange={handleInputChange} placeholder="প্রতিষ্ঠানের ঠিকানা" className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#07261B] outline-none" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ========== STEP 3: Login Security & Photo ========== */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#07261B] flex items-center gap-2">
                    <Shield className="w-6 h-6 text-[#FBBF24]" />
                    ধাপ ৩: লগইন সিকিউরিটি ও সদস্যের ছবি
                  </h2>

                  {/* Photo Upload */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold text-[#07261B] flex items-center gap-2 border-b border-slate-100 pb-2">
                      <Camera className="w-4 h-4 text-[#FBBF24]" />
                      সদস্যের ছবি আপলোড করুন <span className="text-rose-500">*</span>
                    </h3>
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                      <div className="relative w-32 h-36 rounded-2xl overflow-hidden border-2 border-dashed border-slate-300 bg-slate-50 flex items-center justify-center group cursor-pointer hover:border-[#07261B] transition-all"
                        onClick={() => photoInputRef.current?.click()}
                      >
                        {photoPreview ? (
                          <img src={photoPreview} alt="প্রিভিউ" className="w-full h-full object-cover" />
                        ) : (
                          <div className="flex flex-col items-center justify-center text-slate-400 group-hover:text-[#07261B] transition-all">
                            <Upload className="w-8 h-8 mb-1" />
                            <span className="text-[10px] font-bold">ছবি আপলোড</span>
                          </div>
                        )}
                        <input
                          ref={photoInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
                      </div>
                      <div className="text-xs text-slate-500 space-y-1">
                        <p className="font-bold text-[#07261B]">📸 ছবি আপলোড নির্দেশনা:</p>
                        <ul className="list-disc list-inside space-y-0.5">
                          <li>পাসপোর্ট সাইজের ছবি (সোজা মুখ, পরিষ্কার পটভূমি)</li>
                          <li>ফরম্যাট: JPG, PNG, WEBP</li>
                          <li>সর্বোচ্চ সাইজ: ৫ MB</li>
                          <li>মোবাইল দিয়ে সরাসরি ক্যামেরা ব্যবহার করতে পারবেন</li>
                        </ul>
                        {photoPreview && (
                          <button
                            type="button"
                            onClick={() => { setPhotoPreview(""); setFormData(prev => ({ ...prev, photoUrl: "" })); }}
                            className="text-rose-600 font-bold hover:underline mt-1"
                          >
                            ✕ ছবি মুছুন ও পুনরায় আপলোড
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Login Credentials */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-[#07261B] flex items-center gap-2 border-b border-slate-100 pb-2">
                      <Lock className="w-4 h-4 text-[#FBBF24]" />
                      লগইন তথ্য
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">মোবাইল নম্বর (লগইন আইডি) <span className="text-rose-500">*</span>:</label>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="০১৩৫৩-৭৪৩৫৪৭" className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#07261B] outline-none font-mono" required />
                        <span className="text-[10px] text-slate-400 block mt-0.5">এই নম্বর দিয়েই ভবিষ্যতে পোর্টালে লগইন করতে হবে।</span>
                      </div>
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">ই-মেইল (ঐচ্ছিক):</label>
                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="example@gmail.com" className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#07261B] outline-none" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">পাসওয়ার্ড <span className="text-rose-500">*</span>:</label>
                        <input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="কমপক্ষে ৬ অক্ষর" className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#07261B] outline-none" required />
                      </div>
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">পাসওয়ার্ড নিশ্চিত করুন <span className="text-rose-500">*</span>:</label>
                        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} placeholder="পুনরায় পাসওয়ার্ড লিখুন" className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#07261B] outline-none" required />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ========== STEP 4: Payment ========== */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#07261B] flex items-center gap-2">
                    <CreditCard className="w-6 h-6 text-[#FBBF24]" />
                    ধাপ ৪: ফি প্রদান ও নিবন্ধন সম্পন্ন
                  </h2>

                  {/* Fee Summary */}
                  <div className="bg-emerald-50/70 p-6 rounded-2xl border border-emerald-200/80 text-xs space-y-3">
                    <div className="flex items-center justify-between font-bold text-slate-800 text-sm">
                      <span>নির্ধারিত ফি ({memberType === "lifetime" ? "আজীবন সদস্য" : memberType === "donor" ? "দাতা সদস্য" : "সাধারণ সদস্য"}):</span>
                      <span className="text-xl text-[#07261B]">৳ {getFeeAmount(memberType).toLocaleString("bn-BD")}/-</span>
                    </div>
                    <p className="text-slate-600">
                      সমিতির অফিশিয়াল বিকাশ/নগদ/রকেট নম্বরে (<strong>{settings.bkashNumber || settings.contactPhone}</strong>) সেন্ড মানি বা পেমেন্ট করে প্রাপ্ত TrxID নিচে লিখুন।
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">পেমেন্ট মেথড:</label>
                      <select name="paymentMethod" value={formData.paymentMethod} onChange={handleInputChange} className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#07261B] outline-none bg-white font-semibold">
                        <option value="bkash">বিকাশ (bKash)</option>
                        <option value="nagad">নগদ (Nagad)</option>
                        <option value="rocket">রকেট (Rocket)</option>
                        <option value="bank">ব্যাংক একাউন্ট</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">পেমেন্ট TrxID <span className="text-rose-500">*</span>:</label>
                      <input type="text" name="trxId" value={formData.trxId} onChange={handleInputChange} placeholder="উদা: BKSH89201934" className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#07261B] outline-none font-mono uppercase font-bold text-rose-700" required />
                    </div>
                  </div>

                  {/* Summary Card */}
                  <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-2 text-xs">
                    <h4 className="font-bold text-[#07261B] text-sm mb-2">📋 আপনার তথ্যের সংক্ষিপ্ত বিবরণ:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex justify-between"><span className="text-slate-500">নাম:</span><strong>{formData.fullName || "—"}</strong></div>
                      <div className="flex justify-between"><span className="text-slate-500">মোবাইল:</span><strong className="font-mono">{formData.phone || "—"}</strong></div>
                      <div className="flex justify-between"><span className="text-slate-500">ইউনিয়ন:</span><strong>{formData.permanentUnion}</strong></div>
                      <div className="flex justify-between"><span className="text-slate-500">রক্তের গ্রুপ:</span><strong className="text-rose-600">{formData.bloodGroup}</strong></div>
                      <div className="flex justify-between"><span className="text-slate-500">পেশা:</span><strong>{formData.profession || "—"}</strong></div>
                      <div className="flex justify-between"><span className="text-slate-500">সদস্যের ধরন:</span><strong>{memberType === "lifetime" ? "আজীবন" : memberType === "donor" ? "দাতা" : "সাধারণ"}</strong></div>
                    </div>
                    {photoPreview && (
                      <div className="mt-2 flex items-center gap-3">
                        <img src={photoPreview} alt="ছবি" className="w-12 h-14 rounded-lg object-cover border border-slate-200" />
                        <span className="text-emerald-600 font-bold text-[11px]">✓ ছবি আপলোড সম্পন্ন</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="pt-6 flex items-center justify-between gap-4 border-t border-slate-100 mt-8">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={goPrev}
                    className="px-6 py-3 rounded-full text-xs sm:text-sm font-semibold border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 transition-all flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>পূর্ববর্তী ধাপ</span>
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={goNext}
                    className="px-8 py-3 rounded-full text-xs sm:text-sm font-bold bg-[#07261B] text-[#FBBF24] hover:bg-[#0c402e] shadow-md transition-all flex items-center gap-2 active:scale-95"
                  >
                    <span>পরবর্তী ধাপ</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="px-8 py-3 rounded-full text-xs sm:text-sm font-bold bg-[#07261B] text-[#FBBF24] hover:bg-[#0c402e] shadow-md transition-all flex items-center gap-2 active:scale-95"
                  >
                    <span>নিবন্ধন সম্পন্ন করুন (Submit)</span>
                    <CheckCircle className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
