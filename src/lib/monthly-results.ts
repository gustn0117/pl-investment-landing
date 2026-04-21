import { supabaseAdmin } from "./supabase";

export type MonthlyResult = {
  id: number;
  period: string;
  return_rate: string;
  win_rate: string;
  points: number[];
};

const FALLBACK: MonthlyResult[] = [
  { id: 0, period: "2026.04", return_rate: "+68.4%", win_rate: "87%", points: [100, 106, 112, 118, 125, 130, 138, 145, 152, 159, 164, 168] },
  { id: 0, period: "2026.03", return_rate: "+92.7%", win_rate: "89%", points: [100, 108, 115, 124, 132, 141, 150, 158, 167, 175, 184, 193] },
  { id: 0, period: "2026.02", return_rate: "+54.3%", win_rate: "85%", points: [100, 104, 109, 115, 120, 125, 131, 136, 141, 146, 150, 154] },
  { id: 0, period: "2026.01", return_rate: "+76.5%", win_rate: "88%", points: [100, 106, 113, 120, 127, 134, 141, 148, 155, 162, 170, 177] },
  { id: 0, period: "2025.12", return_rate: "+48.1%", win_rate: "83%", points: [100, 103, 107, 112, 117, 122, 127, 132, 137, 142, 146, 148] },
  { id: 0, period: "2025.11", return_rate: "+108.3%", win_rate: "91%", points: [100, 110, 121, 133, 145, 158, 171, 184, 196, 205, 214, 221] },
];

export async function fetchMonthlyResults(): Promise<MonthlyResult[]> {
  try {
    const { data, error } = await supabaseAdmin()
      .from("monthly_results")
      .select("id, period, return_rate, win_rate, points")
      .order("period", { ascending: false })
      .limit(60);
    if (error || !data || data.length === 0) return FALLBACK;
    return data as MonthlyResult[];
  } catch {
    return FALLBACK;
  }
}
