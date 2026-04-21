import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const schema = process.env.NEXT_PUBLIC_SUPABASE_SCHEMA || "pl_investment_landing";

export function supabaseAdmin() {
  if (!url || !serviceKey) {
    throw new Error("Supabase env not configured");
  }
  return createClient(url, serviceKey, {
    db: { schema },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export const SCHEMA = schema;
