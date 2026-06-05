import { createBrowserClient } from "@supabase/ssr";

import { supabaseConfig } from "@/src/utils/supabase/config";

export function createClient() {
  return createBrowserClient(
    supabaseConfig.url,
    supabaseConfig.publishableKey
  );
}
