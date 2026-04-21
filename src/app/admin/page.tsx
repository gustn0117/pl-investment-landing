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

type Tab = "inquiries" | "leads";
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
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [i, l] = await Promise.all([
        fetch("/api/admin/inquiries", { cache: "no-store" }),
        fetch("/api/admin/leads", { cache: "no-store" }),
      ]);
      if (i.ok) setInquiries((await i.json()).data || []);
      if (l.ok) setLeads((await l.json()).data || []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function updateStatus(table: Tab, id: number, status: Inquiry["status"]) {
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

  async function remove(table: Tab, id: number) {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    const res = await fetch(`/api/admin/${table}/${id}`, { method: "DELETE" });
    if (res.ok) {
      if (table === "inquiries") setInquiries((arr) => arr.filter((x) => x.id !== id));
      else setLeads((arr) => arr.filter((x) => x.id !== id));
    }
  }

  async function logout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    onLogout();
  }

  const tabCount = { inquiries: inquiries.length, leads: leads.length };
  const newCount = {
    inquiries: inquiries.filter((x) => x.status === "new").length,
    leads: leads.filter((x) => x.status === "new").length,
  };

  return (
    <div className="min-h-screen">
      {/* Top bar */}
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
        {/* Tabs */}
        <div className="mx-auto max-w-7xl px-6 flex gap-6">
          {(["inquiries", "leads"] as Tab[]).map((t) => {
            const active = tab === t;
            const label = t === "inquiries" ? "문의하기" : "빠른 신청";
            return (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`relative py-3 text-sm font-medium transition ${
                  active ? "text-gold-300" : "text-slate-400 hover:text-white"
                }`}
              >
                <span>{label}</span>
                <span className="ml-2 text-xs text-slate-500">
                  {tabCount[t]}
                  {newCount[t] > 0 && (
                    <span className="ml-1 inline-flex items-center justify-center rounded-full bg-rose-500/20 text-rose-300 px-1.5 py-0.5 text-[10px] font-semibold">
                      신규 {newCount[t]}
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
              <Row key={r.id} r={r} expanded={expanded === r.id} onToggle={() => onToggle(r.id)} onStatus={(s) => onStatus(r.id, s)} onDelete={() => onDelete(r.id)} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Row({
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
            <div className="rounded-lg border border-white/8 bg-ink-950/70 p-4 text-sm leading-relaxed text-slate-200 whitespace-pre-wrap">
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
