import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED_TYPES = ["투자 상담", "포트폴리오 점검", "제휴 문의", "기타 문의"];

function sanitize(s: unknown, max = 1000) {
  if (typeof s !== "string") return "";
  return s.trim().slice(0, max);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = sanitize(body.name, 50);
    const phone = sanitize(body.phone, 30);
    const email = sanitize(body.email, 200);
    const type = sanitize(body.type, 50);
    const message = sanitize(body.message, 4000);

    if (!name || !phone || !type || !message) {
      return NextResponse.json({ error: "필수 항목이 누락됐습니다." }, { status: 400 });
    }
    if (!ALLOWED_TYPES.includes(type)) {
      return NextResponse.json({ error: "잘못된 문의 유형입니다." }, { status: 400 });
    }

    const { error } = await supabaseAdmin()
      .from("inquiries")
      .insert({ name, phone, email: email || null, type, message });

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
