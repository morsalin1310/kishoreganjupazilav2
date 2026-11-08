"use client";

import Image from "next/image";
import { useState } from "react";

interface AnimatedLogoProps {
  size?: "sm" | "md" | "lg" | "xl" | "hero";
  className?: string;
  showRays?: boolean;
}

export default function AnimatedLogo({
  size = "md",
  className = "",
  showRays = false,
}: AnimatedLogoProps) {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    sm: "w-10 h-10 sm:w-11 sm:h-11",
    md: "w-14 h-14 sm:w-16 sm:h-16",
    lg: "w-20 h-20 sm:w-24 sm:h-24",
    xl: "w-28 h-28 sm:w-32 sm:h-32",
    hero: "w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48",
  };

  const imageSizes = {
    sm: "48px",
    md: "64px",
    lg: "96px",
    xl: "128px",
    hero: "192px",
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none group cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Outer Pulse Glowing Halo */}
      <div
        className={`absolute inset-0 rounded-full bg-gradient-to-tr from-[#FBBF24]/40 via-[#00A3E0]/30 to-[#10B981]/40 blur-xl transition-all duration-700 ${
          isHovered ? "scale-150 opacity-100" : "scale-110 opacity-70 animate-pulse"
        }`}
      ></div>

      {/* Rotating Dashed Sunburst Border (SVG) */}
      <div className="absolute -inset-2 sm:-inset-3 pointer-events-none">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full animate-[spin_20s_linear_infinite] opacity-75 group-hover:opacity-100 group-hover:animate-[spin_8s_linear_infinite] transition-all"
        >
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="#FBBF24"
            strokeWidth="2"
            strokeDasharray="4 8"
            strokeLinecap="round"
          />
          <circle
            cx="50"
            cy="50"
            r="49"
            fill="none"
            stroke="#00A3E0"
            strokeWidth="1"
            strokeDasharray="2 12"
            className="opacity-60"
          />
        </svg>
      </div>

      {/* Counter-rotating subtle cyan ring */}
      <div className="absolute -inset-1 sm:-inset-1.5 pointer-events-none">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full animate-[spin_25s_linear_infinite_reverse] opacity-50"
        >
          <circle
            cx="50"
            cy="50"
            r="47"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="1.5"
            strokeDasharray="6 14"
          />
        </svg>
      </div>

      {/* Main Circular Badge */}
      <div
        className={`relative ${sizeClasses[size]} rounded-full overflow-hidden ring-3 ring-[#FBBF24] shadow-[0_10px_35px_rgba(0,0,0,0.35)] bg-white p-1 transition-all duration-500 transform ${
          isHovered ? "scale-110 rotate-2 shadow-[0_15px_45px_rgba(251,191,36,0.5)]" : "hover:scale-105"
        }`}
      >
        <Image
          src="/logo.png"
          alt="কিশোরগঞ্জ উপজেলা সমিতি অফিশিয়াল লোগো"
          fill
          sizes={imageSizes[size]}
          className="object-contain p-0.5"
          priority
        />

        {/* Shimmer Light Reflection Sweep Animation */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 ease-in-out pointer-events-none rounded-full"></div>
      </div>
    </div>
  );
}

