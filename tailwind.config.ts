import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          DEFAULT: "#800000",
          50: "#fdf2f2",
          100: "#fae5e5",
          200: "#f4caca",
          300: "#eba8a8",
          400: "#dc7676",
          500: "#c44d4d",
          600: "#a83333",
          700: "#8a2424",
          800: "#800000",
          900: "#5c0000",
          950: "#330000",
        },
        gold: {
          DEFAULT: "#D4AF37",
          50: "#fdfaee",
          100: "#faf2cf",
          200: "#f5e49a",
          300: "#eed064",
          400: "#e5b836",
          500: "#D4AF37",
          600: "#b88d24",
          700: "#946b21",
          800: "#7a5621",
          900: "#67481f",
          950: "#3b2710",
        },
        cream: "#FFFDF7",
        ink: "#1A1A1A",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
      },
      backgroundImage: {
        "maroon-gradient":
          "linear-gradient(135deg, #800000 0%, #5c0000 50%, #800000 100%)",
        "gold-shimmer":
          "linear-gradient(135deg, #D4AF37 0%, #f5e49a 50%, #D4AF37 100%)",
      },
      boxShadow: {
        elegant: "0 10px 40px -10px rgba(128, 0, 0, 0.15)",
        "elegant-lg": "0 20px 60px -15px rgba(128, 0, 0, 0.2)",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
        "fade-in": "fadeIn 1s ease-out forwards",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
