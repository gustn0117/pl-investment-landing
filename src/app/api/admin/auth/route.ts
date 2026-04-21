import { NextResponse } from "next/server";
import { createSessionToken, setAdminCookie, clearAdminCookie, isAdmin } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { password } = await req.json();
    if (typeof password !== "string") {
      return NextResponse.json({ error: "비밀번호가 필요합니다." }, { status: 400 });
    }
    const expected = process.env.ADMIN_PASSWORD || "";
    if (!expected) {
      return NextResponse.json({ error: "서버 설정 오류" }, { status: 500 });
    }
    if (password !== expected) {
      return NextResponse.json({ error: "비밀번호가 올바르지 않습니다." }, { status: 401 });
    }
    setAdminCookie(createSessionToken());
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "잘못된 요청" }, { status: 400 });
  }
}

export async function DELETE() {
  clearAdminCookie();
  return NextResponse.json({ ok: true });
}

export async function GET() {
  return NextResponse.json({ authenticated: isAdmin() });
}
