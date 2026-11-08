"use client";

import { useRef, useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Download, Printer, CheckCircle, FileText, FileDown } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useSiteStore } from "@/lib/siteStore";

export interface PaymentReceiptData {
  receiptNo: string;
  date?: string;
  memberName: string;
  fatherName?: string;
  memberPhone: string;
  memberNo?: string;
  memberType: "general" | "lifetime" | "donor" | string;
  union?: string;
  village?: string;
  presentAddress?: string;
  paymentMethod: string;
  trxId: string;
  amount: number;
  purpose: string;
  monthsCount?: number;
  status?: "verified" | "pending";
}

interface PaymentReceiptProps {
  receipt: PaymentReceiptData;
  onClose?: () => void;
  autoDownloadPdf?: boolean;
}

// Convert amount to Bengali words
function numberToBanglaWords(num: number): string {
  const map: { [key: number]: string } = {
    25: "পঁচিশ টাকা মাত্র",
    50: "পঞ্চাশ টাকা মাত্র",
    75: "পঁচাত্তর টাকা মাত্র",
    100: "একশত টাকা মাত্র",
    150: "একশত পঞ্চাশ টাকা মাত্র",
    200: "দুইশত টাকা মাত্র",
    300: "তিনশত টাকা মাত্র",
    500: "পাঁচশত টাকা মাত্র",
    1000: "এক হাজার টাকা মাত্র",
    10000: "দশ হাজার টাকা মাত্র",
    50000: "পঞ্চাশ হাজার টাকা মাত্র",
  };
  if (map[num]) return map[num];
  return `${num.toLocaleString("bn-BD")} টাকা মাত্র`;
}

