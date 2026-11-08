"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSiteStore } from "@/lib/siteStore";
import {
  LogIn,
  Phone,
  KeyRound,
  ShieldCheck,
  ArrowRight,
  AlertCircle,
  Clock,
  Ban,
  CheckCircle,
  HelpCircle,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { loginMember } = useSiteStore();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<{
    type: "pending" | "blocked" | "invalid" | null;
    text: string;
  }>({ type: null, text: "" });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg({ type: null, text: "" });

    setTimeout(() => {
      const res = loginMember(phone.trim(), password.trim());
      setLoading(false);

      if (res.success && res.user) {
        router.push("/dashboard");
      } else if (res.status === "pending") {
        setErrorMsg({
          type: "pending",
          text:
            res.message ||
            "আপনার আবেদনটি বর্তমানে অপেক্ষমাণ (Pending)। অ্যাডমিন প্যানেল থেকে আপনার তথ্য ও পেমেন্ট ট্রানজেকশন যাচাই করে অনুমোদন দেওয়ার পর আপনি লগইন করতে পারবেন।",
        });
      } else if (res.status === "blocked") {
        setErrorMsg({
          type: "blocked",
          text:
            res.message ||
            "আপনার অ্যাকাউন্টটি সাময়িকভাবে স্থগিত (Blocked) করা হয়েছে। বিস্তারিত জানতে অনুগ্রহ করে সমিতির অ্যাডমিন প্যানেলে যোগাযোগ করুন।",
        });
      } else {
        setErrorMsg({
          type: "invalid",
          text:
            res.message ||
            "মোবাইল নম্বর অথবা পাসওয়ার্ড সঠিক নয়। অনুগ্রহ করে পুনরায় চেষ্টা করুন। (ডিফল্ট টেস্ট পাসওয়ার্ড: kusd1234)",
        });
      }
    }, 400);
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-28 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-[#FDFBF7]">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xl font-bangla">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="relative w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden ring-4 ring-[#FBBF24] p-0.5 shadow-md">
            <Image src="/logo.png" alt="সমিতি লোগো" fill className="object-contain" priority />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#07261B]">
            কিশোরগঞ্জ উপজেলা সমিতি, ঢাকা
          </h2>
          <p className="text-[#FBBF24] text-xs font-semibold mt-0.5">
            শেকড়ের টানে একতার বন্ধনে
          </p>
          <div className="mt-3 text-slate-500 text-xs">
            সদস্য পোর্টাল ও ড্যাশবোর্ড লগইন
          </div>
        </div>

        {/* Error / Status Alert */}
        {errorMsg.type && (
          <div
            className={`p-4 rounded-2xl mb-6 text-xs leading-relaxed flex items-start gap-3 border ${
              errorMsg.type === "pending"
                ? "bg-amber-50 border-amber-300 text-amber-900"
                : errorMsg.type === "blocked"
                ? "bg-rose-50 border-rose-300 text-rose-900"
                : "bg-red-50 border-red-200 text-red-800"
            }`}
          >
            {errorMsg.type === "pending" ? (
              <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            ) : errorMsg.type === "blocked" ? (
              <Ban className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            )}
            <div>
              <strong className="block font-bold mb-0.5">
                {errorMsg.type === "pending"
                  ? "আবেদন অপেক্ষমাণ রয়েছে"
                  : errorMsg.type === "blocked"
                  ? "অ্যাকাউন্ট স্থগিত"
                  : "লগইন ব্যর্থ হয়েছে"}
              </strong>
              <span>{errorMsg.text}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              মোবাইল নম্বর (লগইন আইডি হিসেবে ব্যবহৃত)
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                placeholder="০১৭১১-XXXXXX"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-[#07261B] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              পাসওয়ার্ড / পিন নম্বর
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-[#07261B] outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-1.5 text-slate-600 cursor-pointer">
              <input type="checkbox" className="rounded text-[#07261B]" defaultChecked />
              <span>আমাকে মনে রাখুন</span>
            </label>
            <span className="text-[#00A3E0] hover:underline cursor-pointer">
              পাসওয়ার্ড ভুলে গেছেন?
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-bold text-sm bg-[#07261B] text-[#FBBF24] hover:bg-[#0c402e] shadow-md transition-all flex items-center justify-center gap-2 mt-4 active:scale-95"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-[#FBBF24] border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>লগইন করুন</span>
              </>
            )}
          </button>
        </form>

        {/* Demo Helper Hint */}
        <div className="mt-6 pt-5 border-t border-slate-100 text-[11px] text-slate-500 bg-slate-50/80 p-3 rounded-2xl space-y-1">
          <div className="font-semibold text-slate-700 flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-700" />
            <span>লগইন ও টেস্টিং সংক্রান্ত নির্দেশনা:</span>
          </div>
          <p>• অনুমোদিত সদস্য টেস্ট আইডি: <strong>০১৭১১-২২৩৩৪৪</strong> (পাসওয়ার্ড: <strong>kusd1234</strong>)</p>
          <p>• অপেক্ষমাণ আবেদনকারীর নম্বর: <strong>০১৭১২-৩৪৫৬৭৮</strong> (লগইন দিলে অপেক্ষমাণ বার্তা দেখাবে)</p>
        </div>

        <div className="mt-6 text-center text-xs text-slate-600">
          এখনো সদস্য হননি?{" "}
          <Link href="/register" className="text-[#07261B] font-bold hover:underline inline-flex items-center gap-0.5">
            অনলাইনে নিবন্ধন করুন
            <ArrowRight className="w-3 h-3 text-[#FBBF24]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
