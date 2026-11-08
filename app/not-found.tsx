import Link from "next/link";
import Image from "next/image";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center font-bangla bg-[#FDFBF7]">
      <div className="relative w-20 h-20 mb-4 rounded-full overflow-hidden ring-4 ring-[#FBBF24] p-1 bg-white shadow-lg">
        <Image src="/logo.png" alt="সমিতি লোগো" fill className="object-contain" />
      </div>
      <h1 className="text-4xl font-extrabold text-[#0B3B2C] mb-2">৪০৪ — পাতাটি খুঁজে পাওয়া যায়নি</h1>
      <p className="text-slate-600 text-sm max-w-md mb-6">
        দুঃখিত! আপনি যে পৃষ্ঠাটি খুঁজছেন তা স্থানান্তরিত হয়েছে অথবা ইন্টারনেট জগতে আর বিদ্যমান নেই।
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-full text-sm font-bold bg-[#0B3B2C] text-[#FBBF24] hover:bg-[#145A43] shadow-md flex items-center gap-2"
      >
        <Home className="w-4 h-4" />
        হোমপেজে ফিরে যান
      </Link>
    </div>
  );
}

