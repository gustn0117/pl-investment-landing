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
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white border-t-2 border-gold-400/80 shadow-[0_-30px_80px_-20px_rgba(0,0,0,0.35)]">
        <div className="container-x py-7 md:py-9 flex flex-col sm:flex-row items-center justify-center gap-4">
          <span className="grid place-items-center h-11 w-11 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-white shrink-0 shadow-gold-glow">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="text-base md:text-lg font-medium text-ink-950 text-center">
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
            className="rounded-full border border-gold-500/70 px-5 py-2.5 text-sm font-semibold text-gold-700 hover:bg-gold-50 hover:border-gold-600 transition"
          >
            새로 신청
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-white border-t-2 border-gold-400/80 shadow-[0_-28px_90px_-20px_rgba(0,0,0,0.45),0_-8px_40px_-10px_rgba(0,0,0,0.25)]">
      {/* animated gold shimmer top accent on white */}
      <div className="absolute inset-x-0 -top-[1px] h-[3px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-400 to-transparent animate-shimmer" />
      </div>
      {/* subtle gold ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-70"
        style={{
          background:
            "radial-gradient(ellipse at center top, rgba(223,189,106,0.18), transparent 60%)",
        }}
      />

      <div className="relative container-x py-6 md:py-8">
        {/* emphasis headline badge (gold on white) */}
        <div className="flex justify-center mb-4 md:mb-5">
          <div className="inline-flex items-center gap-2.5 md:gap-3 rounded-full border-[1.5px] border-gold-400/80 bg-gold-50 px-6 md:px-8 py-2.5 md:py-3.5 shadow-[0_0_32px_-6px_rgba(223,189,106,0.55)]">
            <span className="relative flex h-2.5 w-2.5 md:h-3 md:w-3">
              <span className="absolute inset-0 rounded-full bg-rose-500 animate-ping opacity-75" />
              <span className="relative rounded-full h-2.5 w-2.5 md:h-3 md:w-3 bg-rose-500" />
            </span>
            <span className="text-sm md:text-lg font-bold tracking-tight text-ink-950">
              지금 신청 시 <span className="text-gold-700">무료 VIP 종목</span> 즉시 발송
            </span>
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 md:gap-4 max-w-5xl mx-auto"
        >
          <div className="flex flex-1 gap-3 md:gap-4 min-w-0">
            <input
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름"
              aria-label="이름"
              className="flex-1 min-w-0 rounded-full bg-white border-2 border-slate-300 px-5 md:px-6 py-4 md:py-5 text-base md:text-lg text-ink-950 placeholder:text-slate-400 focus:border-gold-500 focus:ring-4 focus:ring-gold-400/25 outline-none transition"
            />
            <input
              required
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="휴대폰 번호"
              aria-label="휴대폰 번호"
              pattern="[0-9\\-\\s]{9,15}"
              className="flex-1 min-w-0 rounded-full bg-white border-2 border-slate-300 px-5 md:px-6 py-4 md:py-5 text-base md:text-lg text-ink-950 placeholder:text-slate-400 focus:border-gold-500 focus:ring-4 focus:ring-gold-400/25 outline-none transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="relative inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-red-600 via-rose-500 to-red-600 px-9 md:px-14 py-4 md:py-5 text-base md:text-xl font-extrabold text-white shadow-[0_15px_55px_-8px_rgba(244,63,94,0.7),inset_0_1px_0_rgba(255,255,255,0.35)] hover:shadow-[0_18px_75px_-4px_rgba(244,63,94,0.95),inset_0_1px_0_rgba(255,255,255,0.45)] hover:-translate-y-0.5 transition disabled:opacity-60 whitespace-nowrap tracking-tight"
          >
            <span className="absolute inset-0 rounded-full ring-2 ring-rose-200/80 pointer-events-none" />
            <span className="relative">{loading ? "전송 중..." : "무료 종목 받기"}</span>
            {!loading && (
              <svg className="relative" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </form>

        <div className="mt-4 md:mt-5 flex flex-wrap items-center justify-center gap-x-5 md:gap-x-7 gap-y-2 text-xs md:text-sm text-slate-600">
          <label className="inline-flex items-center gap-2 cursor-pointer hover:text-ink-950 transition">
            <input
              type="checkbox"
              checked={allAgreed}
              onChange={toggleAll}
              className="h-4 w-4 md:h-[18px] md:w-[18px] rounded border-slate-400 bg-white text-gold-500 focus:ring-gold-400/40 cursor-pointer"
            />
            <span className="text-ink-950 font-semibold">모두 동의</span>
          </label>

          <label className="inline-flex items-center gap-2 cursor-pointer hover:text-ink-950 transition">
            <input
              type="checkbox"
              checked={consent.privacy}
              onChange={(e) => setConsent((c) => ({ ...c, privacy: e.target.checked }))}
              className="h-4 w-4 md:h-[18px] md:w-[18px] rounded border-slate-400 bg-white text-gold-500 focus:ring-gold-400/40 cursor-pointer"
            />
            <span>
              <span className="text-rose-500 font-semibold">(필수)</span> 개인정보 제3자 제공
            </span>
          </label>

          <label className="inline-flex items-center gap-2 cursor-pointer hover:text-ink-950 transition">
            <input
              type="checkbox"
              checked={consent.marketing}
              onChange={(e) => setConsent((c) => ({ ...c, marketing: e.target.checked }))}
              className="h-4 w-4 md:h-[18px] md:w-[18px] rounded border-slate-400 bg-white text-gold-500 focus:ring-gold-400/40 cursor-pointer"
            />
            <span>
              <span className="text-rose-500 font-semibold">(필수)</span> 광고성 정보수신
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}
