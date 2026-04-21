import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function parsePoints(v: unknown): number[] | null {
  if (Array.isArray(v)) {
    const arr = v.map((x) => Number(x)).filter((x) => Number.isFinite(x));
    return arr.length > 0 ? arr : null;
  }
  if (typeof v === "string") {
    const arr = v
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((s) => Number(s))
      .filter((x) => Number.isFinite(x));
    return arr.length > 0 ? arr : null;
  }
  return null;
}

function sanitize(s: unknown, max = 200) {
  if (typeof s !== "string") return "";
  return s.trim().slice(0, max);
}

export async function GET() {
  if (!isAdmin()) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { data, error } = await supabaseAdmin()
    .from("monthly_results")
    .select("*")
    .order("period", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function POST(req: Request) {
  if (!isAdmin()) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  try {
    const body = await req.json();
    const period = sanitize(body.period, 20);
    const return_rate = sanitize(body.return_rate, 20);
    const win_rate = sanitize(body.win_rate, 20);
    const points = parsePoints(body.points);

    if (!period || !return_rate || !win_rate) {
      return NextResponse.json({ error: "필수 항목 누락" }, { status: 400 });
    }
    if (!points || points.length < 2) {
      return NextResponse.json({ error: "추이 포인트는 2개 이상" }, { status: 400 });
    }

    const row: Record<string, unknown> = { period, return_rate, win_rate, points };
    if (body.trade_count !== undefined) {
      const n = Number.parseInt(String(body.trade_count), 10);
      if (Number.isInteger(n) && n >= 0) row.trade_count = n;
    }
    if (body.average !== undefined) {
      const v = sanitize(body.average, 20);
      if (v) row.average = v;
    }

    const { data, error } = await supabaseAdmin()
      .from("monthly_results")
      .insert(row)
      .select()
      .single();

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json({ error: "이미 등록된 기간입니다." }, { status: 409 });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ error: "잘못된 요청" }, { status: 400 });
  }
}
