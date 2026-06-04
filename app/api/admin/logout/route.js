import { NextResponse } from "next/server";

import { createClient } from "@/src/utils/supabase/server";

export async function POST(request) {
  const supabase = await createClient();
  await supabase.auth.signOut();

  return NextResponse.redirect(new URL("/admin/login", request.url));
}
