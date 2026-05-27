import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      colors: {
        // Cream / paper background scale — lightest 50, deepest 950 (warm near-black)
        cream: {
          50: "#FBF7EE",   // page bg
          100: "#F4EFE2",  // primary brand cream
          200: "#ECE5D2",  // softer panels
          300: "#DDD3B9",  // dividers / muted
        },
        // Warm ink scale for text
        ink: {
          50: "#FBF7EE",   // for inversions
          100: "#EFE9DC",
          200: "#A89E8B",
          400: "#7A6F5E",   // muted body
          600: "#3D362C",   // body
          800: "#1F1B14",   // headings
          900: "#13110C",
          950: "#0A0907",
        },
        // Copper / cognac accent (matches the brand)
        copper: {
          400: "#C8946A",
          500: "#B07D52",  // primary accent
          600: "#9A6A41",
          700: "#7E5532",
        },
      },
      animation: {
        scroll: "scroll var(--duration, 40s) linear infinite",
        "scroll-reverse": "scroll-reverse var(--duration, 40s) linear infinite",
        "fade-up": "fade-up 0.8s ease-out both",
      },
      keyframes: {
        scroll: { to: { transform: "translateX(calc(-50% - 0.5rem))" } },
        "scroll-reverse": {
          from: { transform: "translateX(calc(-50% - 0.5rem))" },
          to: { transform: "translateX(0)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
