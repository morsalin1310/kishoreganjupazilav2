import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0B3B2C",
          light: "#145A43",
          dark: "#06261C",
          50: "#f0fdf4",
          100: "#dcfce7",
          600: "#16a34a",
          800: "#166534",
          900: "#0B3B2C",
        },
        sky: {
          DEFAULT: "#00A3E0",
          hover: "#0284C7",
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          500: "#00A3E0",
          600: "#0284c7",
        },
        golden: {
          DEFAULT: "#FBBF24",
          hover: "#F59E0B",
          light: "#FEF3C7",
          dark: "#D97706",
        },
        crimson: {
          DEFAULT: "#DC2626",
          dark: "#B91C1C",
          light: "#FEE2E2",
        },
        surface: {
          DEFAULT: "#FDFBF7",
          warm: "#F7F5EE",
          card: "#FFFFFF",
        },
      },
      fontFamily: {
        bangla: ["'Hind Siliguri'", "'Noto Sans Bengali'", "'SolaimanLipi'", "system-ui", "sans-serif"],
        serifBangla: ["'Tiro Bangla'", "'Kalpurush'", "serif"],
      },
      animation: {
        // River waves
        "wave-slow":    "wave 8s ease-in-out infinite",
        "wave-medium":  "wave 5s ease-in-out infinite",
        // Boat bobbing in place
        "float-boat":   "floatBoat 6s ease-in-out infinite",
        // Boat crossing river
        "sail-cross":   "sailboatCross 28s linear infinite",
        // Sun
        "sun-pulse":    "sunPulse 4s ease-in-out infinite",
        "sun-rise":     "sunRise 3.5s cubic-bezier(0.22,1,0.36,1) forwards",
        "sun-glow":     "sunGlow 4s ease-out forwards",
        // Birds
        "bird-fly-1":   "birdFly1 18s linear infinite",
        "bird-fly-2":   "birdFly2 24s linear infinite",
        "bird-fly-3":   "birdFly3 20s linear infinite",
        // Wings
        "wing-flap-l":  "wingFlapLeft 0.5s ease-in-out infinite",
        "wing-flap-r":  "wingFlapRight 0.5s ease-in-out infinite",
        // Grass
        "grass-sway":   "grassSway 2.5s ease-in-out infinite",
        "grass-sway-2": "grassSway2 3.2s ease-in-out infinite",
        // Clouds
        "cloud-drift":  "cloudDrift 30s ease-in-out infinite alternate",
        "cloud-drift-2":"cloudDrift2 24s ease-in-out infinite alternate",
        // Misc
        "twinkle":      "twinkle 2s ease-in-out infinite",
        "water-ripple": "waterRipple 3s ease-in-out infinite",
        "fade-up":      "fadeUp 0.8s ease-out forwards",
        "ticker-scroll":"tickerScroll 25s linear infinite",
        "logo-pulse":   "logoPulse 3s ease-in-out infinite",
        "spin-slow":    "spinSlow 12s linear infinite",
        "spin-slow-rev":"spinSlowReverse 10s linear infinite",
      },
      keyframes: {
        wave: {
          "0%, 100%": { transform: "translateX(0) translateY(0)" },
          "50%": { transform: "translateX(-25px) translateY(4px)" },
        },
        floatBoat: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-6px) rotate(1.5deg)" },
        },
        sunPulse: {
          "0%, 100%": {
            boxShadow: "0 0 60px 20px rgba(220,38,38,0.4), 0 0 120px 40px rgba(220,38,38,0.2)",
            transform: "scale(1)",
          },
          "50%": {
            boxShadow: "0 0 90px 35px rgba(220,38,38,0.6), 0 0 180px 70px rgba(220,38,38,0.3)",
            transform: "scale(1.04)",
          },
        },
        sunRise: {
          "0%":   { transform: "translateY(140px) scale(0.6)", opacity: "0", filter: "blur(8px)" },
          "20%":  { opacity: "0.6", filter: "blur(3px)" },
          "60%":  { transform: "translateY(20px) scale(0.92)", opacity: "0.9", filter: "blur(1px)" },
          "100%": { transform: "translateY(0px) scale(1)", opacity: "1", filter: "blur(0px)" },
        },
        sunGlow: {
          "0%":   { opacity: "0", transform: "scale(0.5)" },
          "40%":  { opacity: "0.5" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        sailboatCross: {
          "0%":   { transform: "translateX(-180px) translateY(0px)" },
          "10%":  { transform: "translateX(-100px) translateY(-3px)" },
          "25%":  { transform: "translateX(0px) translateY(0px)" },
          "40%":  { transform: "translateX(120px) translateY(-4px)" },
          "50%":  { transform: "translateX(220px) translateY(0px)" },
          "60%":  { transform: "translateX(320px) translateY(-3px)" },
          "75%":  { transform: "translateX(440px) translateY(0px)" },
          "90%":  { transform: "translateX(560px) translateY(-2px)" },
          "100%": { transform: "translateX(680px) translateY(0px)" },
        },
        birdFly1: {
          "0%":   { transform: "translateX(-80px) translateY(0px)", opacity: "0" },
          "5%":   { opacity: "1" },
          "95%":  { opacity: "1" },
          "100%": { transform: "translateX(110vw) translateY(-30px)", opacity: "0" },
        },
        birdFly2: {
          "0%":   { transform: "translateX(-60px) translateY(10px)", opacity: "0" },
          "8%":   { opacity: "0.9" },
          "92%":  { opacity: "0.9" },
          "100%": { transform: "translateX(110vw) translateY(-20px)", opacity: "0" },
        },
        birdFly3: {
          "0%":   { transform: "translateX(-40px) translateY(-5px)", opacity: "0" },
          "10%":  { opacity: "0.8" },
          "90%":  { opacity: "0.8" },
          "100%": { transform: "translateX(110vw) translateY(-40px)", opacity: "0" },
        },
        wingFlapLeft: {
          "0%, 100%": { transform: "scaleY(1) translateY(0)" },
          "50%":       { transform: "scaleY(-0.6) translateY(2px)" },
        },
        wingFlapRight: {
          "0%, 100%": { transform: "scaleY(1) translateY(0)" },
          "50%":       { transform: "scaleY(-0.6) translateY(2px)" },
        },
        grassSway: {
          "0%, 100%": { transform: "rotate(-4deg) translateX(0)" },
          "33%":       { transform: "rotate(5deg) translateX(1px)" },
          "66%":       { transform: "rotate(-2deg) translateX(-1px)" },
        },
        grassSway2: {
          "0%, 100%": { transform: "rotate(3deg) translateX(0)" },
          "40%":       { transform: "rotate(-6deg) translateX(-1px)" },
          "70%":       { transform: "rotate(4deg) translateX(1px)" },
        },
        cloudDrift: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(60px)" },
        },
        cloudDrift2: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-40px)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.3", transform: "scale(1)" },
          "50%":       { opacity: "1", transform: "scale(1.4)" },
        },
        waterRipple: {
          "0%":   { transform: "scaleX(1) translateY(0)", opacity: "0.6" },
          "50%":  { transform: "scaleX(1.05) translateY(2px)", opacity: "0.9" },
          "100%": { transform: "scaleX(1) translateY(0)", opacity: "0.6" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        tickerScroll: {
          "0%":   { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        logoPulse: {
          "0%, 100%": { filter: "drop-shadow(0 0 8px rgba(251,191,36,0.6))" },
          "50%":       { filter: "drop-shadow(0 0 20px rgba(251,191,36,0.9))" },
        },
        spinSlow: {
          from: { transform: "rotate(0deg)" },
          to:   { transform: "rotate(360deg)" },
        },
        spinSlowReverse: {
          from: { transform: "rotate(0deg)" },
          to:   { transform: "rotate(-360deg)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
