"use client";

import { useState } from "react";

const TYPES = ["투자 상담", "포트폴리오 점검", "제휴 문의", "기타 문의"];

export default function InquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || ""),
      phone: String(fd.get("phone") || ""),
      email: String(fd.get("email") || ""),
      type: String(fd.get("type") || ""),
      message: String(fd.get("message") || ""),
    };
    setLoading(true);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(json.error || "전송에 실패했습니다. 잠시 후 다시 시도해 주세요.");
        return;
      }
      setSubmitted(true);
    } catch {
      setError("네트워크 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-3xl border border-gold-400/40 bg-ink-800/60 backdrop-blur-sm p-10 md:p-14 text-center shadow-dark-panel">
        <span className="grid place-items-center mx-auto h-16 w-16 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-ink-950 shadow-gold-glow">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h3 className="mt-6 font-display text-2xl md:text-3xl font-medium text-white">
          문의가 접수되었습니다
        </h3>
        <p className="mt-3 text-base text-slate-400">
          빠른 시일 내에 담당자가 연락드리겠습니다. 감사합니다.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-8 inline-flex rounded-full border border-gold-400/60 px-6 py-2.5 text-sm font-medium text-gold-300 hover:bg-gold-400 hover:text-ink-950 transition"
        >
          새 문의 작성
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative rounded-3xl border border-white/10 bg-ink-800/50 backdrop-blur-sm p-8 md:p-10 shadow-dark-panel"
    >
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(223,189,106,0.6), transparent)",
        }}
      />
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="이름" required>
          <input name="name" type="text" required className={inputCls} placeholder="홍길동" />
        </Field>
        <Field label="연락처" required>
          <input name="phone" type="tel" required className={inputCls} placeholder="010-0000-0000" />
        </Field>
        <Field label="이메일" className="md:col-span-2">
          <input name="email" type="email" className={inputCls} placeholder="example@email.com" />
        </Field>
        <Field label="문의 유형" required className="md:col-span-2">
          <select name="type" required className={inputCls + " appearance-none bg-no-repeat bg-[right_1rem_center] bg-[length:14px]"} defaultValue="">
            <option value="" disabled>유형을 선택해 주세요</option>
            {TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </Field>
        <Field label="문의 내용" required className="md:col-span-2">
          <textarea
            name="message"
            required
            rows={6}
            className={inputCls + " resize-none"}
            placeholder="문의하실 내용을 자세히 작성해 주세요."
          />
        </Field>
      </div>

      <label className="mt-6 flex items-start gap-2.5 text-xs text-slate-400">
        <input type="checkbox" required className="mt-0.5 h-4 w-4 rounded border-gold-400/40 bg-ink-900 text-gold-400 focus:ring-gold-400/30" />
        <span>
          개인정보 수집·이용에 동의합니다. 수집된 정보는 문의 답변 목적 외에 사용되지
          않습니다.
        </span>
      </label>

      {error && (
        <div className="mt-4 rounded-lg border border-rose-400/40 bg-rose-500/10 px-4 py-2.5 text-sm text-rose-300">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-7 w-full md:w-auto btn-primary disabled:opacity-60"
      >
        {loading ? "전송 중..." : "문의 보내기"}
        {!loading && (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>
    </form>
  );
}

const inputCls =
  "w-full rounded-xl border border-white/10 bg-ink-900/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-gold-400/60 focus:bg-ink-900 focus:ring-2 focus:ring-gold-400/20 outline-none transition";

function Field({
  label,
  required,
  children,
  className = "",
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-sm font-medium text-slate-200">
        {label}
        {required && <span className="text-gold-400 ml-1">*</span>}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  );
}
