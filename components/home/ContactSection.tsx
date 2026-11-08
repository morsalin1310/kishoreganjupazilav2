"use client";

import { useSiteStore } from "@/lib/siteStore";

export default function ContactSection() {
  const { settings } = useSiteStore();

  return (
    <section className="section contact py-16 sm:py-20 bg-[#f7f5ec] font-bangla scroll-mt-28" id="contact">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Head matching demo project */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-[#648c48]/15 text-[#133f2b] font-bold text-xs sm:text-sm mb-3">
            যোগাযোগ
          </span>
          <h2 className="font-serifBangla text-3xl sm:text-4xl lg:text-5xl font-normal text-[#0c2f21]">
            আমাদের সাথে যোগাযোগ করুন
          </h2>
        </div>

        {/* 3 Contact Cards Grid matching demo project */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 1. Office Location */}
          <a
            className="group flex flex-col items-center text-center p-8 rounded-3xl bg-white shadow-[0_10px_30px_rgba(12,47,33,0.08)] hover:shadow-[0_20px_50px_rgba(12,47,33,0.16)] border border-[#0c2f21]/[0.06] transition-all duration-350 hover:-translate-y-1.5"
            href="https://www.google.com/maps/search/?api=1&query=House+16,+Road+3%2F1,+Block+A,+Sector+16,+Uttara,+Dhaka+1230"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#648c48]/15 text-[#648c48] flex items-center justify-center transition-transform duration-400 ease-out group-hover:-rotate-8 group-hover:scale-110 mb-4">
              <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 14.5 9 2.5 2.5 0 0 1 12 11.5Z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[#0c2f21] mb-1.5">অস্থায়ী কার্যালয়</h3>
            <p className="text-[#5f6b58] text-sm leading-relaxed">
              {settings.contactAddress}
            </p>
          </a>

          {/* 2. Official Mobile */}
          <a
            className="group flex flex-col items-center text-center p-8 rounded-3xl bg-white shadow-[0_10px_30px_rgba(12,47,33,0.08)] hover:shadow-[0_20px_50px_rgba(12,47,33,0.16)] border border-[#0c2f21]/[0.06] transition-all duration-350 hover:-translate-y-1.5"
            href={`tel:${settings.contactPhone}`}
          >
            <div className="w-14 h-14 rounded-2xl bg-[#e82127]/15 text-[#e82127] flex items-center justify-center transition-transform duration-400 ease-out group-hover:-rotate-8 group-hover:scale-110 mb-4">
              <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .57 3.6 1 1 0 0 1-.25 1Z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[#0c2f21] mb-1.5">মোবাইল</h3>
            <p className="text-xl sm:text-2xl font-bold text-[#e82127] tracking-wider font-mono">
              {settings.contactPhone}
            </p>
          </a>

          {/* 3. Official Email */}
          <a
            className="group flex flex-col items-center text-center p-8 rounded-3xl bg-white shadow-[0_10px_30px_rgba(12,47,33,0.08)] hover:shadow-[0_20px_50px_rgba(12,47,33,0.16)] border border-[#0c2f21]/[0.06] transition-all duration-350 hover:-translate-y-1.5"
            href={`mailto:${settings.contactEmail}`}
          >
            <div className="w-14 h-14 rounded-2xl bg-[#17b0e2]/15 text-[#0b8fbd] flex items-center justify-center transition-transform duration-400 ease-out group-hover:-rotate-8 group-hover:scale-110 mb-4">
              <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm0 4v10h16V8l-8 5Zm0-2 8 5 8-5Z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[#0c2f21] mb-1.5">ইমেইল</h3>
            <p className="text-sm sm:text-base font-semibold text-[#0b8fbd] break-all">
              {settings.contactEmail}
            </p>
          </a>
        </div>
      </div>
    </section>
  );
}
