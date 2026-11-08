"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSiteStore } from "@/lib/siteStore";
import { UserPlus, LogIn, Phone, MapPin } from "lucide-react";

export default function HeroSection() {
  const { settings } = useSiteStore();

  // Typewriter effect: types out title on entrance, then stays permanently fixed (no erasing)
  const fullTitle = settings.siteTitle || "কিশোরগঞ্জ উপজেলা সমিতি, ঢাকা";
  const [displayedTitle, setDisplayedTitle] = useState("");
  const [isTypingDone, setIsTypingDone] = useState(false);

  useEffect(() => {
    let index = 0;
    setDisplayedTitle("");
    setIsTypingDone(false);

    const timer = setInterval(() => {
      index++;
      if (index <= fullTitle.length) {
        setDisplayedTitle(fullTitle.slice(0, index));
      } else {
        setIsTypingDone(true);
        clearInterval(timer);
      }
    }, 70);

    return () => clearInterval(timer);
  }, [fullTitle]);

  return (
    <header className="hero relative min-h-[100svh] flex flex-col text-white overflow-hidden isolate bg-[#0c2f21] font-bangla select-none" id="top">
      {/* ============================================================
          CINEMATIC VECTOR SCENE (SVG)
          Sky, Rising Sun with light glow, Clouds drifting across,
          Birds flying across the sun (Group of 4, Lone 1, Pair of 2),
          Hills, Winding Road, TWO Animated Bullock Carts, River Current, Boat
          ============================================================ */}
      <svg
        className="scene absolute inset-0 w-full h-full -z-10"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMax slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0c2f21"></stop>
            <stop offset=".45" stopColor="#2f6b3f"></stop>
            <stop offset=".78" stopColor="#e9b949"></stop>
            <stop offset="1" stopColor="#fbd34d"></stop>
          </linearGradient>

          {/* Morning Sunrise Light Glow */}
          <radialGradient id="sunGlow" cx=".5" cy=".5" r=".5">
            <stop offset="0" stopColor="#fff3b0" stopOpacity=".95"></stop>
            <stop offset=".35" stopColor="#fbcf0e" stopOpacity=".5"></stop>
            <stop offset=".7" stopColor="#e82127" stopOpacity=".2"></stop>
            <stop offset="1" stopColor="#fbcf0e" stopOpacity="0"></stop>
          </radialGradient>

          <linearGradient id="river" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3cc3ee"></stop>
            <stop offset="1" stopColor="#0d7fae"></stop>
          </linearGradient>

          <linearGradient id="hillFar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#7aa35a"></stop>
            <stop offset="1" stopColor="#4f7a3a"></stop>
          </linearGradient>

          <linearGradient id="hillNear" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#5b8a44"></stop>
            <stop offset="1" stopColor="#2e5a2c"></stop>
          </linearGradient>

          {/* Earthen rural dirt road gradient */}
          <linearGradient id="dirtRoad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#c59247"></stop>
            <stop offset="1" stopColor="#9a6524"></stop>
          </linearGradient>

          {/* Flapping Wing Bird Symbol */}
          <g id="birdWithWings">
            <path
              d="M 25 12 Q 12 0 0 8 Q 12 12 25 12 Z"
              style={{
                transformOrigin: "25px 12px",
                animation: "wingFlapFast 0.45s ease-in-out infinite alternate",
              }}
            />
            <path
              d="M 25 12 Q 38 0 50 8 Q 38 12 25 12 Z"
              style={{
                transformOrigin: "25px 12px",
                animation: "wingFlapFast 0.45s ease-in-out infinite alternate",
              }}
            />
            <ellipse cx="25" cy="12" rx="3.5" ry="1.8" />
          </g>

          {/* Palm Tree Symbol */}
          <symbol id="palm" viewBox="0 0 80 160">
            <path d="M38 160 C40 120 42 80 40 40 L44 40 C46 80 46 120 46 160Z"></path>
            <path d="M42 40 C30 20 10 18 0 28 C14 22 28 26 42 40Z"></path>
            <path d="M42 40 C54 18 72 16 80 26 C68 22 56 26 42 40Z"></path>
            <path d="M42 40 C36 14 22 2 8 4 C22 10 32 22 42 40Z"></path>
            <path d="M42 40 C50 12 64 2 76 6 C62 12 52 22 42 40Z"></path>
            <path d="M42 40 C42 18 44 6 50 0 C48 12 46 26 42 40Z"></path>
          </symbol>

          {/* Tree Symbol */}
          <symbol id="tree" viewBox="0 0 120 140">
            <rect x="54" y="90" width="12" height="50"></rect>
            <circle cx="60" cy="50" r="38"></circle>
            <circle cx="30" cy="70" r="28"></circle>
            <circle cx="90" cy="70" r="28"></circle>
            <circle cx="60" cy="84" r="26"></circle>
          </symbol>
        </defs>

        {/* 1. Sky Gradient Background */}
        <rect width="1440" height="900" fill="url(#sky)"></rect>

        {/* 2. Twinkling Stars */}
        <g className="stars" fill="#fff">
          <circle cx="120" cy="80" r="1.6"></circle>
          <circle cx="300" cy="140" r="1.2"></circle>
          <circle cx="520" cy="60" r="1.8"></circle>
          <circle cx="760" cy="110" r="1.2"></circle>
          <circle cx="980" cy="50" r="1.6"></circle>
          <circle cx="1180" cy="130" r="1.3"></circle>
          <circle cx="1350" cy="70" r="1.7"></circle>
          <circle cx="660" cy="180" r="1"></circle>
          <circle cx="1260" cy="210" r="1"></circle>
          <circle cx="200" cy="230" r="1"></circle>
        </g>

        {/* 3. Rising Red Sun from the River with Expanding Morning Light */}
        <g
          className="sun"
          style={{
            transformOrigin: "1080px 520px",
            animation: "sunriseFromRiver 4.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          }}
        >
          {/* Ambient Morning Light Halo */}
          <circle
            cx="1080"
            cy="520"
            r="240"
            fill="url(#sunGlow)"
            style={{
              transformOrigin: "1080px 520px",
              animation: "morningLightExpansion 4.8s ease-out forwards, glow 5s ease-in-out 4.8s infinite alternate",
            }}
          ></circle>
          {/* Crimson Red Sun Disk */}
          <circle cx="1080" cy="520" r="96" fill="#e82127"></circle>
        </g>

        {/* ============================================================
            4. ANIMATED CLOUDS DRIFTING ACROSS (একপাশ থেকে আরেকপাশে চলাচল)
            ============================================================ */}
        <g className="clouds" fill="#fff">
          {/* Cloud Group 1: Lower altitude moving across */}
          <g
            className="cloud-group-1"
            opacity=".55"
            style={{ animation: "cloudDriftRight1 50s linear infinite" }}
          >
            <ellipse cx="200" cy="250" rx="95" ry="28"></ellipse>
            <ellipse cx="255" cy="230" rx="65" ry="32"></ellipse>
            <ellipse cx="155" cy="238" rx="48" ry="24"></ellipse>
            <ellipse cx="295" cy="252" rx="42" ry="20"></ellipse>
          </g>

          {/* Cloud Group 2: Mid-sky moving across */}
          <g
            className="cloud-group-2"
            opacity=".4"
            style={{ animation: "cloudDriftRight2 70s linear infinite" }}
          >
            <ellipse cx="680" cy="190" rx="115" ry="26"></ellipse>
            <ellipse cx="745" cy="170" rx="70" ry="30"></ellipse>
            <ellipse cx="620" cy="180" rx="55" ry="22"></ellipse>
          </g>

          {/* Cloud Group 3: High altitude fluffy cloud */}
          <g
            className="cloud-group-3"
            opacity=".45"
            style={{ animation: "cloudDriftRight3 85s linear infinite" }}
          >
            <ellipse cx="1180" cy="320" rx="85" ry="22"></ellipse>
            <ellipse cx="1225" cy="302" rx="55" ry="26"></ellipse>
            <ellipse cx="1140" cy="312" rx="44" ry="18"></ellipse>
          </g>
        </g>

        {/* ============================================================
            5. BIRDS FLYING RIGHT ACROSS THE SUN & MIDDLE SKY
            (১) একসাথে ৪টি পাখি (৪ birds flying together across the sun)
            (২) দূরত্ব রেখে আলাদা ১টি পাখি (1 lone bird flying with gap)
            (৩) দূরত্ব রেখে আলাদা ২টি পাখি (2 companion birds flying with gap)
            All flying at visible altitudes across the red sun!
            ============================================================ */}
        <g className="birds-layer" fill="#1a2214">
          {/* Group A: ৪টি পাখি একসাথে সূর্যের ওপর দিয়ে উড়ে যাচ্ছে */}
          <g
            className="birds-group-4"
            style={{ animation: "flyGroup4AcrossSun 23s linear infinite" }}
          >
            {/* Bird 1: Leader */}
            <g transform="translate(90, 20) scale(0.95)">
              <use href="#birdWithWings" />
            </g>
            {/* Bird 2: Top follower */}
            <g transform="translate(45, 0) scale(0.82)">
              <use href="#birdWithWings" />
            </g>
            {/* Bird 3: Bottom follower */}
            <g transform="translate(40, 42) scale(0.80)">
              <use href="#birdWithWings" />
            </g>
            {/* Bird 4: Trailing flyer */}
            <g transform="translate(0, 22) scale(0.74)">
              <use href="#birdWithWings" />
            </g>
          </g>

          {/* Group B: দূরত্ব রেখে আলাদা ১টি পাখি উঁচুতে উড়ে যাচ্ছে */}
          <g
            className="bird-lone-1"
            style={{ animation: "flyLone1AcrossSky 27s linear 7s infinite" }}
          >
            <g transform="translate(0, 0) scale(0.88)">
              <use href="#birdWithWings" />
            </g>
          </g>

          {/* Group C: দূরত্ব রেখে আলাদা ২টি পাখি একসাথে উড়ে যাচ্ছে */}
          <g
            className="birds-pair-2"
            style={{ animation: "flyPair2AcrossSun 25s linear 14s infinite" }}
          >
            <g transform="translate(50, 0) scale(0.85)">
              <use href="#birdWithWings" />
            </g>
            <g transform="translate(0, 20) scale(0.76)">
              <use href="#birdWithWings" />
            </g>
          </g>
        </g>

        {/* 6. Distant Green Hills */}
        <path
          fill="url(#hillFar)"
          d="M0 640 C160 590 300 610 460 630 C640 652 760 580 940 600 C1120 620 1260 580 1440 610 L1440 900 L0 900Z"
        ></path>

        {/* Trees & Palms on Hills */}
        <g fill="#1f3d1c" opacity=".9">
          <use href="#tree" x="60" y="560" width="90" height="105"></use>
          <use href="#tree" x="140" y="575" width="70" height="80"></use>
          <use href="#palm" x="250" y="520" width="60" height="120"></use>
          <use href="#tree" x="560" y="590" width="80" height="90"></use>
          <use href="#palm" x="660" y="540" width="56" height="110"></use>
          <use href="#tree" x="1240" y="555" width="100" height="110"></use>
          <use href="#palm" x="1350" y="520" width="58" height="120"></use>
        </g>

        {/* 7. Near Riverbank Field */}
        <path
          fill="url(#hillNear)"
          d="M0 695 C200 655 380 685 560 695 C760 708 900 662 1100 675 C1260 685 1360 670 1440 678 L1440 900 L0 900Z"
        ></path>

        {/* ============================================================
            8. WINDING RURAL DIRT ROAD (নদীর পাশ দিয়ে আঁকাবাঁকা মেঠোপথ)
            ============================================================ */}
        <g className="rural-road">
          {/* Road Surface */}
          <path
            fill="url(#dirtRoad)"
            opacity="0.9"
            d="M-40 735 C180 715 360 730 540 718 C740 705 920 735 1120 712 C1280 698 1380 720 1480 710 L1480 728 C1380 738 1280 716 1120 730 C920 753 740 723 540 736 C360 748 180 733 -40 753 Z"
          />
          {/* Rural Road Tracks (মাটির গাড়ির চাকার দাগ) */}
          <path
            d="M-40 744 C180 724 360 739 540 727 C740 714 920 744 1120 721 C1280 707 1380 729 1480 719"
            stroke="#784813"
            strokeWidth="1.5"
            strokeDasharray="16 10"
            fill="none"
            opacity="0.55"
          />
        </g>

        {/* ============================================================
            9. ANIMATED BULLOCK CART 1 (প্রথম ঐতিহ্যবাহী গরুর গাড়ি মানুষ সহ)
            ============================================================ */}
        <g
          className="bullock-cart-wrapper-1"
          style={{ animation: "cartMove1 34s linear infinite" }}
        >
          <g
            className="bullock-cart-1"
            style={{ animation: "cartBounce 0.45s ease-in-out infinite" }}
          >
            {/* Ox / Bull 1 (সুঠাম বাদামী ষাঁড়/গরু) */}
            <g className="ox-1" transform="translate(68, 0)">
              {/* Dewlap (গলকম্বল) */}
              <path d="M30 -6 Q36 2 40 -8" fill="#523114" />
              {/* Bull Body */}
              <ellipse cx="24" cy="-14" rx="20" ry="12" fill="#5c3818" />
              {/* Bull Hump (উঁচু কুঁজ) */}
              <ellipse cx="14" cy="-24" rx="7.5" ry="6.5" fill="#4d2e13" />
              {/* Bull Neck & Head */}
              <path d="M36 -16 C43 -23 50 -23 54 -16 C56 -12 52 -6 44 -8 Z" fill="#5c3818" />
              {/* Muzzle / Mouth detail */}
              <ellipse cx="53" cy="-14" rx="2.5" ry="3" fill="#361f0c" />
              {/* Curved Horns (সুদর্শন বাঁকা শিং) */}
              <path d="M49 -21 Q55 -31 51 -34 Q47 -28 47 -19 Z" fill="#2d1c0b" />
              {/* Legs in walking stride */}
              <path d="M12 -4 L9 13 L13 13 L16 -4 Z" fill="#42270f" />
              <path d="M22 -4 L25 13 L29 13 L25 -4 Z" fill="#361f0c" />
              <path d="M34 -4 L31 13 L35 13 L38 -4 Z" fill="#42270f" />
              <path d="M42 -4 L46 13 L50 13 L46 -4 Z" fill="#361f0c" />
              {/* Swishing Tail (লেজ) */}
              <path d="M5 -16 Q-3 -6 2 4" stroke="#361f0c" strokeWidth="2" fill="none" />
            </g>

            {/* Connecting Yoke Pole (জোয়াল) */}
            <line x1="32" y1="-8" x2="92" y2="-17" stroke="#783c10" strokeWidth="3" strokeLinecap="round" />
            <line x1="90" y1="-21" x2="90" y2="-8" stroke="#3d2208" strokeWidth="2.5" />

            {/* Cart Frame & Bamboo Canopy / Chhoi (ছইওয়ালা গাড়ি) */}
            <g className="cart-body-1">
              <rect x="-30" y="-8" width="62" height="6" rx="2" fill="#784112" stroke="#522a08" strokeWidth="1" />
              {/* Arched Bamboo Canopy / Chhoi (বাঁশের ছই) */}
              <path d="M-28 -8 C-28 -34 18 -34 18 -8 Z" fill="#b07d38" stroke="#694314" strokeWidth="1.5" />
              {/* Bamboo Ribs */}
              <path d="M-18 -8 C-18 -30 8 -30 8 -8" stroke="#694314" strokeWidth="1" fill="none" />
              <path d="M-8 -8 C-8 -32 -2 -32 -2 -8" stroke="#694314" strokeWidth="1" fill="none" />

              {/* Cart Driver / Person 1 (গাড়িয়াল মানুষ - লাল গামছা) */}
              <g className="driver-1" transform="translate(18, -12)">
                <path d="M-2 4 L8 4 L6 -8 L0 -8 Z" fill="#008BBF" />
                <circle cx="3" cy="-13" r="5" fill="#a86e3b" />
                <path d="M-1 -16 Q3 -20 7 -16 Q3 -14 -1 -16 Z" fill="#e82127" />
                <path d="M4 -4 L14 -4" stroke="#a86e3b" strokeWidth="2" strokeLinecap="round" />
                <line x1="14" y1="-4" x2="50" y2="-13" stroke="#fbd34d" strokeWidth="1" strokeDasharray="3 2" />
              </g>

              {/* Rotating Wooden Spoked Wheel (ঘূর্ণায়মান চাকা) */}
              <g
                className="wheel-1"
                transform="translate(-4, 0)"
                style={{
                  transformOrigin: "-4px 0px",
                  animation: "wheelSpin 1.8s linear infinite",
                }}
              >
                <circle cx="0" cy="0" r="14" fill="none" stroke="#4a2505" strokeWidth="3" />
                <circle cx="0" cy="0" r="12" fill="rgba(0,0,0,0.15)" stroke="#733b09" strokeWidth="1.5" />
                <circle cx="0" cy="0" r="3.5" fill="#361a03" />
                <line x1="-12" y1="0" x2="12" y2="0" stroke="#733b09" strokeWidth="1.5" />
                <line x1="0" y1="-12" x2="0" y2="12" stroke="#733b09" strokeWidth="1.5" />
                <line x1="-8.5" y1="-8.5" x2="8.5" y2="8.5" stroke="#733b09" strokeWidth="1.5" />
                <line x1="-8.5" y1="8.5" x2="8.5" y2="-8.5" stroke="#733b09" strokeWidth="1.5" />
              </g>
            </g>
          </g>
        </g>

        {/* ============================================================
            10. ANIMATED BULLOCK CART 2 (দ্বিতীয় গরুর গাড়ি / ঠেলাগাড়ি মানুষ সহ)
            Follows behind Cart 1 along the winding road
            ============================================================ */}
        <g
          className="bullock-cart-wrapper-2"
          style={{ animation: "cartMove2 34s linear infinite" }}
        >
          <g
            className="bullock-cart-2"
            style={{ animation: "cartBounce 0.42s ease-in-out infinite 0.1s" }}
          >
            {/* Ox 2 (কালো/গাঢ় বর্ণের সুঠাম গরু) */}
            <g className="ox-2" transform="translate(68, 0)">
              <ellipse cx="24" cy="-14" rx="19" ry="11.5" fill="#2b2826" />
              <ellipse cx="14" cy="-23" rx="7" ry="6" fill="#1f1d1b" />
              <path d="M35 -16 C42 -22 49 -22 53 -16 C55 -12 51 -6 44 -8 Z" fill="#2b2826" />
              <ellipse cx="52" cy="-14" rx="2.5" ry="3" fill="#141312" />
              <path d="M48 -20 Q54 -29 50 -32 Q46 -26 46 -18 Z" fill="#0d0c0c" />
              <path d="M12 -4 L9 13 L13 13 L16 -4 Z" fill="#1f1d1b" />
              <path d="M22 -4 L25 13 L29 13 L25 -4 Z" fill="#141312" />
              <path d="M34 -4 L31 13 L35 13 L38 -4 Z" fill="#1f1d1b" />
              <path d="M42 -4 L46 13 L50 13 L46 -4 Z" fill="#141312" />
              <path d="M5 -16 Q-2 -6 2 4" stroke="#141312" strokeWidth="2" fill="none" />
            </g>

            {/* Yoke Pole */}
            <line x1="32" y1="-8" x2="92" y2="-17" stroke="#663412" strokeWidth="3" strokeLinecap="round" />
            <line x1="90" y1="-21" x2="90" y2="-8" stroke="#2b1a09" strokeWidth="2.5" />

            {/* Cart Frame & Cargo with Greenish Canopy */}
            <g className="cart-body-2">
              <rect x="-30" y="-8" width="62" height="6" rx="2" fill="#663510" stroke="#422108" strokeWidth="1" />
              {/* Straw/Harvest bags under canopy */}
              <ellipse cx="-16" cy="-12" rx="10" ry="6" fill="#e0a943" />
              <ellipse cx="0" cy="-12" rx="10" ry="6" fill="#cca341" />
              {/* Arched Bamboo Canopy (অন্য রঙের গ্রামীণ ছই) */}
              <path d="M-28 -8 C-28 -34 18 -34 18 -8 Z" fill="#8f6629" stroke="#523914" strokeWidth="1.5" />
              <path d="M-18 -8 C-18 -30 8 -30 8 -8" stroke="#523914" strokeWidth="1" fill="none" />
              <path d="M-8 -8 C-8 -32 -2 -32 -2 -8" stroke="#523914" strokeWidth="1" fill="none" />

              {/* Driver 2 (দ্বিতীয় গাড়িয়াল মানুষ - সবুজ জামা ও হলুদ পাগড়ি) */}
              <g className="driver-2" transform="translate(18, -12)">
                <path d="M-2 4 L8 4 L6 -8 L0 -8 Z" fill="#16a34a" />
                <circle cx="3" cy="-13" r="5" fill="#a86e3b" />
                <path d="M-1 -16 Q3 -20 7 -16 Q3 -14 -1 -16 Z" fill="#fbcf0e" />
                <path d="M4 -4 L14 -4" stroke="#a86e3b" strokeWidth="2" strokeLinecap="round" />
                <line x1="14" y1="-4" x2="50" y2="-13" stroke="#fbd34d" strokeWidth="1" strokeDasharray="3 2" />
              </g>

              {/* Rotating Wooden Spoked Wheel */}
              <g
                className="wheel-2"
                transform="translate(-4, 0)"
                style={{
                  transformOrigin: "-4px 0px",
                  animation: "wheelSpin 1.8s linear infinite",
                }}
              >
                <circle cx="0" cy="0" r="14" fill="none" stroke="#4a2505" strokeWidth="3" />
                <circle cx="0" cy="0" r="12" fill="rgba(0,0,0,0.15)" stroke="#733b09" strokeWidth="1.5" />
                <circle cx="0" cy="0" r="3.5" fill="#361a03" />
                <line x1="-12" y1="0" x2="12" y2="0" stroke="#733b09" strokeWidth="1.5" />
                <line x1="0" y1="-12" x2="0" y2="12" stroke="#733b09" strokeWidth="1.5" />
                <line x1="-8.5" y1="-8.5" x2="8.5" y2="8.5" stroke="#733b09" strokeWidth="1.5" />
                <line x1="-8.5" y1="8.5" x2="8.5" y2="-8.5" stroke="#733b09" strokeWidth="1.5" />
              </g>
            </g>
          </g>
        </g>

        {/* ============================================================
            11. RIVER WATER & FLOWING CURRENT (নদীতে প্রবল স্রোত)
            ============================================================ */}
        {/* River Basin */}
        <path
          fill="url(#river)"
          d="M0 760 C240 740 480 770 720 758 C960 746 1200 768 1440 752 L1440 900 L0 900Z"
        ></path>

        {/* River Flowing Current Streams (নদীর স্রোতের রেখা) */}
        <g className="river-currents" stroke="#ffffff" strokeLinecap="round" fill="none">
          <path
            strokeOpacity="0.45"
            strokeWidth="2.5"
            strokeDasharray="40 70 90 50"
            style={{ animation: "riverCurrent 2.6s linear infinite" }}
            d="M-200 776 C240 758 480 782 720 768 C960 756 1200 778 1640 762"
          />
          <path
            strokeOpacity="0.35"
            strokeWidth="2"
            strokeDasharray="60 60 110 60"
            style={{ animation: "riverCurrent 3.2s linear infinite" }}
            d="M-200 812 C200 798 500 824 800 808 C1100 798 1350 820 1640 808"
          />
          <path
            strokeOpacity="0.25"
            strokeWidth="2"
            strokeDasharray="35 80 60 70"
            style={{ animation: "riverCurrent 2.2s linear infinite" }}
            d="M-200 850 C180 836 540 862 840 846 C1140 836 1380 858 1640 842"
          />
        </g>

        {/* 12. Traditional Sailboat Crossing Side to Side */}
        <g className="boat" style={{ animation: "sail 38s linear infinite" }}>
          <path fill="#1a2214" d="M-70 0 C-40 22 40 22 70 0 C50 6 -50 6 -70 0Z"></path>
          <path fill="#1a2214" d="M-30 2 C-26 -18 22 -18 28 2Z"></path>
          <path fill="#1a2214" d="M4 -4 L4 -70 L6 -70 L6 -4Z"></path>
          <path fill="#fbcf0e" d="M6 -68 C34 -52 40 -26 34 -8 L6 -8Z" opacity=".95"></path>
        </g>

        {/* 13. River Wave Layers */}
        <g className="waves" fill="none" stroke="#ffffff" strokeLinecap="round">
          <path
            className="wave w1"
            strokeOpacity=".5"
            strokeWidth="3"
            d="M-200 800 q30 -12 60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0"
          ></path>
          <path
            className="wave w2"
            strokeOpacity=".3"
            strokeWidth="2.5"
            d="M-200 840 q40 -14 80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0"
          ></path>
          <path
            className="wave w3"
            strokeOpacity=".22"
            strokeWidth="2"
            d="M-200 875 q50 -16 100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0"
          ></path>
        </g>
      </svg>

      {/* Radial Darkening Backdrop for readability */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(at_50%_38%,rgba(12,47,33,0.55),rgba(12,47,33,0)_65%)] pointer-events-none"></div>

      {/* ============================================================
          MAIN HERO INNER CONTENT
          ============================================================ */}
      <div className="hero-inner flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-28 sm:pt-32 pb-32 sm:pb-36 max-w-4xl mx-auto w-full z-10">
        
        {/* District & 9 Unions Location Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-semibold mb-4 shadow-lg hover:bg-white/15 transition-all">
          <MapPin className="w-3.5 h-3.5 text-[#FBBF24]" />
          <span>কিশোরগঞ্জ উপজেলা | নীলফামারী জেলা</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#FBBF24]"></span>
          <span className="text-[#FBBF24]">৯টি ইউনিয়ন পরিবার</span>
        </div>

        {/* Central Logo with Rotating Dotted Rings & Floating Up-Down Animation */}
        <div className="logo-wrap relative w-[170px] sm:w-[210px] md:w-[240px] aspect-square mb-4">
          {/* Ring 1: Golden dotted ring rotating clockwise */}
          <svg
            className="logo-ring absolute inset-0 w-full h-full text-[#FBBF24]"
            style={{ animation: "spin 22s linear infinite" }}
            viewBox="0 0 200 200"
            aria-hidden="true"
          >
            <circle
              cx="100"
              cy="100"
              r="96"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="4 9"
              strokeLinecap="round"
            ></circle>
          </svg>

          {/* Ring 2: White counter-rotating ring */}
          <svg
            className="logo-ring logo-ring--2 absolute inset-0 w-full h-full text-white/70"
            style={{ animation: "spinReverse 16s linear infinite" }}
            viewBox="0 0 200 200"
            aria-hidden="true"
          >
            <circle
              cx="100"
              cy="100"
              r="88"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="3 11"
              strokeLinecap="round"
            ></circle>
          </svg>

          {/* Logo floating smoothly up and down inside circle */}
          <div
            className="absolute inset-[9%] w-[82%] h-[82%] flex items-center justify-center"
            style={{ animation: "logoFloat 4.2s ease-in-out infinite" }}
          >
            <Image
              src="/logo.webp"
              alt="কিশোরগঞ্জ উপজেলা সমিতি লোগো"
              width={220}
              height={220}
              priority
              className="w-full h-full object-contain filter drop-shadow-[0_18px_30px_rgba(0,0,0,0.45)]"
            />
          </div>
        </div>

        {/* Eyebrow Slogan */}
        <p className="eyebrow font-serifBangla text-base sm:text-lg md:text-xl text-[#FBBF24] tracking-wide mb-1 drop-shadow-md">
          {settings.slogan}
        </p>

        {/* Title: Authentic Typewriter Effect (Types out on entrance, then stays 100% FIXED & SOLID) */}
        <h1 className="title flex flex-col gap-1 mb-3">
          <span className="font-serifBangla font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight text-[#fbcf0e] drop-shadow-[0_4px_18px_rgba(0,0,0,0.65)] tracking-wide min-h-[1.25em]">
            {displayedTitle}
            {!isTypingDone && (
              <span className="inline-block w-1 sm:w-1.5 h-7 sm:h-11 bg-[#fbcf0e] ml-1.5 animate-pulse align-middle" />
            )}
          </span>
          <span className="text-sm sm:text-lg md:text-xl font-semibold text-emerald-100/90 drop-shadow-md">
            ঢাকায় বসবাসরত কিশোরগঞ্জবাসীর ঐক্য ও সেবামূলক প্ল্যাটফর্ম
          </span>
        </h1>

        {/* Subtitle / Lead Paragraph */}
        <p className="lead max-w-2xl mx-auto text-xs sm:text-sm md:text-base text-white/90 leading-relaxed mb-8 drop-shadow-sm">
          {settings.heroSubheadline}
        </p>

        {/* Live CTA Actions */}
        <div className="hero-actions flex flex-wrap gap-3 sm:gap-4 justify-center items-center w-full max-w-lg">
          {/* 1. Register Button */}
          <Link
            href="/register"
            className="demo-btn-primary min-h-[48px] sm:min-h-[50px] px-7 sm:px-8 rounded-full font-bold text-sm sm:text-base flex items-center gap-2"
          >
            <UserPlus className="w-5 h-5" />
            <span>অনলাইন সদস্য হোন</span>
          </Link>

          {/* 2. Dashboard Login Button */}
          <Link
            href="/login"
            className="demo-btn-ghost min-h-[48px] sm:min-h-[50px] px-6 sm:px-7 rounded-full font-semibold text-sm sm:text-base flex items-center gap-2"
          >
            <LogIn className="w-5 h-5 text-[#3cc3ee]" />
            <span>সদস্য ড্যাশবোর্ড</span>
          </Link>

          {/* 3. Emergency Call Button */}
          <a
            href={`tel:${settings.contactPhone}`}
            className="demo-btn-ghost min-h-[48px] sm:min-h-[50px] px-5 sm:px-6 rounded-full font-semibold text-xs sm:text-sm flex items-center gap-2"
          >
            <Phone className="w-4 h-4 text-[#FBBF24]" />
            <span>জরুরি কল: {settings.contactPhone}</span>
          </a>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <a href="#features" className="scroll-hint block" aria-label="নিচে যান">
        <span></span>
      </a>
    </header>
  );
}
