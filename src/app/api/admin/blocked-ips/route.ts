import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase";
import { isValidIp } from "@/lib/ip";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!isAdmin()) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { data, error } = await supabaseAdmin()
    .from("blocked_ips")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function POST(req: Request) {
  if (!isAdmin()) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  try {
    const body = await req.json();
    const ip = typeof body.ip === "string" ? body.ip.trim() : "";
    if (!isValidIp(ip)) {
      return NextResponse.json({ error: "올바른 IP 주소가 아닙니다." }, { status: 400 });
    }
    const note =
      typeof body.note === "string" ? body.note.trim().slice(0, 200) : "";

    const { data, error } = await supabaseAdmin()
      .from("blocked_ips")
      .insert({ ip, note: note || null })
      .select()
      .single();
    if (error) {
      if (error.code === "23505") {
        return NextResponse.json({ error: "이미 차단된 IP입니다." }, { status: 409 });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ error: "잘못된 요청" }, { status: 400 });
  }
}
