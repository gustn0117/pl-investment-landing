"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const NAV = [
  { href: "#home", label: "메인" },
  { href: "#about", label: "회사 소개" },
  { href: "#services", label: "서비스 안내" },
  { href: "#results", label: "수익내역" },
  { href: "#contact", label: "고객센터" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV.map((n) => n.href.replace("#", ""));
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const close = () => setOpen(false);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-gold-200/60 shadow-[0_2px_20px_-10px_rgba(191,145,64,0.25)]"
          : "bg-white/70 backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <div className="container-x flex h-16 md:h-20 items-center justify-between">
        <a
          href="#home"
          onClick={close}
          aria-label="PL Investment 홈"
          className="flex items-center gap-3 group"
        >
          <span className="relative grid place-items-center h-11 w-11 md:h-12 md:w-12 rounded-xl bg-gradient-to-br from-ink-900 to-ink-700 border border-gold-500/30 shadow-md shadow-ink-900/10 overflow-hidden">
            <span className="absolute inset-0 bg-grid opacity-50" />
            <Image
              src="/logo/logo-icon.png"
              alt="PL Investment"
              width={96}
              height={96}
              priority
              className="relative h-9 w-9 md:h-10 md:w-10 object-contain"
            />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-serif text-[15px] md:text-[17px] font-bold tracking-[0.18em] text-ink-900">
              PL INVESTMENT
            </span>
            <span className="mt-1 text-[10px] md:text-[11px] font-medium tracking-[0.3em] text-gold-700">
              피엘 인베스트먼트
            </span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-9">
          {NAV.map((n) => {
            const isActive = active === n.href.slice(1);
            return (
              <a
                key={n.href}
                href={n.href}
                onClick={close}
                className={`text-sm font-medium transition relative ${
                  isActive ? "text-gold-700" : "text-slate-700 hover:text-gold-700"
                }`}
              >
                {n.label}
                <span
                  className={`absolute -bottom-1.5 left-0 right-0 mx-auto h-[2px] rounded-full transition-all ${
                    isActive ? "w-6 bg-gradient-to-r from-gold-500 to-gold-300" : "w-0 bg-gold-500"
                  }`}
                />
              </a>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a
            href="tel:0269533081"
            className="flex items-center gap-1.5 text-sm font-bold text-ink-800 hover:text-gold-700 transition"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-gold-600">
              <path
                d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.37 1.9.72 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0122 16.92z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            02-6953-3081
          </a>
          <a
            href="#contact"
            onClick={close}
            className="relative inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 px-5 py-2 text-sm font-semibold text-ink-900 shadow-gold-soft hover:shadow-gold-glow transition"
          >
            무료 상담
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        <button
          aria-label="menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-gold-300/50 text-ink-800 hover:border-gold-500/70 transition"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            {open ? (
              <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-gold-200/60 bg-white/95 backdrop-blur">
          <div className="container-x py-4 flex flex-col gap-1">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={close}
                className={`px-3 py-3 rounded-lg text-sm font-medium transition ${
                  active === n.href.slice(1)
                    ? "bg-gold-50 text-gold-700"
                    : "text-slate-700 hover:bg-gold-50/50"
                }`}
              >
                {n.label}
              </a>
            ))}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gold-100">
              <a href="tel:0269533081" className="text-sm font-bold text-ink-800">
                02-6953-3081
              </a>
              <a
                href="#contact"
                onClick={close}
                className="rounded-full bg-gradient-to-r from-gold-600 to-gold-400 px-4 py-2 text-sm font-semibold text-ink-900 shadow-gold-soft"
              >
                무료 상담
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
