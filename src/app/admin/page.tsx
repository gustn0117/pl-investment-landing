"use client";

import { useCallback, useEffect, useState } from "react";

type Inquiry = {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  type: string;
  message: string;
  status: "new" | "read" | "done";
  created_at: string;
};

type Lead = {
  id: number;
  name: string;
  phone: string;
  consent_privacy: boolean;
  consent_marketing: boolean;
  status: "new" | "read" | "done";
  created_at: string;
};

type MonthlyResult = {
  id: number;
  period: string;
  return_rate: string;
  win_rate: string;
  points: number[];
  created_at: string;
  updated_at: string;
};

type Tab = "inquiries" | "leads" | "results";
const STATUSES: Array<Inquiry["status"]> = ["new", "read", "done"];
const STATUS_LABEL: Record<Inquiry["status"], string> = {
  new: "신규",
  read: "확인",
  done: "완료",
};

function fmtDate(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loggingIn, setLoggingIn] = useState(false);

  useEffect(() => {
    fetch("/api/admin/auth", { cache: "no-store" })
      .then((r) => r.json())
      .then((j) => setAuthed(Boolean(j.authenticated)))
      .catch(() => setAuthed(false));
  }, []);

  async function onLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError(null);
    setLoggingIn(true);
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        setLoginError(j.error || "로그인 실패");
        return;
      }
      setPassword("");
      setAuthed(true);
    } catch {
      setLoginError("네트워크 오류");
    } finally {
      setLoggingIn(false);
    }
  }

  if (authed === null) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500 text-sm">
        확인 중...
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <form
          onSubmit={onLogin}
          className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-ink-800/60 backdrop-blur p-8 shadow-dark-panel"
        >
          <div
            className="absolute inset-x-0 top-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(223,189,106,0.6), transparent)",
            }}
          />
          <div className="text-center">
            <div className="font-display text-xs tracking-[0.4em] text-gold-400">
              PL INVESTMENT
            </div>
            <h1 className="mt-3 font-display text-2xl font-medium text-white">
              관리자 로그인
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              비밀번호를 입력해 주세요.
            </p>
          </div>
          <input
            type="password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            className="mt-6 w-full rounded-xl border border-white/10 bg-ink-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-gold-400/60 focus:ring-2 focus:ring-gold-400/20 outline-none transition"
          />
          {loginError && (
            <div className="mt-3 rounded-lg border border-rose-400/40 bg-rose-500/10 px-3 py-2 text-xs text-rose-300">
              {loginError}
            </div>
          )}
          <button
            type="submit"
            disabled={loggingIn || !password}
            className="mt-5 w-full btn-primary disabled:opacity-60"
          >
            {loggingIn ? "로그인 중..." : "로그인"}
          </button>
        </form>
      </div>
    );
  }

  return <Dashboard onLogout={() => setAuthed(false)} />;
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<Tab>("inquiries");
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [results, setResults] = useState<MonthlyResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [i, l, r] = await Promise.all([
        fetch("/api/admin/inquiries", { cache: "no-store" }),
        fetch("/api/admin/leads", { cache: "no-store" }),
        fetch("/api/admin/monthly-results", { cache: "no-store" }),
      ]);
      if (i.ok) setInquiries((await i.json()).data || []);
      if (l.ok) setLeads((await l.json()).data || []);
      if (r.ok) setResults((await r.json()).data || []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function updateStatus(table: "inquiries" | "leads", id: number, status: Inquiry["status"]) {
    const res = await fetch(`/api/admin/${table}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      if (table === "inquiries") {
        setInquiries((arr) => arr.map((x) => (x.id === id ? { ...x, status } : x)));
      } else {
        setLeads((arr) => arr.map((x) => (x.id === id ? { ...x, status } : x)));
      }
    }
  }

  async function remove(table: "inquiries" | "leads" | "monthly-results", id: number) {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    const res = await fetch(`/api/admin/${table}/${id}`, { method: "DELETE" });
    if (res.ok) {
      if (table === "inquiries") setInquiries((arr) => arr.filter((x) => x.id !== id));
      else if (table === "leads") setLeads((arr) => arr.filter((x) => x.id !== id));
      else setResults((arr) => arr.filter((x) => x.id !== id));
    }
  }

  async function logout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    onLogout();
  }

  const tabCount = { inquiries: inquiries.length, leads: leads.length, results: results.length };
  const newCount = {
    inquiries: inquiries.filter((x) => x.status === "new").length,
    leads: leads.filter((x) => x.status === "new").length,
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b border-white/10 bg-ink-950/85 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="font-display text-xs tracking-[0.4em] text-gold-400">
              PL INVESTMENT
            </div>
            <span className="h-4 w-px bg-white/15" />
            <h1 className="font-display text-lg font-medium text-white">관리자</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={load}
              className="text-xs font-medium text-slate-300 hover:text-gold-300 transition"
            >
              새로고침
            </button>
            <button
              onClick={logout}
              className="rounded-full border border-white/15 px-3 py-1 text-xs font-medium text-slate-300 hover:border-gold-400/60 hover:text-gold-300 transition"
            >
              로그아웃
            </button>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-6 flex gap-6 overflow-x-auto">
          {([
            { key: "inquiries" as Tab, label: "문의하기" },
            { key: "leads" as Tab, label: "빠른 신청" },
            { key: "results" as Tab, label: "월별 수익" },
          ]).map((t) => {
            const active = tab === t.key;
            const n = t.key === "inquiries" ? newCount.inquiries : t.key === "leads" ? newCount.leads : 0;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`relative py-3 text-sm font-medium transition whitespace-nowrap ${
                  active ? "text-gold-300" : "text-slate-400 hover:text-white"
                }`}
              >
                <span>{t.label}</span>
                <span className="ml-2 text-xs text-slate-500">
                  {tabCount[t.key]}
                  {n > 0 && (
                    <span className="ml-1 inline-flex items-center justify-center rounded-full bg-rose-500/20 text-rose-300 px-1.5 py-0.5 text-[10px] font-semibold">
                      신규 {n}
                    </span>
                  )}
                </span>
                {active && (
                  <span className="absolute inset-x-0 -bottom-px h-[2px] bg-gradient-to-r from-gold-400 via-gold-300 to-gold-400" />
                )}
              </button>
            );
          })}
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        {loading && (
          <div className="text-center text-sm text-slate-500 py-10">불러오는 중...</div>
        )}
        {!loading && tab === "inquiries" && (
          <InquiryTable
            rows={inquiries}
            expanded={expanded}
            onToggle={(id) => setExpanded((cur) => (cur === id ? null : id))}
            onStatus={(id, s) => updateStatus("inquiries", id, s)}
            onDelete={(id) => remove("inquiries", id)}
          />
        )}
        {!loading && tab === "leads" && (
          <LeadTable
            rows={leads}
            onStatus={(id, s) => updateStatus("leads", id, s)}
            onDelete={(id) => remove("leads", id)}
          />
        )}
        {!loading && tab === "results" && (
          <MonthlyResultsTable
            rows={results}
            onReload={load}
            onDelete={(id) => remove("monthly-results", id)}
          />
        )}
      </main>
    </div>
  );
}

function StatusSelect({
  value,
  onChange,
}: {
  value: Inquiry["status"];
  onChange: (s: Inquiry["status"]) => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as Inquiry["status"])}
      className={`rounded-full border px-2.5 py-1 text-xs font-medium outline-none focus:ring-2 focus:ring-gold-400/30 ${
        value === "new"
          ? "border-rose-400/40 bg-rose-500/10 text-rose-300"
          : value === "read"
          ? "border-amber-400/40 bg-amber-500/10 text-amber-300"
          : "border-emerald-400/40 bg-emerald-500/10 text-emerald-300"
      }`}
    >
      {STATUSES.map((s) => (
        <option key={s} value={s} className="bg-ink-900 text-white">
          {STATUS_LABEL[s]}
        </option>
      ))}
    </select>
  );
}

function InquiryTable({
  rows,
  expanded,
  onToggle,
  onStatus,
  onDelete,
}: {
  rows: Inquiry[];
  expanded: number | null;
  onToggle: (id: number) => void;
  onStatus: (id: number, s: Inquiry["status"]) => void;
  onDelete: (id: number) => void;
}) {
  if (!rows.length) {
    return <EmptyState label="문의가 없습니다." />;
  }
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-ink-800/40 backdrop-blur-sm shadow-dark-panel">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-ink-900/80 text-slate-400 text-left">
            <tr>
              <th className="px-4 py-3 font-medium">접수일시</th>
              <th className="px-4 py-3 font-medium">이름</th>
              <th className="px-4 py-3 font-medium">연락처</th>
              <th className="px-4 py-3 font-medium">이메일</th>
              <th className="px-4 py-3 font-medium">유형</th>
              <th className="px-4 py-3 font-medium">내용</th>
              <th className="px-4 py-3 font-medium">상태</th>
              <th className="px-4 py-3 font-medium">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {rows.map((r) => (
              <InquiryRow key={r.id} r={r} expanded={expanded === r.id} onToggle={() => onToggle(r.id)} onStatus={(s) => onStatus(r.id, s)} onDelete={() => onDelete(r.id)} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function InquiryRow({
  r,
  expanded,
  onToggle,
  onStatus,
  onDelete,
}: {
  r: Inquiry;
  expanded: boolean;
  onToggle: () => void;
  onStatus: (s: Inquiry["status"]) => void;
  onDelete: () => void;
}) {
  return (
    <>
      <tr className="hover:bg-white/[0.02] transition">
        <td className="px-4 py-3 text-slate-400 whitespace-nowrap tabular-nums">{fmtDate(r.created_at)}</td>
        <td className="px-4 py-3 text-white font-medium whitespace-nowrap">{r.name}</td>
        <td className="px-4 py-3 text-slate-300 whitespace-nowrap tabular-nums">
          <a href={`tel:${r.phone}`} className="hover:text-gold-300 transition">{r.phone}</a>
        </td>
        <td className="px-4 py-3 text-slate-400 whitespace-nowrap">
          {r.email ? <a href={`mailto:${r.email}`} className="hover:text-gold-300 transition">{r.email}</a> : "-"}
        </td>
        <td className="px-4 py-3 text-slate-300 whitespace-nowrap">{r.type}</td>
        <td className="px-4 py-3 max-w-xs text-slate-300">
          <button onClick={onToggle} className="text-left hover:text-white transition line-clamp-1">
            {r.message}
          </button>
        </td>
        <td className="px-4 py-3">
          <StatusSelect value={r.status} onChange={onStatus} />
        </td>
        <td className="px-4 py-3">
          <button
            onClick={onDelete}
            className="text-xs text-slate-500 hover:text-rose-400 transition"
          >
            삭제
          </button>
        </td>
      </tr>
      {expanded && (
        <tr className="bg-ink-900/60">
          <td colSpan={8} className="px-4 py-4">
            <div className="rounded-lg border border-white/10 bg-ink-950/70 p-4 text-sm leading-relaxed text-slate-200 whitespace-pre-wrap">
              {r.message}
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

function LeadTable({
  rows,
  onStatus,
  onDelete,
}: {
  rows: Lead[];
  onStatus: (id: number, s: Inquiry["status"]) => void;
  onDelete: (id: number) => void;
}) {
  if (!rows.length) return <EmptyState label="빠른 신청이 없습니다." />;
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-ink-800/40 backdrop-blur-sm shadow-dark-panel">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-ink-900/80 text-slate-400 text-left">
            <tr>
              <th className="px-4 py-3 font-medium">접수일시</th>
              <th className="px-4 py-3 font-medium">이름</th>
              <th className="px-4 py-3 font-medium">연락처</th>
              <th className="px-4 py-3 font-medium">개인정보</th>
              <th className="px-4 py-3 font-medium">광고수신</th>
              <th className="px-4 py-3 font-medium">상태</th>
              <th className="px-4 py-3 font-medium">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {rows.map((r) => (
              <tr key={r.id} className="hover:bg-white/[0.02] transition">
                <td className="px-4 py-3 text-slate-400 whitespace-nowrap tabular-nums">{fmtDate(r.created_at)}</td>
                <td className="px-4 py-3 text-white font-medium whitespace-nowrap">{r.name}</td>
                <td className="px-4 py-3 text-slate-300 whitespace-nowrap tabular-nums">
                  <a href={`tel:${r.phone}`} className="hover:text-gold-300 transition">{r.phone}</a>
                </td>
                <td className="px-4 py-3 text-center">
                  <Dot on={r.consent_privacy} />
                </td>
                <td className="px-4 py-3 text-center">
                  <Dot on={r.consent_marketing} />
                </td>
                <td className="px-4 py-3">
                  <StatusSelect value={r.status} onChange={(s) => onStatus(r.id, s)} />
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => onDelete(r.id)}
                    className="text-xs text-slate-500 hover:text-rose-400 transition"
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MonthlyResultsTable({
  rows,
  onReload,
  onDelete,
}: {
  rows: MonthlyResult[];
  onReload: () => void;
  onDelete: (id: number) => void;
}) {
  const [editing, setEditing] = useState<MonthlyResult | null>(null);
  const [adding, setAdding] = useState(false);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-xs text-slate-500">
          · 월별 수익 내역 — 홈페이지 &quot;월별 수익&quot; 섹션에 바로 반영됩니다 (최대 30초 캐시)
        </p>
        <button
          onClick={() => setAdding(true)}
          className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-gold-500 to-gold-300 px-4 py-2 text-sm font-semibold text-ink-950 shadow-gold-soft hover:shadow-gold-glow transition"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          새 월 추가
        </button>
      </div>

      {!rows.length ? (
        <EmptyState label="등록된 월별 수익이 없습니다." />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-ink-800/40 backdrop-blur-sm shadow-dark-panel">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-ink-900/80 text-slate-400 text-left">
                <tr>
                  <th className="px-4 py-3 font-medium">기간</th>
                  <th className="px-4 py-3 font-medium">한달 수익률</th>
                  <th className="px-4 py-3 font-medium">승률</th>
                  <th className="px-4 py-3 font-medium">추이(포인트 수)</th>
                  <th className="px-4 py-3 font-medium">수정일</th>
                  <th className="px-4 py-3 font-medium">관리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {rows.map((r) => (
                  <tr key={r.id} className="hover:bg-white/[0.02] transition">
                    <td className="px-4 py-3 text-white font-medium font-display tabular-nums">{r.period}</td>
                    <td className="px-4 py-3 text-rose-300 font-semibold tabular-nums">{r.return_rate}</td>
                    <td className="px-4 py-3 text-slate-300 tabular-nums">{r.win_rate}</td>
                    <td className="px-4 py-3 text-slate-400 tabular-nums">{r.points.length}개</td>
                    <td className="px-4 py-3 text-slate-500 whitespace-nowrap tabular-nums text-xs">{fmtDate(r.updated_at)}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <button
                        onClick={() => setEditing(r)}
                        className="text-xs text-gold-300 hover:text-gold-200 transition mr-3"
                      >
                        수정
                      </button>
                      <button
                        onClick={() => onDelete(r.id)}
                        className="text-xs text-slate-500 hover:text-rose-400 transition"
                      >
                        삭제
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {(adding || editing) && (
        <MonthlyResultDialog
          initial={editing}
          onClose={() => {
            setAdding(false);
            setEditing(null);
          }}
          onSaved={() => {
            setAdding(false);
            setEditing(null);
            onReload();
          }}
        />
      )}
    </div>
  );
}

function MonthlyResultDialog({
  initial,
  onClose,
  onSaved,
}: {
  initial: MonthlyResult | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const isEdit = Boolean(initial);
  const [period, setPeriod] = useState(initial?.period || "");
  const [returnRate, setReturnRate] = useState(initial?.return_rate || "+0.0%");
  const [winRate, setWinRate] = useState(initial?.win_rate || "");
  const [points, setPoints] = useState((initial?.points || []).join(", "));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      const payload = {
        period: period.trim(),
        return_rate: returnRate.trim(),
        win_rate: winRate.trim(),
        points,
      };
      const res = await fetch(
        isEdit ? `/api/admin/monthly-results/${initial!.id}` : "/api/admin/monthly-results",
        {
          method: isEdit ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const j = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(j.error || "저장 실패");
        return;
      }
      onSaved();
    } catch {
      setError("네트워크 오류");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-950/80 backdrop-blur">
      <form
        onSubmit={save}
        className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-ink-900 p-6 shadow-2xl"
      >
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(223,189,106,0.6), transparent)",
          }}
        />
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-medium text-white">
            {isEdit ? "월별 수익 수정" : "새 월별 수익 추가"}
          </h3>
          <button type="button" onClick={onClose} className="text-slate-500 hover:text-white transition" aria-label="닫기">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <DField label="기간" hint="예: 2026.04">
            <input
              required
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              placeholder="2026.04"
              className={dInput}
            />
          </DField>
          <DField label="한달 수익률" hint="예: +68.4%">
            <input
              required
              value={returnRate}
              onChange={(e) => setReturnRate(e.target.value)}
              placeholder="+68.4%"
              className={dInput}
            />
          </DField>
          <DField label="승률" hint="예: 87%" className="md:col-span-2">
            <input
              required
              value={winRate}
              onChange={(e) => setWinRate(e.target.value)}
              placeholder="87%"
              className={dInput}
            />
          </DField>
          <DField label="추이 포인트" hint="쉼표로 구분된 숫자 2개 이상 (예: 100, 102, 105, 108)" className="md:col-span-2">
            <input
              required
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              placeholder="100, 102, 105, 108, 112, 115, 119"
              className={dInput + " tabular-nums"}
            />
          </DField>
        </div>

        {error && (
          <div className="mt-4 rounded-lg border border-rose-400/40 bg-rose-500/10 px-3 py-2 text-xs text-rose-300">
            {error}
          </div>
        )}

        <div className="mt-6 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 hover:border-white/25 hover:text-white transition"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={saving}
            className="btn-primary disabled:opacity-60"
          >
            {saving ? "저장 중..." : isEdit ? "수정 저장" : "추가"}
          </button>
        </div>
      </form>
    </div>
  );
}

const dInput =
  "w-full rounded-xl border border-white/10 bg-ink-900/70 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-gold-400/60 focus:ring-2 focus:ring-gold-400/20 outline-none transition";

function DField({
  label,
  hint,
  children,
  className = "",
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-xs font-medium text-slate-300">{label}</span>
      <div className="mt-1.5">{children}</div>
      {hint && <span className="mt-1 block text-[11px] text-slate-500">{hint}</span>}
    </label>
  );
}

function Dot({ on }: { on: boolean }) {
  return on ? (
    <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
  ) : (
    <span className="inline-block h-2 w-2 rounded-full bg-slate-600" />
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-white/10 bg-ink-800/30 p-16 text-center text-sm text-slate-500">
      {label}
    </div>
  );
}
