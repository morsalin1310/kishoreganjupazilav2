"use client";

import Link from "next/link";
import {
  Users,
  Newspaper,
  CalendarDays,
  Images,
  Droplet,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    title: "সদস্য নিবন্ধন",
    subtitle: "৯টি ইউনিয়নের জন্য উন্মুক্ত",
    description: "অনলাইনে সহজেই সমিতির সদস্য হওয়ার সুযোগ ও ডিজিটাল স্মার্ট আইডি কার্ড লাভ।",
    href: "/register",
    icon: (
      <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M16 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm-8 0a3 3 0 1 0-3-3 3 3 0 0 0 3 3Zm0 2c-2.7 0-6 1.3-6 3.5V19h6v-2.5c0-1.2.5-2.3 1.4-3.1A9 9 0 0 0 8 13Zm8 0c-3 0-7 1.5-7 4v2h14v-2c0-2.5-4-4-7-4Z"></path>
      </svg>
    ),
    colorClass: "ic-green",
  },
  {
    title: "সংবাদ ও নোটিশ",
    subtitle: "সমিতির সর্বশেষ আদেশ",
    description: "সমিতির সর্বশেষ খবর, ঘোষণা ও গুরুত্বপূর্ণ অফিশিয়াল বিজ্ঞপ্তি।",
    href: "/notices",
    icon: (
      <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 4h13a2 2 0 0 1 2 2v1h1a2 2 0 0 1 2 2v9a3 3 0 0 1-3 3H6a4 4 0 0 1-4-4V6a2 2 0 0 1 2-2Zm15 5v9a1 1 0 0 0 2 0V9ZM6 8v4h5V8Zm7 0v1.5h4V8Zm0 3v1.5h4V11ZM6 14v1.5h11V14Z"></path>
      </svg>
    ),
    colorClass: "ic-yellow",
  },
  {
    title: "অনুষ্ঠান ও আয়োজন",
    subtitle: "পারিবারিক মিলনমেলা",
    description: "মিলনমেলা, সাংস্কৃতিক ও সামাজিক কর্মসূচির সময়সূচি ও ইভেন্ট ক্যালেন্ডার।",
    href: "/activities",
    icon: (
      <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 2v2H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2Zm-2 8h14v9H5Zm2 2v2h2v-2Zm4 0v2h2v-2Zm4 0v2h2v-2Z"></path>
      </svg>
    ),
    colorClass: "ic-red",
  },
  {
    title: "ফটো গ্যালারি",
    subtitle: "স্মরণীয় চিত্রগাথা",
    description: "আমাদের সকল ঐতিহাসিক আয়োজনের স্মরণীয় মুহূর্তগুলোর ছবি ও ভিডিও আর্কাইভ।",
    href: "/gallery",
    icon: (
      <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Zm2 0v10.6l3.5-3.5 2.5 2.5 4-4 2 2V5Zm3.5 1.5a2 2 0 1 1-2 2 2 2 0 0 1 2-2Z"></path>
      </svg>
    ),
    colorClass: "ic-blue",
  },
  {
    title: "কিশোরগঞ্জ ব্লাড ব্যাংক",
    subtitle: "ঢাকায় জরুরি রক্তের সেবা",
    description: "রক্তের গ্রুপ ও ৯টি ইউনিয়নভিত্তিক ঢাকার ডোনার তালিকা থেকে জরুরি মুহূর্তে সরাসরি কল।",
    href: "/blood-bank",
    icon: <Droplet className="w-7 h-7 fill-current" />,
    colorClass: "ic-red",
  },
  {
    title: "কল্যাণ তহবিল ও বৃত্তি",
    subtitle: "মানবিক সহায়তা",
    description: "অসহায় ও মেধাবী ছাত্র-ছাত্রীদের শিক্ষা উপবৃত্তি ও অসুস্থদের জরুরি চিকিৎসা অনুদান।",
    href: "/welfare",
    icon: <HeartHandshake className="w-7 h-7" />,
    colorClass: "ic-green",
  },
];

export default function FeaturedServices() {
  return (
    <section
      id="features"
      className="py-20 sm:py-24 relative font-bangla"
      style={{
        background:
          "radial-gradient(circle at 10% 10%, rgba(251,207,14,.12), transparent 40%), radial-gradient(circle at 90% 90%, rgba(23,176,226,.10), transparent 40%), #f7f5ec",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Head matching demo project */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block px-4 py-1 rounded-full bg-[#648c48]/15 text-[#133f2b] font-bold text-xs sm:text-sm mb-3">
            যা থাকছে
          </span>
          <h2 className="font-serifBangla text-3xl sm:text-4xl lg:text-5xl font-normal text-[#0c2f21] mb-3">
            নতুন ওয়েবসাইটে আপনার জন্য
          </h2>
          <p className="text-[#5f6b58] text-sm sm:text-base">
            সমিতির সকল কার্যক্রম, খবর ও সদস্যদের তথ্য এক জায়গায়।
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, index) => {
            return (
              <Link
                key={index}
                href={item.href}
                className="group relative bg-white rounded-3xl p-7 shadow-[0_10px_30px_rgba(12,47,33,0.08)] hover:shadow-[0_20px_50px_rgba(12,47,33,0.16)] border border-[#0c2f21]/[0.06] transition-all duration-350 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Card Icon */}
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-400 ease-out group-hover:-rotate-8 group-hover:scale-110 mb-4 ${
                      item.colorClass === "ic-green"
                        ? "bg-[#648c48]/15 text-[#648c48]"
                        : item.colorClass === "ic-yellow"
                        ? "bg-[#fbcf0e]/25 text-[#b38f00]"
                        : item.colorClass === "ic-red"
                        ? "bg-[#e82127]/15 text-[#e82127]"
                        : "bg-[#17b0e2]/15 text-[#0b8fbd]"
                    }`}
                  >
                    {item.icon}
                  </div>

                  {/* Card Title */}
                  <h3 className="text-xl font-bold text-[#0c2f21] mb-1.5 group-hover:text-[#648c48] transition-colors">
                    {item.title}
                  </h3>

                  {/* Card Description */}
                  <p className="text-[#5f6b58] text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center text-xs font-bold text-[#648c48] group-hover:translate-x-1 transition-transform gap-1">
                  <span>বিস্তারিত দেখুন</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>

                {/* Bottom Animated Rainbow Bar from demo project */}
                <div
                  className="absolute left-0 right-0 bottom-0 h-1 bg-gradient-to-r from-[#648c48] via-[#fbcf0e] to-[#17b0e2] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left"
                ></div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
