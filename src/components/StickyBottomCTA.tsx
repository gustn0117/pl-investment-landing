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
      <div className="fixed bottom-0 inset-x-0 z-40 bg-gradient-to-b from-ink-900/95 to-ink-950/95 backdrop-blur-xl border-t border-gold-400/40 shadow-[0_-20px_60px_-20px_rgba(0,0,0,0.7)]">
        <div className="container-x py-4 md:py-5 flex items-center justify-center gap-3">
          <span className="grid place-items-center h-7 w-7 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-ink-950 shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="text-sm md:text-base font-medium text-white">
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
            className="ml-2 rounded-full border border-gold-400/50 px-4 py-1.5 text-xs font-medium text-gold-300 hover:bg-gold-400/10 transition"
          >
            새로 신청
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-gradient-to-b from-ink-900/95 to-ink-950/98 backdrop-blur-xl border-t border-gold-400/25 shadow-[0_-20px_60px_-20px_rgba(0,0,0,0.7)]">
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(223,189,106,0.7), transparent)",
        }}
      />
      <div className="container-x py-3 md:py-4">
        <form
          onSubmit={onSubmit}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 sm:gap-3 max-w-3xl mx-auto"
        >
          <div className="flex flex-1 gap-2 min-w-0">
            <input
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름"
              aria-label="이름"
              className="flex-1 min-w-0 rounded-full bg-ink-800/80 border border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-gold-400/60 focus:ring-2 focus:ring-gold-400/20 outline-none transition"
            />
            <input
              required
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="휴대폰 번호"
              aria-label="휴대폰 번호"
              pattern="[0-9\\-\\s]{9,15}"
              className="flex-1 min-w-0 rounded-full bg-ink-800/80 border border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-gold-400/60 focus:ring-2 focus:ring-gold-400/20 outline-none transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="relative inline-flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-gold-400 via-gold-300 to-gold-400 px-5 md:px-7 py-2.5 text-sm font-bold text-ink-950 shadow-gold-soft hover:shadow-gold-glow hover:-translate-y-0.5 transition disabled:opacity-60 whitespace-nowrap"
          >
            {loading ? "전송 중..." : "무료 종목 받기"}
            {!loading && (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </form>

        <div className="mt-2.5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[11px] md:text-xs text-slate-400">
          <label className="inline-flex items-center gap-1.5 cursor-pointer hover:text-gold-300 transition">
            <input
              type="checkbox"
              checked={allAgreed}
              onChange={toggleAll}
              className="h-3.5 w-3.5 rounded border-gold-400/40 bg-ink-800 text-gold-400 focus:ring-gold-400/30 cursor-pointer"
            />
            <span className="text-gold-300 font-medium">모두 동의</span>
          </label>

          <label className="inline-flex items-center gap-1.5 cursor-pointer hover:text-gold-300 transition">
            <input
              type="checkbox"
              checked={consent.privacy}
              onChange={(e) => setConsent((c) => ({ ...c, privacy: e.target.checked }))}
              className="h-3.5 w-3.5 rounded border-gold-400/40 bg-ink-800 text-gold-400 focus:ring-gold-400/30 cursor-pointer"
            />
            <span>
              <span className="text-rose-400">(필수)</span> 개인정보 제3자 제공
            </span>
          </label>

          <label className="inline-flex items-center gap-1.5 cursor-pointer hover:text-gold-300 transition">
            <input
              type="checkbox"
              checked={consent.marketing}
              onChange={(e) => setConsent((c) => ({ ...c, marketing: e.target.checked }))}
              className="h-3.5 w-3.5 rounded border-gold-400/40 bg-ink-800 text-gold-400 focus:ring-gold-400/30 cursor-pointer"
            />
            <span>
              <span className="text-rose-400">(필수)</span> 광고성 정보수신
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}
