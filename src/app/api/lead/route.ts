import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { validatePhone } from "@/lib/phone";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DUP_WINDOW_HOURS = 24;

function sanitize(s: unknown, max = 200) {
  if (typeof s !== "string") return "";
  return s.trim().slice(0, max);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // honeypot — bots tend to fill every visible-looking input
    if (sanitize(body.website, 200)) {
      return NextResponse.json({ ok: true });
    }

    const name = sanitize(body.name, 50);
    const phoneRaw = sanitize(body.phone, 30);
    const privacy = Boolean(body.consent_privacy);
    const marketing = Boolean(body.consent_marketing);

    if (!name) {
      return NextResponse.json({ error: "이름을 입력해 주세요." }, { status: 400 });
    }
    const phoneCheck = validatePhone(phoneRaw);
    if (!phoneCheck.ok) {
      return NextResponse.json({ error: phoneCheck.error }, { status: 400 });
    }
    if (!privacy || !marketing) {
      return NextResponse.json({ error: "필수 약관에 동의해 주세요." }, { status: 400 });
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
      .from("leads")
      .select("id")
      .eq("phone_norm", phoneCheck.normalized)
      .gte("created_at", since)
      .limit(1);

    if (existing && existing.length > 0) {
      return NextResponse.json(
        { error: "이미 동일한 번호로 신청하셨습니다. 잠시 후 다시 시도해 주세요." },
        { status: 409 }
      );
    }

    const { error } = await supa.from("leads").insert({
      name,
      phone: phoneRaw,
      phone_norm: phoneCheck.normalized,
      consent_privacy: privacy,
      consent_marketing: marketing,
    });

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
