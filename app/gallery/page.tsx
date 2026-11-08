"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSiteStore } from "@/lib/siteStore";
import {
  Images,
  Video,
  Calendar,
  Sparkles,
  ExternalLink,
  Play,
  Layers,
  Filter,
} from "lucide-react";

export default function GalleryPage() {
  const { gallery } = useSiteStore();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeVideoModal, setActiveVideoModal] = useState<string | null>(null);

  const categories = [
    "all",
    "মিলনমেলা",
    "শিক্ষা",
    "বনভোজন",
    "ব্লাড ব্যাংক",
    "সভা",
    "ঐতিহ্য",
  ];

  const filteredItems = gallery.filter(
    (item) => selectedCategory === "all" || item.category === selectedCategory
  );

  return (
    <div className="min-h-screen pt-28 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-[#FDFBF7] font-bangla">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-[#07261B] text-xs font-bold mb-3 shadow-xs">
            <Images className="w-3.5 h-3.5 text-[#FBBF24]" />
            ফটো ও ভিডিও আর্কাইভ
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#07261B]">
            কিশোরগঞ্জ উপজেলা সমিতি ফটো গ্যালারি ও মিডিয়া কর্নার
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-2">
            অতীতে সম্পন্ন হওয়া বিভিন্ন অনুষ্ঠান, পারিবারিক মিলনমেলা, বনভোজন ও কিশোরগঞ্জের মনোমুগ্ধকর ভিডিওর রঙিন স্মৃতিশালা।
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                selectedCategory === cat
                  ? "bg-[#07261B] text-[#FBBF24] shadow-md ring-2 ring-emerald-500/30"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {cat === "all" ? "সকল ছবি ও ভিডিও" : cat}
            </button>
          ))}
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                {item.video_url && (
                  <button
                    onClick={() => setActiveVideoModal(item.video_url || null)}
                    className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-all cursor-pointer backdrop-blur-xs"
                    title="ভিডিও প্লে করুন"
                  >
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </button>
                )}

                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#07261B]/90 text-[#FBBF24] backdrop-blur-sm shadow-xs">
                    {item.category}
                  </span>
                  <span className="px-2 py-1 rounded-full text-[10px] font-semibold bg-white/90 text-slate-800 backdrop-blur-sm shadow-xs">
                    {item.event_year}
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-2">
                <h3 className="font-bold text-base text-slate-800 group-hover:text-[#07261B] transition-colors line-clamp-2">
                  {item.title}
                </h3>
                {item.caption && (
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {item.caption}
                  </p>
                )}
                <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span>তারিখ: {item.date || item.event_year}</span>
                  {item.video_url && (
                    <span className="text-rose-600 font-bold flex items-center gap-1">
                      <Video className="w-3 h-3" /> ভিডিও ক্লিপ
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video Player Modal */}
        {activeVideoModal && (
          <div className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4">
            <div className="bg-black rounded-3xl max-w-2xl w-full p-4 relative shadow-2xl">
              <button
                onClick={() => setActiveVideoModal(null)}
                className="absolute -top-10 right-0 text-white hover:text-[#FBBF24] text-sm font-bold flex items-center gap-1"
              >
                বন্ধ করুন ✕
              </button>
              <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 flex items-center justify-center">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${activeVideoModal.split("v=")[1] || "dQw4w9WgXcQ"}?autoplay=1`}
                  title="কিশোরগঞ্জ ঐতিহ্যবাহী ভিডিও"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
