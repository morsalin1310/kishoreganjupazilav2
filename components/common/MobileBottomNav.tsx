"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Bell, UserPlus, Droplet, User } from "lucide-react";

export default function MobileBottomNav() {
  const pathname = usePathname();

  const navItems = [
    { label: "হোম", href: "/", icon: Home },
    { label: "নোটিশ", href: "/notices", icon: Bell },
    { label: "সদস্য ফরম", href: "/register", icon: UserPlus, highlight: true },
    { label: "ব্লাড ব্যাংক", href: "/blood-bank", icon: Droplet },
    { label: "প্রোফাইল", href: "/dashboard", icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-slate-200/80 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] px-2 py-1.5 safe-area-bottom">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          if (item.highlight) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center -mt-5 group"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#0B3B2C] to-[#145A43] text-[#FBBF24] flex items-center justify-center shadow-lg border-2 border-white ring-2 ring-[#FBBF24]/60 group-active:scale-95 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-[#0B3B2C] mt-1">
                  {item.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center py-1 px-2 rounded-lg transition-colors ${
                isActive
                  ? "text-[#0B3B2C] font-bold"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <Icon
                className={`w-5 h-5 ${
                  isActive ? "text-[#0B3B2C] stroke-[2.5]" : "text-slate-500"
                }`}
              />
              <span className="text-[10px] mt-0.5 tracking-tight">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

