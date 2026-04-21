"use client";

import { useState } from "react";

export default function StickyBottomCTA() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [consent, setConsent] = useState({ privacy: false, marketing: false });
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const allAgreed = consent.privacy && consent.marketing;

  function toggleAll() {
    const v = !allAgreed;
    setConsent({ privacy: v, marketing: v });
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!consent.privacy || !consent.marketing) {
      alert("필수 약관에 동의해 주세요.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          consent_privacy: consent.privacy,
          consent_marketing: consent.marketing,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        alert(json.error || "전송에 실패했습니다.");
        return;
      }
      setSubmitted(true);
    } catch {
      alert("네트워크 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="fixed bottom-0 inset-x-0 z-40 bg-gradient-to-b from-gold-600/20 via-ink-900/98 to-ink-950 backdrop-blur-xl border-t-2 border-gold-400/70 shadow-[0_-30px_80px_-20px_rgba(223,189,106,0.5)]">
        <div className="container-x py-7 md:py-9 flex flex-col sm:flex-row items-center justify-center gap-4">
          <span className="grid place-items-center h-11 w-11 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-ink-950 shrink-0 shadow-gold-glow">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="text-base md:text-lg font-medium text-white text-center">
            신청이 접수되었습니다. 빠른 시일 내에 담당자가 연락드리겠습니다.
          </span>
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setName("");
              setPhone("");
              setConsent({ privacy: false, marketing: false });
            }}
            className="rounded-full border border-gold-400/60 px-5 py-2.5 text-sm font-medium text-gold-300 hover:bg-gold-400/10 hover:border-gold-300 transition"
          >
            새로 신청
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-gradient-to-b from-gold-500/22 via-ink-900/98 to-ink-950 backdrop-blur-xl border-t-2 border-gold-400/70 shadow-[0_-28px_90px_-20px_rgba(223,189,106,0.5),0_-8px_40px_-10px_rgba(0,0,0,0.9)]">
      {/* animated shimmer top accent */}
      <div className="absolute inset-x-0 -top-[1px] h-[3px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-200 to-transparent animate-shimmer" />
      </div>
      {/* ambient gold glow overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-80"
        style={{
          background:
            "radial-gradient(ellipse at center top, rgba(223,189,106,0.22), transparent 60%)",
        }}
      />

      <div className="relative container-x py-4 md:py-5">
        {/* emphasis headline badge */}
        <div className="flex justify-center mb-2 md:mb-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-300/60 bg-gradient-to-r from-gold-500/18 via-gold-400/12 to-gold-500/18 px-3 md:px-4 py-1 md:py-1.5 shadow-[0_0_20px_-6px_rgba(223,189,106,0.5)]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 rounded-full bg-rose-400 animate-ping opacity-75" />
              <span className="relative rounded-full h-1.5 w-1.5 bg-rose-400" />
            </span>
            <span className="text-[11px] md:text-xs font-bold tracking-tight text-gold-200">
              지금 신청 시 <span className="text-white">무료 VIP 종목</span> 즉시 발송
            </span>
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 md:gap-3 max-w-4xl mx-auto"
        >
          <div className="flex flex-1 gap-2.5 md:gap-3 min-w-0">
            <input
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름"
              aria-label="이름"
              className="flex-1 min-w-0 rounded-full bg-ink-800/90 border border-gold-500/30 px-4 md:px-5 py-2.5 md:py-3 text-sm md:text-base text-white placeholder:text-slate-500 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition"
            />
            <input
              required
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="휴대폰 번호"
              aria-label="휴대폰 번호"
              pattern="[0-9\\-\\s]{9,15}"
              className="flex-1 min-w-0 rounded-full bg-ink-800/90 border border-gold-500/30 px-4 md:px-5 py-2.5 md:py-3 text-sm md:text-base text-white placeholder:text-slate-500 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="relative inline-flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-gold-500 via-gold-200 to-gold-500 px-6 md:px-9 py-2.5 md:py-3 text-sm md:text-base font-bold text-ink-950 shadow-[0_10px_40px_-10px_rgba(223,189,106,0.75),inset_0_1px_0_rgba(255,255,255,0.45)] hover:shadow-[0_12px_55px_-5px_rgba(223,189,106,0.95),inset_0_1px_0_rgba(255,255,255,0.55)] hover:-translate-y-0.5 transition disabled:opacity-60 whitespace-nowrap tracking-tight animate-pulse-soft"
          >
            <span className="absolute inset-0 rounded-full ring-2 ring-gold-100/50 pointer-events-none" />
            <span className="relative">{loading ? "전송 중..." : "무료 종목 받기"}</span>
            {!loading && (
              <svg className="relative" width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </form>

        <div className="mt-3 md:mt-3.5 flex flex-wrap items-center justify-center gap-x-4 md:gap-x-6 gap-y-1.5 text-[11px] md:text-xs text-slate-400">
          <label className="inline-flex items-center gap-1.5 cursor-pointer hover:text-gold-300 transition">
            <input
              type="checkbox"
              checked={allAgreed}
              onChange={toggleAll}
              className="h-3.5 w-3.5 md:h-4 md:w-4 rounded border-gold-400/50 bg-ink-800 text-gold-400 focus:ring-gold-400/30 cursor-pointer"
            />
            <span className="text-gold-300 font-semibold">모두 동의</span>
          </label>

          <label className="inline-flex items-center gap-1.5 cursor-pointer hover:text-gold-300 transition">
            <input
              type="checkbox"
              checked={consent.privacy}
              onChange={(e) => setConsent((c) => ({ ...c, privacy: e.target.checked }))}
              className="h-3.5 w-3.5 md:h-4 md:w-4 rounded border-gold-400/50 bg-ink-800 text-gold-400 focus:ring-gold-400/30 cursor-pointer"
            />
            <span>
              <span className="text-rose-400 font-medium">(필수)</span> 개인정보 제3자 제공
            </span>
          </label>

          <label className="inline-flex items-center gap-1.5 cursor-pointer hover:text-gold-300 transition">
            <input
              type="checkbox"
              checked={consent.marketing}
              onChange={(e) => setConsent((c) => ({ ...c, marketing: e.target.checked }))}
              className="h-3.5 w-3.5 md:h-4 md:w-4 rounded border-gold-400/50 bg-ink-800 text-gold-400 focus:ring-gold-400/30 cursor-pointer"
            />
            <span>
              <span className="text-rose-400 font-medium">(필수)</span> 광고성 정보수신
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}
