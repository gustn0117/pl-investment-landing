"use client";

import Link from "next/link";
import { useEffect } from "react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export default function ThankYouPage() {
  useEffect(() => {
    window.fbq?.("track", "Lead");
  }, []);

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-ink-950 text-white px-6 py-16">
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="blob bg-gold-500 -top-32 -left-20 w-[28rem] h-[28rem]" />
      <div className="blob bg-gold-700 -bottom-32 -right-20 w-[30rem] h-[30rem]" />
      <div className="absolute inset-x-0 top-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(223,189,106,0.5), transparent)" }} />

      <div className="relative w-full max-w-lg text-center">
        <span className="grid place-items-center mx-auto h-20 w-20 md:h-24 md:w-24 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-ink-950 shadow-gold-glow">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>

        <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-500/5 px-4 py-1.5 text-[11px] md:text-xs font-medium tracking-[0.3em] text-gold-300 backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-gold-400 animate-shimmer" />
          PL INVESTMENT
        </div>

        <h1 className="mt-5 font-display text-3xl md:text-5xl font-medium leading-tight tracking-tight">
          신청이 완료되었습니다
        </h1>

        <div className="mt-6 h-px w-16 mx-auto bg-gradient-to-r from-transparent via-gold-400 to-transparent" />

        <p className="mt-6 text-base md:text-lg text-slate-300 leading-relaxed font-light">
          소중한 신청 감사드립니다.
          <br />
          담당자가 빠른 시일 내에 연락드리겠습니다.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="tel:0269533081"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-400 via-gold-300 to-gold-400 px-7 py-3.5 text-base font-bold text-ink-950 shadow-gold-glow hover:shadow-[0_0_40px_rgba(223,189,106,0.6)] hover:-translate-y-0.5 transition"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.37 1.9.72 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0122 16.92z"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            지금 바로 통화하기
          </a>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-gold-400/35 bg-white/[0.03] px-7 py-3.5 text-base font-medium text-gold-200 backdrop-blur transition hover:bg-gold-400/10 hover:border-gold-300/70 hover:text-gold-100"
          >
            홈으로 돌아가기
          </Link>
        </div>

        <p className="mt-8 text-xs text-slate-500">
          상담 가능 시간 · 평일 09:00 ~ 18:00 (주말 및 공휴일 휴무)
        </p>
      </div>
    </main>
  );
}
