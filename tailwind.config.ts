import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fbf7ec",
          100: "#f5ead0",
          200: "#ecd69c",
          300: "#dfbd6a",
          400: "#cfa64f",
          500: "#bf9140",
          600: "#a77a35",
          700: "#85602c",
          800: "#664a26",
          900: "#4a361e",
          950: "#2c1f11",
        },
        gold: {
          50: "#fbf7ec",
          100: "#f5ead0",
          200: "#ecd69c",
          300: "#dfbd6a",
          400: "#cfa64f",
          500: "#bf9140",
          600: "#a77a35",
          700: "#85602c",
          800: "#664a26",
          900: "#4a361e",
          950: "#2c1f11",
        },
        ink: {
          900: "#07080f",
          800: "#0e1220",
          700: "#151b2e",
          600: "#1f2740",
        },
      },
      fontFamily: {
        sans: ['var(--font-noto)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease-out both',
        'fade-in': 'fadeIn 0.8s ease-out both',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'slow-spin': 'spin 28s linear infinite',
        'marquee': 'marquee 40s linear infinite',
        'pulse-soft': 'pulseSoft 4s ease-in-out infinite',
        'scan': 'scan 8s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.55' },
          '50%': { opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-33.333%)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.7' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
      backgroundImage: {
        'gold-gradient':
          'linear-gradient(135deg, #ecd69c 0%, #cfa64f 35%, #bf9140 55%, #dfbd6a 80%, #85602c 100%)',
        'gold-shine':
          'linear-gradient(120deg, rgba(223,189,106,0) 0%, rgba(223,189,106,0.45) 50%, rgba(223,189,106,0) 100%)',
      },
      boxShadow: {
        'gold-soft': '0 10px 30px -12px rgba(191,145,64,0.35)',
        'gold-glow': '0 20px 60px -15px rgba(223,189,106,0.45)',
      },
    },
  },
  plugins: [],
};
export default config;
