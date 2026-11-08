"use client";

import { useState } from "react";
import { useSiteStore } from "@/lib/siteStore";
import { FileText, Calendar, Bell, Pin, Download, Search } from "lucide-react";

export default function NoticesPage() {
  const { notices } = useSiteStore();
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = notices.filter(
    (n) =>
      n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-28 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-[#FDFBF7] font-bangla">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-3">
            <Bell className="w-3.5 h-3.5 text-amber-600" />
            দাপ্তরিক ঘোষণা ও নোটিশ
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0B3B2C]">
            কিশোরগঞ্জ উপজেলা সমিতি নোটিশ বোর্ড
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-2">
            কার্যনির্বাহী পরিষদের সভা, বার্ষিক মিলনমেলা, দাপ্তরিক আদেশ ও জরুরি নির্দেশনাসমূহ।
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="নোটিশ খুঁজুন..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 bg-white text-xs sm:text-sm focus:border-[#0B3B2C] outline-none shadow-xs"
          />
        </div>

        {/* Notice List */}
        <div className="space-y-4">
          {filtered.map((notice) => (
            <div
              key={notice.id}
              className={`bg-white rounded-3xl p-6 sm:p-8 border shadow-xs transition-all hover:shadow-md ${
                notice.is_pinned ? "border-amber-300 ring-2 ring-amber-100" : "border-slate-200/80"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  {notice.is_pinned && (
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold flex items-center gap-1">
                      <Pin className="w-3 h-3 fill-amber-700 text-amber-700" />
                      জরুরি বিজ্ঞপ্তি
                    </span>
                  )}
                  <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {notice.published_date}
                  </span>
                </div>

                <button
                  onClick={() => window.print()}
                  className="text-xs text-[#00A3E0] hover:underline flex items-center gap-1 font-semibold"
                >
                  <Download className="w-3.5 h-3.5" />
                  পিডিএফ সেভ
                </button>
              </div>

              <h2 className="text-base sm:text-lg font-bold text-slate-800 mb-2 leading-snug">
                {notice.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {notice.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
