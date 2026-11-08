"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AnimatedLogo from "./AnimatedLogo";
import { useSiteStore } from "@/lib/siteStore";
import {
  Menu,
  X,
  UserPlus,
  LogIn,
  HeartHandshake,
  Droplet,
  FileText,
  Users,
  Info,
  Phone,
  Home,
  MapPin,
  Settings,
  Landmark,
  Images,
  Calendar,
  ChevronDown,
} from "lucide-react";

const mainNavLinks = [
  { name: "হোম", href: "/", icon: Home },
  { name: "আমাদের সম্পর্কে", href: "/about", icon: Info },
  { name: "গঠনতন্ত্র", href: "/constitution", icon: FileText },
  { name: "কমিটি", href: "/committee", icon: Users },
  { name: "সদস্য ডিরেক্টরি", href: "/members", icon: Users },
  { name: "ইউনিয়ন", href: "/unions", icon: Landmark },
  { name: "অনুষ্ঠান", href: "/activities", icon: Calendar },
];

const moreNavLinks = [
  { name: "ফটো ও ভিডিও গ্যালারি", href: "/gallery", icon: Images },
  { name: "বিজ্ঞপ্তি ও নোটিশ", href: "/notices", icon: FileText },
  { name: "ব্লাড ব্যাংক ও ডোনার", href: "/blood-bank", icon: Droplet },
  { name: "কল্যাণ ও চিকিৎসা সহায়তা", href: "/welfare", icon: HeartHandshake },
];

