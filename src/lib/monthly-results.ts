import { supabaseAdmin } from "./supabase";

export type MonthlyResult = {
  id: number;
  period: string;
  return_rate: string;
  trade_count: number;
  win_rate: string;
  average: string;
  points: number[];
};

const FALLBACK: MonthlyResult[] = [
  { id: 0, period: "2026.04", return_rate: "+18.6%", trade_count: 24, win_rate: "79%", average: "+2.3%", points: [100, 102, 101, 104, 107, 106, 109, 112, 114, 118, 116, 119] },
  { id: 0, period: "2026.03", return_rate: "+22.4%", trade_count: 28, win_rate: "82%", average: "+2.8%", points: [100, 103, 106, 105, 108, 111, 114, 113, 117, 120, 121, 122] },
  { id: 0, period: "2026.02", return_rate: "+15.1%", trade_count: 21, win_rate: "76%", average: "+2.1%", points: [100, 101, 100, 103, 105, 104, 107, 109, 111, 113, 114, 115] },
  { id: 0, period: "2026.01", return_rate: "+19.8%", trade_count: 26, win_rate: "80%", average: "+2.5%", points: [100, 102, 104, 103, 107, 110, 112, 114, 116, 115, 118, 120] },
  { id: 0, period: "2025.12", return_rate: "+12.3%", trade_count: 19, win_rate: "73%", average: "+1.9%", points: [100, 99, 101, 102, 104, 105, 103, 107, 108, 110, 111, 112] },
  { id: 0, period: "2025.11", return_rate: "+24.7%", trade_count: 31, win_rate: "84%", average: "+3.0%", points: [100, 103, 106, 108, 109, 112, 115, 117, 120, 121, 123, 125] },
];

export async function fetchMonthlyResults(): Promise<MonthlyResult[]> {
  try {
    const { data, error } = await supabaseAdmin()
      .from("monthly_results")
      .select("id, period, return_rate, trade_count, win_rate, average, points")
      .order("period", { ascending: false })
      .limit(60);
    if (error || !data || data.length === 0) return FALLBACK;
    return data as MonthlyResult[];
  } catch {
    return FALLBACK;
  }
}
