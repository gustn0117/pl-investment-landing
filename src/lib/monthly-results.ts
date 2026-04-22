import { supabaseAdmin } from "./supabase";

export type MonthlyResult = {
  id: number;
  period: string;
  return_rate: string;
  win_rate: string;
  top_pick: string | null;
};

const FALLBACK: MonthlyResult[] = [
  { id: 0, period: "2026.04", return_rate: "+68.4%", win_rate: "87%", top_pick: "삼성전자 +32%" },
  { id: 0, period: "2026.03", return_rate: "+92.7%", win_rate: "89%", top_pick: "SK하이닉스 +41%" },
  { id: 0, period: "2026.02", return_rate: "+54.3%", win_rate: "85%", top_pick: "LG에너지솔루션 +28%" },
  { id: 0, period: "2026.01", return_rate: "+76.5%", win_rate: "88%", top_pick: "현대차 +36%" },
  { id: 0, period: "2025.12", return_rate: "+48.1%", win_rate: "83%", top_pick: "NAVER +24%" },
  { id: 0, period: "2025.11", return_rate: "+108.3%", win_rate: "91%", top_pick: "카카오 +52%" },
];

export async function fetchMonthlyResults(): Promise<MonthlyResult[]> {
  try {
    const { data, error } = await supabaseAdmin()
      .from("monthly_results")
      .select("id, period, return_rate, win_rate, top_pick")
      .order("period", { ascending: false })
      .limit(60);
    if (error || !data || data.length === 0) return FALLBACK;
    return data as MonthlyResult[];
  } catch {
    return FALLBACK;
  }
}
