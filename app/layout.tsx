import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import MobileBottomNav from "@/components/common/MobileBottomNav";

export const metadata: Metadata = {
  metadataBase: new URL("https://kusd.org.bd"),
  title: "কিশোরগঞ্জ উপজেলা সমিতি, ঢাকা  | শেকড়ের টানে একতার বন্ধনে",
  description:
    "নীলফামারী জেলার কিশোরগঞ্জ উপজেলার ৯টি ইউনিয়নের ঢাকায় বসবাসরত নাগরিকদের ঐক্যমঞ্চ। সদস্য নিবন্ধন, রক্তদান, কল্যাণ তহবিল ও সামাজিক সেবার অফিশিয়াল পোর্টাল।",
  keywords: [
    "কিশোরগঞ্জ উপজেলা সমিতি নীলফামারী",
    "Kishoreganj Upazila Samity Nilphamari Dhaka",
    "KUSD Nilphamari",
    "নীলফামারী কিশোরগঞ্জ সমিতি ঢাকা",
    "শেকড়ের টানে একতার বন্ধনে",
  ],
  authors: [{ name: "ঢাকাস্থ কিশোরগঞ্জ উপজেলা সমিতি" }],
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "কিশোরগঞ্জ উপজেলা সমিতি, ঢাকা  | শেকড়ের টানে একতার বন্ধনে",
    description: "নীলফামারী জেলার কিশোরগঞ্জ উপজেলাবাসীর রাজধানী ঢাকায় আনুষ্ঠানিক ওয়েব পোর্টাল।",
    url: "https://kusd.org.bd",
    siteName: "কিশোরগঞ্জ উপজেলা সমিতি, ঢাকা ",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "কিশোরগঞ্জ উপজেলা সমিতি লোগো",
      },
    ],
    locale: "bn_BD",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0B3B2C" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FDFBF7] text-slate-800 antialiased selection:bg-[#FBBF24] selection:text-slate-900 pb-16 md:pb-0">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <MobileBottomNav />
      </body>
    </html>
  );
}
