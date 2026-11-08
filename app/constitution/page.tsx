"use client";

import { useState } from "react";
import { useSiteStore } from "@/lib/siteStore";
import { BookOpen, Download, Search, ChevronDown, ChevronUp, FileText, CheckCircle2, ExternalLink } from "lucide-react";

export default function ConstitutionPage() {
  const { clauses, settings } = useSiteStore();
  const [openClause, setOpenClause] = useState<number | null>(0);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredClauses = clauses.filter(
    (c) =>
      c.clause.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-28 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-[#FDFBF7] font-bangla">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-[#07261B] text-xs font-bold mb-3">
            <BookOpen className="w-3.5 h-3.5 text-[#FBBF24]" />
            গঠনতন্ত্র ও বিধিমালা
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#07261B]">
            কিশোরগঞ্জ উপজেলা সমিতি — পূর্ণাঙ্গ গঠনতন্ত্র
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-2 max-w-xl mx-auto">
            সমিতির আদর্শ, সদস্যপদের নিয়মাবলী, অধিকার, নির্বাচন ও সাংগঠনিক তহবিল পরিচালনার ১ থেকে {clauses.length}টি ধারা।
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href={settings.constitutionPdfUrl || "/docs/kusd_constitution_2026.pdf"}
              download="kusd_constitution_2026.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold bg-[#07261B] text-[#FBBF24] hover:bg-[#0c402e] shadow-md transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-[#FBBF24]" />
              সম্পূর্ণ গঠনতন্ত্র (PDF) ডাউনলোড
            </a>
            <button
              onClick={() => window.print()}
              className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold border border-slate-300 text-slate-700 hover:bg-slate-100 flex items-center gap-1.5"
            >
              প্রিন্ট করুন
            </button>
          </div>
        </div>

        {/* Search Filter */}
        <div className="relative mb-8">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="ধারা নম্বর বা বিষয় দিয়ে গঠনতন্ত্রে খুঁজুন (উদা: চাঁদা, নির্বাচন, সদস্যপদ)..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 bg-white text-xs sm:text-sm focus:border-[#07261B] shadow-xs outline-none"
          />
        </div>

        {/* Clauses Accordion */}
        <div className="space-y-3">
          {filteredClauses.map((item, index) => {
            const isOpen = openClause === index;
            return (
              <div
                key={item.id || index}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => setOpenClause(isOpen ? null : index)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-slate-50/80 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-[#07261B] font-bold text-xs sm:text-sm font-mono border border-emerald-200 shrink-0">
                      {item.clause}
                    </span>
                    <h3 className="font-bold text-sm sm:text-base text-slate-800">
                      {item.title}
                    </h3>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#07261B] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-6 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100">
                    <p className="bg-slate-50/70 p-4 rounded-xl border border-slate-100">
                      {item.content}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
