"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all ${
        scrolled
          ? "bg-ink-950/85 backdrop-blur-xl border-b border-gold-500/15 shadow-[0_2px_30px_-15px_rgba(0,0,0,0.8)]"
          : "bg-ink-950/50 backdrop-blur-md border-b border-transparent"
      }`}
    >
      <div className="container-x flex h-16 md:h-[72px] items-center justify-between gap-4">
        <a
          href="#home"
          aria-label="PL Investment 홈"
          className="flex items-center gap-2.5 md:gap-3 group min-w-0"
        >
          <span className="relative grid place-items-center h-11 w-11 md:h-12 md:w-12 rounded-xl bg-gradient-to-br from-ink-800 to-ink-900 border border-gold-500/40 shadow-lg shadow-black/40 overflow-hidden shrink-0">
            <span className="absolute inset-0 bg-grid opacity-50" />
            <Image
              src="/logo/logo-icon.png"
              alt="PL Investment"
              width={128}
              height={128}
              priority
              className="relative h-8 w-8 md:h-9 md:w-9 object-contain"
            />
          </span>
          <span className="flex flex-col leading-none min-w-0">
            <span className="font-display text-base md:text-xl font-bold tracking-[0.14em] text-white truncate">
              PL INVESTMENT
            </span>
            <span className="mt-1 md:mt-1.5 text-[10px] md:text-xs font-semibold tracking-[0.28em] text-white/70">
              피엘 인베스트먼트
            </span>
          </span>
        </a>

        <div className="flex items-center gap-2.5 md:gap-4 shrink-0">
          <a
            href="tel:0269533081"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm md:text-base font-bold text-white hover:text-gold-300 transition"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-gold-300 md:w-[18px] md:h-[18px]">
              <path
                d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.37 1.9.72 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0122 16.92z"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            02-6953-3081
          </a>
          <a
            href="#contact"
            className="relative inline-flex items-center gap-1.5 rounded-full bg-white px-4 md:px-5 py-2 md:py-2.5 text-sm md:text-base font-bold text-ink-950 shadow-[0_8px_28px_-10px_rgba(255,255,255,0.5)] hover:shadow-[0_10px_40px_-5px_rgba(255,255,255,0.7)] hover:-translate-y-0.5 transition whitespace-nowrap"
          >
            무료 상담
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="md:w-4 md:h-4">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}
