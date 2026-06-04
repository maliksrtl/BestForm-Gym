import { NextResponse } from "next/server";

import { createClient } from "@/src/utils/supabase/server";

function redirectTo(request, path) {
  return NextResponse.redirect(new URL(path, request.url));
}

export async function authenticateAdminRequest(request) {
  const formData = await request.formData();
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    return redirectTo(request, "/admin/login?error=missing");
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !data.user) {
    return redirectTo(request, "/admin/login?error=invalid");
  }

  const { data: adminProfile, error: adminError } = await supabase
    .from("admin_profiles")
    .select("id")
    .eq("id", data.user.id)
    .maybeSingle();

  if (adminError || !adminProfile) {
    await supabase.auth.signOut();
    return redirectTo(request, "/admin/login?error=unauthorized");
  }

  return redirectTo(request, "/admin");
}
