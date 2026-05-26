import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { validatePhone } from "@/lib/phone";
import { getClientIp, getUserAgent } from "@/lib/request";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED_TYPES = ["투자 상담", "포트폴리오 점검", "제휴 문의", "기타 문의"];
const DUP_WINDOW_HOURS = 24;

function sanitize(s: unknown, max = 1000) {
  if (typeof s !== "string") return "";
  return s.trim().slice(0, max);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // honeypot
    if (sanitize(body.website, 200)) {
      return NextResponse.json({ ok: true });
    }

    const name = sanitize(body.name, 50);
    const phoneRaw = sanitize(body.phone, 30);
    const email = sanitize(body.email, 200);
    const type = sanitize(body.type, 50);
    const message = sanitize(body.message, 4000);

    if (!name || !type || !message) {
      return NextResponse.json({ error: "필수 항목이 누락됐습니다." }, { status: 400 });
    }
    const phoneCheck = validatePhone(phoneRaw);
    if (!phoneCheck.ok) {
      return NextResponse.json({ error: phoneCheck.error }, { status: 400 });
    }
    if (!ALLOWED_TYPES.includes(type)) {
      return NextResponse.json({ error: "잘못된 문의 유형입니다." }, { status: 400 });
    }

    const supa = supabaseAdmin();

    const { data: blocked } = await supa
      .from("blocked_phones")
      .select("id")
      .eq("phone_norm", phoneCheck.normalized)
      .limit(1);
    if (blocked && blocked.length > 0) {
      return NextResponse.json(
        { error: "신청에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해 주세요." },
        { status: 403 }
      );
    }

    const since = new Date(Date.now() - DUP_WINDOW_HOURS * 60 * 60 * 1000).toISOString();
    const { data: existing } = await supa
      .from("inquiries")
      .select("id")
      .eq("phone_norm", phoneCheck.normalized)
      .gte("created_at", since)
      .limit(1);

    if (existing && existing.length > 0) {
      return NextResponse.json(
        { error: "이미 동일한 번호로 문의하셨습니다. 잠시 후 다시 시도해 주세요." },
        { status: 409 }
      );
    }

    const { error } = await supa.from("inquiries").insert({
      name,
      phone: phoneRaw,
      phone_norm: phoneCheck.normalized,
      email: email || null,
      type,
      message,
      ip: getClientIp(req),
      user_agent: getUserAgent(req),
    });

    if (error) {
      console.error("inquiry insert", error);
      return NextResponse.json({ error: "저장 실패" }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "잘못된 요청" }, { status: 400 });
  }
}
