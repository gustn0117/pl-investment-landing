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

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  if (!isAdmin()) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const id = Number(params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ error: "invalid id" }, { status: 400 });
  }
  try {
    const body = await req.json();
    const update: Record<string, unknown> = { updated_at: new Date().toISOString() };

    if (body.period !== undefined) {
      const v = sanitize(body.period, 20);
      if (!v) return NextResponse.json({ error: "기간 형식 오류" }, { status: 400 });
      update.period = v;
    }
    if (body.return_rate !== undefined) {
      const v = sanitize(body.return_rate, 20);
      if (!v) return NextResponse.json({ error: "수익률 필수" }, { status: 400 });
      update.return_rate = v;
    }
    if (body.win_rate !== undefined) {
      const v = sanitize(body.win_rate, 20);
      if (!v) return NextResponse.json({ error: "승률 필수" }, { status: 400 });
      update.win_rate = v;
    }
    if (body.average !== undefined) {
      const v = sanitize(body.average, 20);
      if (!v) return NextResponse.json({ error: "평균 필수" }, { status: 400 });
      update.average = v;
    }
    if (body.trade_count !== undefined) {
      const v = Number.parseInt(String(body.trade_count), 10);
      if (!Number.isInteger(v) || v < 0) {
        return NextResponse.json({ error: "매매 횟수는 0 이상 정수" }, { status: 400 });
      }
      update.trade_count = v;
    }
    if (body.points !== undefined) {
      const pts = parsePoints(body.points);
      if (!pts || pts.length < 2) {
        return NextResponse.json({ error: "추이 포인트는 2개 이상" }, { status: 400 });
      }
      update.points = pts;
    }

    const { data, error } = await supabaseAdmin()
      .from("monthly_results")
      .update(update)
      .eq("id", id)
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

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  if (!isAdmin()) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const id = Number(params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ error: "invalid id" }, { status: 400 });
  }
  const { error } = await supabaseAdmin().from("monthly_results").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