export default function PaymentReceipt({
  receipt,
  onClose,
  autoDownloadPdf = false,
}: PaymentReceiptProps) {
  const receiptRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [downloadType, setDownloadType] = useState<"pdf" | "png" | null>(null);
  const { settings } = useSiteStore();

  const getMemberTypeLabel = (type: string) => {
    switch (type) {
      case "lifetime":
        return "আজীবন সদস্য";
      case "donor":
        return "দাতা সদস্য";
      default:
        return "সাধারণ সদস্য";
    }
  };

  const formattedDate =
    receipt.date ||
    new Date().toLocaleDateString("bn-BD", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  // Direct PDF Download Handler using jsPDF
  const handleDownloadPdf = async () => {
    if (!receiptRef.current) return;
    try {
      setDownloading(true);
      setDownloadType("pdf");

      const canvas = await html2canvas(receiptRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");

      // A4 portrait PDF format (210 x 297 mm)
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const margin = 10;
      const imgWidth = pageWidth - margin * 2;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", margin, margin, imgWidth, imgHeight, undefined, "FAST");
      pdf.save(`MONEY-RECEIPT-${receipt.receiptNo || "KUSD"}.pdf`);
    } catch (err) {
      console.error("PDF download error:", err);
    } finally {
      setDownloading(false);
      setDownloadType(null);
    }
  };

  // Direct PNG Download Handler
  const handleDownloadPng = async () => {
    if (!receiptRef.current) return;
    try {
      setDownloading(true);
      setDownloadType("png");

      const canvas = await html2canvas(receiptRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      });

      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `MONEY-RECEIPT-${receipt.receiptNo || "KUSD"}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("PNG download error:", err);
    } finally {
      setDownloading(false);
      setDownloadType(null);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Optional auto PDF download on mount if requested
  useEffect(() => {
    if (autoDownloadPdf) {
      const timer = setTimeout(() => {
        handleDownloadPdf();
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [autoDownloadPdf]);

  return (
    <div className="flex flex-col items-center font-bangla w-full">
      {/* Top Action Controls */}
      <div className="w-full max-w-3xl flex flex-wrap items-center justify-between gap-3 mb-4 print:hidden">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-emerald-900 bg-emerald-100/90 px-3.5 py-1.5 rounded-full border border-emerald-300 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-emerald-700" />
            অফিশিয়াল মানি রসিদ (Official Money Receipt)
          </span>
          <span className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
            #{receipt.receiptNo}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Main PDF Download Button */}
          <button
            onClick={handleDownloadPdf}
            disabled={downloading}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-[#07261B] text-[#FBBF24] hover:bg-[#0c402e] shadow-md transition-all flex items-center gap-1.5 active:scale-95 disabled:opacity-50"
            title="পিডিএফ ফাইল ডাউনলোড করুন"
          >
            <FileDown className="w-4 h-4 text-[#FBBF24]" />
            <span>
              {downloading && downloadType === "pdf"
                ? "পিডিএফ তৈরি হচ্ছে..."
                : "পিডিএফ ডাউনলোড (PDF)"}
            </span>
          </button>

          {/* PNG Image Download */}
          <button
            onClick={handleDownloadPng}
            disabled={downloading}
            className="px-3 py-2 rounded-xl text-xs font-bold bg-white text-slate-700 hover:bg-slate-100 border border-slate-300 shadow-xs transition-all flex items-center gap-1.5 active:scale-95 disabled:opacity-50"
            title="ছবি হিসেবে সংরক্ষণ করুন"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{downloading && downloadType === "png" ? "..." : "PNG"}</span>
          </button>

          {/* Print */}
          <button
            onClick={handlePrint}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white text-slate-700 hover:bg-slate-100 border border-slate-300 shadow-xs transition-all flex items-center gap-1.5"
            title="প্রিন্ট করুন"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>প্রিন্ট</span>
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              title="বন্ধ করুন"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* ================================================================
          AUTHENTIC PAPER MONEY RECEIPT VOUCHER (মানি রসিদ বহি আদল)
          ================================================================ */}
      <div
        ref={receiptRef}
        className="w-full max-w-3xl bg-[#FCFDFB] text-slate-900 border-[3px] border-[#07261B] rounded-2xl p-5 sm:p-7 shadow-2xl relative overflow-hidden print:border-2 print:border-black print:shadow-none print:p-5"
        style={{ fontFamily: "'Hind Siliguri', 'Tiro Bangla', sans-serif" }}
      >
        {/* Inner Decorative Framing Border */}
        <div className="border border-[#07261B]/40 rounded-xl p-4 sm:p-6 relative bg-white/70">
          {/* Subtle Watermark of the Official Circular Logo */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.06] overflow-hidden">
            <img
              src="/logo.png"
              alt="Watermark"
              className="w-80 h-80 object-contain"
            />
          </div>

          {/* Header Row: Official Logo + Title + Address */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b-2 border-[#07261B] pb-4 relative z-10">
            {/* Left: Official Circular Logo */}
            <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full overflow-hidden shrink-0 flex items-center justify-center">
              <img
                src="/logo.png"
                alt="কিশোরগঞ্জ উপজেলা সমিতি লোগো"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Center: Organization Identity */}
            <div className="flex-1 text-center">
              <div className="text-[11px] font-bold text-emerald-800 tracking-wider">
                শেকড়ের টানে একতার বন্ধনে
              </div>
              <h1 className="text-xl sm:text-2xl md:text-[26px] font-black text-[#07261B] tracking-tight leading-tight">
                কিশোরগঞ্জ উপজেলা সমিতি, ঢাকা
              </h1>
              <div className="text-[11px] font-semibold text-slate-700">
                (নীলফামারী জেলার কিশোরগঞ্জ উপজেলার ঢাকাস্থ সামাজিক ঐক্যমঞ্চ)
              </div>
              <p className="text-[11px] text-slate-600 mt-1 font-medium">
                কার্যালয়: {settings.contactAddress || "বাড়ি-১৬, রোড-৩/১, ব্লক-এ, সেক্টর-১৬, উত্তরা, ঢাকা-১২৩০"}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-x-3 text-[10px] text-slate-600 font-medium mt-0.5">
                <span>📞 হেল্পলাইন: {settings.contactPhone || "০১৩৫৩-৭৪৩৫৪৭"}</span>
                <span>✉️ {settings.contactEmail || "kishoreganjupazilasamity@gmail.com"}</span>
                <span className="font-sans">🌐 kishoreganjupazila.com</span>
              </div>
            </div>

            {/* Right: QR Verification Emblem */}
            <div className="shrink-0 flex flex-col items-center">
              <div className="p-1 bg-white border border-[#07261B]/30 rounded-lg shadow-xs">
                <QRCodeSVG
                  value={`https://kishoreganjupazila.com/verify-receipt/${receipt.receiptNo}?trx=${receipt.trxId}`}
                  size={62}
                  level="M"
                />
              </div>
              <span className="text-[8px] font-mono text-slate-500 mt-0.5">ভেরিফিকেশন কিউআর</span>
            </div>
          </div>

          {/* Money Receipt Title Pill Badge */}
          <div className="my-3 flex justify-center relative z-10">
            <div className="bg-[#07261B] text-[#FBBF24] px-6 py-1.5 rounded-full border-2 border-[#FBBF24] shadow-sm text-center">
              <span className="text-sm sm:text-base font-black tracking-wider uppercase">
                মানি রসিদ (MONEY RECEIPT)
              </span>
            </div>
          </div>

          {/* Receipt Meta Bar: No, Date, ID */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs border-b border-dashed border-slate-300 pb-2 mb-4 relative z-10 font-medium text-slate-700">
            <div>
              <span>রসিদ নং (Receipt No): </span>
              <strong className="font-mono font-bold text-[#07261B] text-sm border-b-2 border-dotted border-[#07261B] px-2">
                {receipt.receiptNo}
              </strong>
            </div>
            <div>
              <span>সদস্য আইডি (Member ID): </span>
              <strong className="font-mono font-bold text-emerald-800 text-sm border-b-2 border-dotted border-emerald-800 px-2">
                {receipt.memberNo || "KSD-প্রক্রিয়াধীন"}
              </strong>
            </div>
            <div>
              <span>তারিখ (Date): </span>
              <strong className="text-slate-900 border-b-2 border-dotted border-slate-800 px-2">
                {formattedDate}
              </strong>
            </div>
          </div>

          {/* Traditional Voucher Fill-in Dotted Rows */}
          <div className="space-y-3.5 text-xs sm:text-[13px] text-slate-800 leading-relaxed relative z-10">
            {/* Row 1: Received from */}
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="text-slate-600 shrink-0">জনাব / নাম (Received with thanks from):</span>
              <span className="flex-1 font-bold text-slate-900 text-sm border-b border-dotted border-slate-400 pb-0.5 min-w-[160px]">
                {receipt.memberName}
              </span>
              <span className="text-slate-600 shrink-0">মোবাইল:</span>
              <span className="font-mono font-bold text-slate-900 border-b border-dotted border-slate-400 pb-0.5 min-w-[120px]">
                {receipt.memberPhone}
              </span>
            </div>

            {/* Row 2: Father / Permanent Address */}
            <div className="flex flex-wrap items-baseline gap-2">
              {receipt.fatherName && (
                <>
                  <span className="text-slate-600 shrink-0">পিতা/স্বামীর নাম:</span>
                  <span className="font-medium text-slate-900 border-b border-dotted border-slate-400 pb-0.5 min-w-[140px]">
                    {receipt.fatherName}
                  </span>
                </>
              )}
              <span className="text-slate-600 shrink-0">স্থায়ী ঠিকানা:</span>
              <span className="text-slate-600">গ্রাম:</span>
              <span className="font-medium text-slate-900 border-b border-dotted border-slate-400 pb-0.5 min-w-[100px]">
                {receipt.village || "—"}
              </span>
              <span className="text-slate-600">ইউনিয়ন:</span>
              <span className="font-bold text-[#07261B] border-b border-dotted border-slate-400 pb-0.5 min-w-[120px]">
                {receipt.union || "কিশোরগঞ্জ"}
              </span>
              <span className="text-slate-600">জেলা: নীলফামারী।</span>
            </div>

            {/* Row 3: Present Dhaka Address & Category */}
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="text-slate-600 shrink-0">বর্তমান ঠিকানা (ঢাকা):</span>
              <span className="flex-1 font-medium text-slate-900 border-b border-dotted border-slate-400 pb-0.5 min-w-[160px]">
                {receipt.presentAddress || "ঢাকা"}
              </span>
              <span className="text-slate-600 shrink-0">সদস্যের শ্রেণি:</span>
              <span className="font-bold text-[#07261B] border-b border-dotted border-slate-400 pb-0.5">
                {getMemberTypeLabel(receipt.memberType)}
              </span>
            </div>

            {/* Row 4: Purpose */}
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="text-slate-600 shrink-0">বাবদ (On account of):</span>
              <span className="flex-1 font-bold text-slate-900 border-b border-dotted border-slate-400 pb-0.5">
                {receipt.purpose}
                {receipt.monthsCount ? ` (মেয়াদ: ${receipt.monthsCount.toLocaleString("bn-BD")} মাসের চাঁদা)` : ""}
              </span>
            </div>

            {/* Row 5: Amount Box & Words */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              {/* Words */}
              <div className="flex-1 flex flex-wrap items-baseline gap-2">
                <span className="text-slate-600 shrink-0 font-bold">কথায় (In words):</span>
                <span className="flex-1 font-bold text-[#07261B] border-b-2 border-dotted border-[#07261B] pb-0.5 italic">
                  {numberToBanglaWords(receipt.amount)}
                </span>
              </div>

              {/* Amount Box */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-slate-600 font-bold text-xs">টাকা (৳):</span>
                <div className="px-4 py-1.5 border-2 border-[#07261B] bg-emerald-50 rounded-lg text-lg font-black font-mono text-[#07261B] shadow-xs">
                  ৳ {receipt.amount.toLocaleString("bn-BD")}/-
                </div>
              </div>
            </div>

            {/* Row 6: Payment Method & TrxID */}
            <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-600">পরিশোধের মাধ্যম:</span>
                <strong className="uppercase font-sans font-bold text-slate-800">
                  {receipt.paymentMethod}
                </strong>
                <span className="text-slate-400">|</span>
                <span className="text-slate-600">TrxID:</span>
                <strong className="font-mono font-bold text-rose-700">
                  {receipt.trxId || "CASH-OFFICE"}
                </strong>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>টাকা সম্পূর্ণভাবে গ্রহণ ও যাচাইকৃত</span>
              </div>
            </div>
          </div>

          {/* ============================================================
              3-COLUMN SIGNATURE AREA (প্রথাগত মানি রসিদের আদলে)
              ============================================================ */}
          <div className="pt-8 mt-6 border-t border-slate-300 grid grid-cols-3 gap-4 items-end relative z-10 text-xs text-center">
            {/* Column 1: Member / Depositor */}
            <div>
              <div className="h-12 flex items-end justify-center pb-1">
                <span className="italic text-slate-700 font-serif border-b border-slate-400 px-4">
                  {receipt.memberName}
                </span>
              </div>
              <div className="border-t border-slate-400 pt-1 font-bold text-slate-800">
                জমাদানকারীর স্বাক্ষর
              </div>
              <div className="text-[10px] text-slate-500">সদস্য</div>
            </div>

            {/* Column 2: Audit & Verification Stamp */}
            <div className="flex flex-col items-center justify-end">
              <div className="w-14 h-14 rounded-full border-2 border-dashed border-emerald-700/60 flex flex-col items-center justify-center p-1 bg-emerald-50/50 mb-1">
                <span className="text-[8px] font-bold text-emerald-800 uppercase">যাচাইকৃত</span>
                <span className="text-[7px] text-emerald-600 font-mono">AUDITED</span>
              </div>
              <div className="border-t border-slate-400 pt-1 font-bold text-slate-800 w-full">
                আদায়কারী / হিসাব শাখা
              </div>
              <div className="text-[10px] text-slate-500">কিশোরগঞ্জ উপজেলা সমিতি</div>
            </div>

            {/* Column 3: General Secretary Authority Signature */}
            <div>
              <div className="h-12 flex items-center justify-center relative">
                {settings.generalSecretarySignatureUrl ? (
                  <img
                    src={settings.generalSecretarySignatureUrl}
                    alt="সাধারণ সম্পাদকের স্বাক্ষর"
                    className="max-h-12 max-w-[130px] object-contain"
                  />
                ) : (
                  <div className="border border-emerald-700/70 rounded px-2 py-0.5 bg-emerald-50/90 text-[10px] text-emerald-900 font-serif font-bold italic rotate-[-3deg] shadow-xs">
                    {settings.generalSecretaryName || "মো. গোলাম মোস্তফা"}
                    <div className="text-[7px] text-emerald-700 not-italic uppercase tracking-wider font-sans">
                      General Secretary
                    </div>
                  </div>
                )}
              </div>
              <div className="border-t border-slate-400 pt-1 font-bold text-[#07261B]">
                সাধারণ সম্পাদকের স্বাক্ষর
              </div>
              <div className="text-[10px] text-slate-500">
                কিশোরগঞ্জ উপজেলা সমিতি, ঢাকা
              </div>
            </div>
          </div>

          {/* Bottom Security Note */}
          <div className="mt-5 text-center text-[10px] text-slate-500 border-t border-slate-200/80 pt-2 font-mono">
            * রসিদ ছাড়া কোনো প্রকার আর্থিক লেনদেন গ্রহণযোগ্য নহে। এটি সমিতির অফিশিয়াল ডিজিটাল মানি রসিদ।
          </div>
        </div>
      </div>
    </div>
  );
}
