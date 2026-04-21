"use client";

import { useState } from "react";

const TYPES = ["투자 상담", "포트폴리오 점검", "제휴 문의", "기타 문의"];

export default function InquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  }

  if (submitted) {
    return (
      <div className="rounded-3xl border border-gold-300/70 bg-gradient-to-br from-gold-50 to-white p-10 md:p-14 text-center shadow-gold-soft">
        <span className="grid place-items-center mx-auto h-16 w-16 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-white shadow-gold-glow">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h3 className="mt-6 font-serif text-2xl md:text-3xl font-bold text-ink-900">
          문의가 접수되었습니다
        </h3>
        <p className="mt-3 text-base text-slate-600">
          빠른 시일 내에 담당자가 연락드리겠습니다. 감사합니다.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-8 inline-flex rounded-full border border-gold-500 px-6 py-2.5 text-sm font-semibold text-gold-700 hover:bg-gold-500 hover:text-white transition"
        >
          새 문의 작성
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative rounded-3xl border border-gold-200/70 bg-white p-8 md:p-10 shadow-gold-soft"
    >
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(191,145,64,0.6), transparent)",
        }}
      />
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="이름" required>
          <input type="text" required className={inputCls} placeholder="홍길동" />
        </Field>
        <Field label="연락처" required>
          <input type="tel" required className={inputCls} placeholder="010-0000-0000" />
        </Field>
        <Field label="이메일" className="md:col-span-2">
          <input type="email" className={inputCls} placeholder="example@email.com" />
        </Field>
        <Field label="문의 유형" required className="md:col-span-2">
          <select required className={inputCls + " appearance-none bg-no-repeat bg-[right_1rem_center] bg-[length:14px]"} defaultValue="">
            <option value="" disabled>유형을 선택해 주세요</option>
            {TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </Field>
        <Field label="문의 내용" required className="md:col-span-2">
          <textarea
            required
            rows={6}
            className={inputCls + " resize-none"}
            placeholder="문의하실 내용을 자세히 작성해 주세요."
          />
        </Field>
      </div>

      <label className="mt-6 flex items-start gap-2.5 text-xs text-slate-500">
        <input type="checkbox" required className="mt-0.5 h-4 w-4 rounded border-gold-300 text-gold-500 focus:ring-gold-300" />
        <span>
          개인정보 수집·이용에 동의합니다. 수집된 정보는 문의 답변 목적 외에 사용되지
          않습니다.
        </span>
      </label>

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
  "w-full rounded-xl border border-gold-200/80 bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-slate-400 focus:border-gold-500 focus:ring-2 focus:ring-gold-200 outline-none transition";

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
      <span className="block text-sm font-semibold text-ink-900">
        {label}
        {required && <span className="text-gold-600 ml-1">*</span>}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  );
}
