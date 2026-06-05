const fallbackSupabaseUrl = "https://tbnckplavvuwgzompepx.supabase.co";
const fallbackSupabasePublishableKey = "sb_publishable_K3KLKzheGSC4uVIbjyIeQw_hQ4F721u";

// These are public NEXT_PUBLIC values; Vercel env vars still override them.
export const supabaseConfig = Object.freeze({
  url: process.env.NEXT_PUBLIC_SUPABASE_URL || fallbackSupabaseUrl,
  publishableKey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || fallbackSupabasePublishableKey
});

export function hasSupabaseConfig() {
  return Boolean(supabaseConfig.url && supabaseConfig.publishableKey);
}
