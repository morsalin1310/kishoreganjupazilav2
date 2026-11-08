"use client";

import { useState } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [msg, setMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setMsg("সঠিক ইমেইল ঠিকানা দিন।");
      return;
    }

    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setMsg("ধন্যবাদ! নতুন আপডেট প্রকাশিত হলে আপনাকে ইমেইলে জানিয়ে দেওয়া হবে।");
      setEmail("");
    }, 600);
  };

  return (
    <section className="section notify pt-4 pb-16 bg-[#f7f5ec] font-bangla" id="notify">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div
          className="notify-box relative overflow-hidden text-center py-12 px-6 sm:px-10 rounded-[28px] text-white shadow-[0_20px_50px_rgba(12,47,33,0.18)]"
          style={{
            background: `radial-gradient(circle at 85% 15%, rgba(232,33,39,.55) 0 60px, transparent 61px),
                         radial-gradient(circle at 85% 15%, rgba(251,207,14,.25) 0 110px, transparent 111px),
                         linear-gradient(135deg, #133f2b, #0c2f21)`,
          }}
        >
          {/* Decorative Wave SVG from demo project */}
          <svg
            className="notify-deco absolute -left-2.5 bottom-2.5 w-52 text-[#17b0e2] opacity-45 pointer-events-none"
            viewBox="0 0 200 60"
            aria-hidden="true"
          >
            <path
              d="M0 40 q25 -20 50 0 t50 0 t50 0 t50 0"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            ></path>
          </svg>

          {/* Heading */}
          <h2 className="font-serifBangla text-2xl sm:text-3xl md:text-4xl font-normal relative z-10 mb-2">
            প্রকাশের সাথে সাথেই জানুন
          </h2>

          <p className="text-white/85 text-xs sm:text-sm md:text-base relative z-10 mb-6 max-w-xl mx-auto">
            আপনার ইমেইল দিন — সমিতির সকল নতুন আপডেট ও খবরাখবর আমরা আপনাকে জানিয়ে দেব।
          </p>

          {/* Pill Input Form from demo project */}
          <form
            onSubmit={handleSubmit}
            className="notify-form relative flex flex-col sm:flex-row gap-2.5 max-w-lg mx-auto bg-white/10 p-2 rounded-2xl sm:rounded-full border border-white/25 z-10"
          >
            <label className="sr-only" htmlFor="email-input">
              ইমেইল ঠিকানা
            </label>
            <input
              type="email"
              id="email-input"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status !== "idle") setStatus("idle");
              }}
              placeholder="আপনার ইমেইল ঠিকানা লিখুন"
              autoComplete="email"
              required
              className="flex-1 min-w-0 border-0 bg-transparent text-white placeholder-white/65 text-sm sm:text-base px-4 py-2.5 focus:outline-none"
            />

            <button
              type="submit"
              disabled={status === "loading"}
              className="demo-btn-primary min-h-[46px] px-7 rounded-full font-bold text-sm sm:text-base whitespace-nowrap cursor-pointer hover:scale-105 active:scale-95 transition-transform"
            >
              {status === "loading" ? "অপেক্ষা করুন..." : "যুক্ত হোন"}
            </button>
          </form>

          {/* Status Message */}
          {status !== "idle" && (
            <p
              className={`mt-3.5 text-xs sm:text-sm font-semibold relative z-10 ${
                status === "success" ? "text-emerald-300" : "text-rose-300"
              }`}
            >
              {msg}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
