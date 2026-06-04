import { NextResponse } from "next/server";

import { adminSessionContract } from "@/src/features/admin/auth/adminSession.contract";
import { createClient } from "@/src/utils/supabase/server";

export async function POST(request) {
  const supabase = await createClient();
  await supabase.auth.signOut();

  const response = NextResponse.redirect(new URL(adminSessionContract.logoutRedirect, request.url));
  response.cookies.set(adminSessionContract.cookieName, "", {
    maxAge: 0,
    path: "/"
  });

  return response;
}