const allMobileLinks = [...mainNavLinks, ...moreNavLinks];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { settings } = useSiteStore();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile drawer and dropdown on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  const isMoreActive = moreNavLinks.some((link) => pathname === link.href);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 font-bangla select-none bg-[#07261B] shadow-xl border-b border-emerald-900/60">
      {/* 1. Top Dynamic Notification Ticker */}
      <div className="bg-[#041710] text-emerald-200/90 text-[11px] sm:text-xs py-1 px-4 border-b border-emerald-900/50 overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 truncate">
            <span className="w-2 h-2 rounded-full bg-[#FBBF24] animate-ping shrink-0"></span>
            <span className="text-[#FBBF24] font-bold shrink-0">নোটিশ:</span>
            <span className="truncate text-slate-200">
              {settings.announcementTicker}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-4 shrink-0 text-slate-300 text-xs">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#FBBF24]" />
              কিশোরগঞ্জ উপজেলা, নীলফামারী
            </span>
            <Link
              href="/admin"
              className="text-[#FBBF24] hover:underline flex items-center gap-1 font-semibold transition-colors"
            >
              <Settings className="w-3 h-3" />
              অ্যাডমিন প্যানেল
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Main Navbar Bar - Solid rich dark green everywhere with guaranteed high contrast */}
      <div
        className={`bg-[#07261B] transition-all duration-300 ${
          isScrolled ? "py-2 sm:py-2.5 shadow-md" : "py-3 sm:py-3.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo & Headline */}
            <Link href="/" className="flex items-center gap-3 group shrink-0">
              <AnimatedLogo size="sm" />
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-white font-extrabold text-base sm:text-lg tracking-wide group-hover:text-[#FBBF24] transition-colors leading-tight">
                    {settings.heroHeadline}
                  </span>
                  <span className="hidden xl:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#00A3E0]/20 text-[#38BDF8] border border-[#00A3E0]/40">
                    নীলফামারী
                  </span>
                </div>
                <span className="text-[#FBBF24] text-[11px] sm:text-xs font-semibold tracking-wider">
                  {settings.slogan}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {mainNavLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-1.5 rounded-full text-xs xl:text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-white/20 text-[#FBBF24] font-bold border border-[#FBBF24]/40 shadow-xs"
                        : "text-white/90 hover:text-[#FBBF24] hover:bg-white/10"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              {/* More Dropdown (Gallery, Notices, Blood Bank, Welfare) */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={`px-3 py-1.5 rounded-full text-xs xl:text-sm font-semibold transition-all flex items-center gap-1 ${
                    isMoreActive || dropdownOpen
                      ? "bg-white/20 text-[#FBBF24] font-bold border border-[#FBBF24]/40 shadow-xs"
                      : "text-white/90 hover:text-[#FBBF24] hover:bg-white/10"
                  }`}
                  aria-expanded={dropdownOpen}
                >
                  <span>অন্যান্য</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      dropdownOpen ? "rotate-180 text-[#FBBF24]" : "text-white/70"
                    }`}
                  />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-[#07261B] border border-emerald-700/60 rounded-2xl shadow-2xl p-2 z-[70] backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150">
                    {moreNavLinks.map((link) => {
                      const Icon = link.icon;
                      const isActive = pathname === link.href;
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setDropdownOpen(false)}
                          className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                            isActive
                              ? "bg-[#145A43] text-[#FBBF24] font-bold border border-[#FBBF24]/30"
                              : "text-white/90 hover:bg-white/10 hover:text-[#FBBF24]"
                          }`}
                        >
                          <Icon className="w-4 h-4 text-[#FBBF24] shrink-0" />
                          <span>{link.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </nav>

            {/* Action Buttons */}
            <div className="hidden sm:flex items-center gap-2.5 shrink-0">
              <a
                href={`tel:${settings.contactPhone}`}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold border border-white/35 text-white hover:bg-white/15 hover:border-white transition-all backdrop-blur-sm flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-[#FBBF24]" />
                <span className="font-mono">{settings.contactPhone}</span>
              </a>

              <Link
                href="/register"
                className="px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-[#FBBF24] text-[#07261B] hover:bg-[#F59E0B] shadow-sm hover:shadow transition-all flex items-center gap-1.5 active:scale-95"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>সদস্য হোন</span>
              </Link>

              <Link
                href="/login"
                className="p-1.5 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium bg-[#00A3E0] text-white hover:bg-[#0284C7] shadow-sm transition-all flex items-center gap-1"
                title="লগইন করুন"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span className="hidden md:inline font-semibold">লগইন</span>
              </Link>
            </div>

            {/* Mobile Actions & Hamburger */}
            <div className="flex sm:hidden items-center gap-2">
              <Link
                href="/register"
                className="px-3 py-1 rounded-full text-xs font-bold bg-[#FBBF24] text-[#07261B]"
              >
                সদস্য হোন
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-white hover:bg-white/10 focus:outline-none"
                aria-label="মেনু খুলুন"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-[#FBBF24]" />
                ) : (
                  <Menu className="w-6 h-6 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#041710] border-b-2 border-[#FBBF24]/50 shadow-2xl px-4 pt-3 pb-6 max-h-[82vh] overflow-y-auto animate-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {allMobileLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-[#145A43] text-[#FBBF24] border border-[#FBBF24]/40"
                      : "text-white/90 hover:bg-white/10"
                  }`}
                >
                  <Icon className="w-4 h-4 text-[#FBBF24] shrink-0" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-emerald-900/60 flex flex-col gap-2">
            <a
              href={`tel:${settings.contactPhone}`}
              className="w-full py-2.5 rounded-xl text-center text-xs font-semibold border border-white/20 text-white flex items-center justify-center gap-2 bg-white/5"
            >
              <Phone className="w-3.5 h-3.5 text-[#FBBF24]" />
              <span>জরুরি যোগাযোগ: {settings.contactPhone}</span>
            </a>
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-xl text-center text-sm font-bold bg-[#00A3E0] text-white flex items-center justify-center gap-2 hover:bg-[#0284C7]"
            >
              <LogIn className="w-4 h-4" />
              <span>লগইন / ড্যাশবোর্ড</span>
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-xl text-center text-xs font-medium border border-white/30 text-[#FBBF24] flex items-center justify-center gap-2 hover:bg-white/10"
            >
              <Settings className="w-3.5 h-3.5 text-[#FBBF24]" />
              <span>অ্যাডমিন ড্যাশবোর্ড ও CMS</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
