"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSiteStore } from "@/lib/siteStore";
import {
  Calendar,
  MapPin,
  Clock,
  Sparkles,
  Award,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowRight,
  Images,
} from "lucide-react";

export default function ActivitiesPage() {
  const { events } = useSiteStore();
  const [filterStatus, setFilterStatus] = useState<"all" | "upcoming" | "completed" | "cancelled">("all");

  const filteredEvents = events.filter(
    (ev) => filterStatus === "all" || ev.status === filterStatus
  );

  return (
    <div className="min-h-screen pt-28 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-[#FDFBF7] font-bangla">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-[#07261B] text-xs font-bold mb-3 shadow-xs">
            <Calendar className="w-3.5 h-3.5 text-[#FBBF24]" />
            বাৎসরিক ইভেন্ট ও কার্যক্রম
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#07261B]">
            সমিতির অনুষ্ঠান ও বাৎসরিক আয়োজন ক্যালেন্ডার
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-2">
            ঢাকাস্থ কিশোরগঞ্জ উপজেলা সমিতির ১ বছরের সকল কাজকর্ম, পারিবারিক মিলনমেলা, শিক্ষা বৃত্তি ও ভবিষ্যৎ কর্মসূচির বিবরণ।
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {[
            { id: "all", label: `সকল কার্যক্রম (${events.length})` },
            { id: "upcoming", label: `ভবিষ্যৎ আয়োজন (${events.filter((e) => e.status === "upcoming").length})` },
            { id: "completed", label: `সম্পন্ন কার্যক্রম (${events.filter((e) => e.status === "completed").length})` },
            { id: "cancelled", label: `বাতিলকৃত (${events.filter((e) => e.status === "cancelled").length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id as any)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                filterStatus === tab.id
                  ? "bg-[#07261B] text-[#FBBF24] shadow-md ring-2 ring-emerald-500/30"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Events Timeline List */}
        <div className="space-y-6">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className={`bg-white rounded-3xl p-6 sm:p-8 border transition-all hover:shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6 ${
                event.status === "completed"
                  ? "border-emerald-200/90"
                  : event.status === "cancelled"
                  ? "border-rose-200/90 bg-rose-50/15"
                  : "border-sky-300 shadow-md ring-1 ring-sky-200"
              }`}
            >
              <div className="space-y-3 flex-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                      event.status === "completed"
                        ? "bg-emerald-100 text-emerald-800"
                        : event.status === "cancelled"
                        ? "bg-rose-100 text-rose-800"
                        : "bg-sky-100 text-sky-800 animate-pulse"
                    }`}
                  >
                    {event.status === "completed" ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        সফলভাবে সম্পন্ন (Completed)
                      </>
                    ) : event.status === "cancelled" ? (
                      <>
                        <XCircle className="w-3.5 h-3.5 text-rose-600" />
                        বাতিল (Cancelled)
                      </>
                    ) : (
                      <>
                        <Clock className="w-3.5 h-3.5 text-[#00A3E0]" />
                        আসন্ন আয়োজন (Upcoming)
                      </>
                    )}
                  </span>

                  <span className="text-xs text-slate-400 font-semibold">• {event.year}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#07261B]">
                  {event.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
                  {event.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 pt-2 border-t border-slate-100">
                  <span className="flex items-center gap-1.5 text-emerald-800">
                    <Calendar className="w-4 h-4 text-[#FBBF24]" />
                    {event.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-slate-400" />
                    {event.time}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    {event.venue}
                  </span>
                </div>
              </div>

              <div className="shrink-0 flex flex-col gap-2 w-full md:w-auto">
                {event.status === "completed" && (
                  <Link
                    href="/gallery"
                    className="px-5 py-2.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Images className="w-4 h-4 text-[#07261B]" />
                    <span>ইভেন্টের ছবি দেখুন</span>
                  </Link>
                )}
                {event.status === "upcoming" && (
                  <Link
                    href="/register"
                    className="px-6 py-2.5 rounded-full text-xs font-bold bg-[#07261B] text-[#FBBF24] hover:bg-[#0c402e] shadow-md transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>যুক্ত হোন / নিবন্ধন করুন</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
