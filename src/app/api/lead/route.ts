import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function sanitize(s: unknown, max = 200) {
  if (typeof s !== "string") return "";
  return s.trim().slice(0, max);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = sanitize(body.name, 50);
    const phone = sanitize(body.phone, 30);
    const privacy = Boolean(body.consent_privacy);
    const marketing = Boolean(body.consent_marketing);

    if (!name || !phone) {
      return NextResponse.json({ error: "이름과 휴대폰 번호는 필수입니다." }, { status: 400 });
    }
    if (!privacy || !marketing) {
      return NextResponse.json({ error: "필수 약관에 동의해 주세요." }, { status: 400 });
    }

    const { error } = await supabaseAdmin()
      .from("leads")
      .insert({ name, phone, consent_privacy: privacy, consent_marketing: marketing });

    if (error) {
      console.error("lead insert", error);
      return NextResponse.json({ error: "저장 실패" }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "잘못된 요청" }, { status: 400 });
  }
}
