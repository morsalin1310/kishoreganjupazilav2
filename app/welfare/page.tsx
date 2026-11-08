"use client";

import { useState } from "react";
import { NILPHAMARI_KISHOREGANJ_UNIONS, KishoreganjUnion } from "@/lib/types";
import { useSiteStore } from "@/lib/siteStore";
import { HeartHandshake, GraduationCap, HeartPulse, ShieldAlert, CheckCircle, Search, ArrowRight, Compass } from "lucide-react";

export default function WelfarePage() {
  const { welfareApplications, addWelfareApplication } = useSiteStore();
  const [trackingId, setTrackingId] = useState("");
  const [trackedStatus, setTrackedStatus] = useState<string | null>(null);

  // Application form state
  const [applicant, setApplicant] = useState({
    name: "",
    phone: "",
    category: "education",
    union: "কিশোরগঞ্জ সদর" as KishoreganjUnion,
    village: "",
    amount: "",
    details: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState("");

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `WLF-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setApplicationId(id);
    addWelfareApplication({
      id,
      applicant_name: applicant.name,
      phone: applicant.phone,
      union: applicant.union,
      village: applicant.village,
      category: applicant.category as any,
      amount_requested: Number(applicant.amount) || 0,
      description: applicant.details,
      status: "submitted",
      created_at: new Date().toISOString().slice(0, 10),
    });
    setSubmitted(true);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) return;
    const found = welfareApplications.find(
      (w) => w.id.toLowerCase() === trackingId.trim().toLowerCase()
    );
    if (found) {
      const statusText =
        found.status === "approved"
          ? "আপনার আবেদনটি অনুমোদিত হয়েছে (Approved)। শীঘ্রই অনুদান প্রদান করা হবে।"
          : found.status === "disbursed"
          ? "আপনার আবেদনের অনুদান সফলভাবে বিতরণ করা হয়েছে (Disbursed)।"
          : found.status === "under_review"
          ? "আপনার আবেদনটি কার্যনির্বাহী পরিষদের পর্যালোচনাধীন রয়েছে (Under Review)।"
          : "আপনার আবেদনটি সফলভাবে জমা হয়েছে (Submitted)। শীঘ্রই পর্যালোচনা সম্পন্ন হবে।";
      setTrackedStatus(`আবেদনকারী: ${found.applicant_name} | স্থিতি: ${statusText}`);
    } else {
      setTrackedStatus("দুঃখিত, এই আইডি দিয়ে কোনো আবেদন পাওয়া যায়নি। সঠিক আইডি দিন।");
    }
  };

  return (
    <div className="min-h-screen pt-28 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-[#FDFBF7] font-bangla">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Banner */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-[#0B3B2C] text-xs font-bold mb-3">
            <HeartHandshake className="w-3.5 h-3.5 text-[#FBBF24]" />
            কল্যাণ তহবিল ও সামাজিক সুরক্ষা
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B3B2C] mb-3">
            কিশোরগঞ্জ সমিতি মানবকল্যাণ তহবিল (নীলফামারী)
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            নীলফামারীর কিশোরগঞ্জ উপজেলার ৯টি ইউনিয়নের অসহায়, অসচ্ছল ও মেধাবী ছাত্র-ছাত্রীদের পড়াশোনা এবং অসুস্থ মানুষের জরুরি চিকিৎসা সেবায় আমাদের নিরন্তর পাশে থাকা।
          </p>
        </div>

        {/* 3 Welfare Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">মেধা বৃত্তি ও শিক্ষা</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              উচ্চশিক্ষারত গরীব ও মেধাবী ছাত্র-ছাত্রীদের এককালীন ভর্তি ফি ও মাসিক শিক্ষা উপবৃত্তি প্রদান।
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
              <HeartPulse className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">জরুরি চিকিৎসা অনুদান</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              মারাত্মক ব্যাধি বা অস্ত্রোপচারের ক্ষেত্রে অসহায় রোগী ও পরিবারের পাশে দাঁড়াতে জরুরি আর্থিক অনুদান।
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mb-4">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">আপৎকালীন সাহায্য</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              প্রাকৃতিক দুর্যোগ, বন্যা বা দুর্ঘটনায় ক্ষতিগ্রস্ত কিশোরগঞ্জ উপজেলাবাসীর পুনর্বাসনে তাৎক্ষণিক ত্রাণ।
            </p>
          </div>
        </div>

        {/* Status Tracker */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <h3 className="text-base font-bold text-[#0B3B2C] mb-2 flex items-center gap-2">
            <Search className="w-4 h-4 text-[#00A3E0]" />
            আবেদনের বর্তমান অবস্থা যাচাই করুন
          </h3>
          <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              placeholder="আবেদন আইডি লিখুন (উদা: WLF-2026-1042)..."
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-[#0B3B2C] outline-none"
            />
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-[#0B3B2C] text-[#FBBF24] hover:bg-[#145A43] shadow-md transition-all shrink-0"
            >
              ট্র্যাক করুন
            </button>
          </form>

          {trackedStatus && (
            <div className="mt-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-medium">
              {trackedStatus}
            </div>
          )}
        </div>

        {/* Application Form */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-md">
          {submitted ? (
            <div className="text-center py-6">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[#0B3B2C] mb-1">
                আবেদন সফলভাবে গ্রহণ করা হয়েছে!
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                আপনার ট্র্যাকিং আইডি: <strong className="font-mono text-slate-800 text-sm">{applicationId}</strong>
              </p>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                কল্যাণ উপ-কমিটি আপনার প্রদত্ত তথ্য যাচাই করে দ্রুত সিদ্ধান্ত জানাবে। প্রয়োজনে এই আইডি দিয়ে স্ট্যাটাস চেক করতে পারবেন।
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmitApplication} className="space-y-4">
              <div className="border-b pb-3 mb-4">
                <h3 className="text-lg font-bold text-[#0B3B2C]">
                  কল্যাণ তহবিলের জন্য অনলাইন আবেদন ফরম
                </h3>
                <p className="text-xs text-slate-500">
                  সঠিক ও সত্য তথ্য দিয়ে ফর্মটি পূরণ করুন।
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    আবেদনকারীর নাম *
                  </label>
                  <input
                    type="text"
                    required
                    value={applicant.name}
                    onChange={(e) => setApplicant({ ...applicant, name: e.target.value })}
                    placeholder="পূর্ণ নাম"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-[#0B3B2C] outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    মোবাইল নম্বর *
                  </label>
                  <input
                    type="tel"
                    required
                    value={applicant.phone}
                    onChange={(e) => setApplicant({ ...applicant, phone: e.target.value })}
                    placeholder="০১৭১১-XXXXXX"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-[#0B3B2C] outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    সহায়তার ক্যাটাগরি *
                  </label>
                  <select
                    value={applicant.category}
                    onChange={(e) => setApplicant({ ...applicant, category: e.target.value as any })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-[#0B3B2C] outline-none bg-white font-medium"
                  >
                    <option value="education">মেধা বৃত্তি / শিক্ষা সহায়তা</option>
                    <option value="treatment">জরুরি চিকিৎসা অনুদান</option>
                    <option value="emergency">প্রাকৃতিক দুর্যোগ / আপৎকালীন সাহায্য</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    কিশোরগঞ্জের ইউনিয়ন *
                  </label>
                  <select
                    value={applicant.union}
                    onChange={(e) => setApplicant({ ...applicant, union: e.target.value as KishoreganjUnion })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-[#0B3B2C] outline-none bg-white font-semibold text-[#0B3B2C]"
                  >
                    {NILPHAMARI_KISHOREGANJ_UNIONS.map((u) => (
                      <option key={u} value={u}>
                        {u} ইউনিয়ন
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    মূল গ্রাম / পাড়ার নাম *
                  </label>
                  <input
                    type="text"
                    required
                    value={applicant.village}
                    onChange={(e) => setApplicant({ ...applicant, village: e.target.value })}
                    placeholder="গ্রামের নাম"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-[#0B3B2C] outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    প্রয়োজনীয় আর্থিক সহায়তার পরিমাণ (টাকায়) *
                  </label>
                  <input
                    type="number"
                    required
                    value={applicant.amount}
                    onChange={(e) => setApplicant({ ...applicant, amount: e.target.value })}
                    placeholder="উদা: ১৫০০০"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-[#0B3B2C] outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    আবেদনের বিস্তারিত কারণ ও বর্তমান পরিস্থিতি *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={applicant.details}
                    onChange={(e) => setApplicant({ ...applicant, details: e.target.value })}
                    placeholder="আপনার অবস্থা বিস্তারিত তুলে ধরুন..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-[#0B3B2C] outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t">
                <button
                  type="submit"
                  className="px-8 py-3 rounded-full font-bold text-xs sm:text-sm bg-[#0B3B2C] text-[#FBBF24] hover:bg-[#145A43] shadow-md transition-all flex items-center gap-2"
                >
                  <span>আবেদন জমা দিন</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
