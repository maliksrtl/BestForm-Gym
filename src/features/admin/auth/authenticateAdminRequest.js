import { NextResponse } from "next/server";

import {
  adminSessionContract,
  createAdminLoginPath,
  getAdminSessionCookieOptions
} from "@/src/features/admin/auth/adminSession.contract";
import { hasSupabaseConfig } from "@/src/utils/supabase/config";
import { createClient } from "@/src/utils/supabase/server";

function redirectTo(request, path) {
  return NextResponse.redirect(new URL(path, request.url));
}

function wantsJson(request) {
  return request.headers.get("accept")?.includes("application/json");
}

function errorResponse(request, error, json) {
  if (json) {
    return NextResponse.json({ error, ok: false }, { status: 400 });
  }

  return redirectTo(request, createAdminLoginPath(error));
}

function withAdminSessionCookie(response) {
  response.cookies.set(
    adminSessionContract.cookieName,
    String(Date.now()),
    getAdminSessionCookieOptions()
  );

  return response;
}

export async function authenticateAdminRequest(request) {
  const json = wantsJson(request);
  const formData = await request.formData();
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    return errorResponse(request, "missing", json);
  }

  if (!hasSupabaseConfig()) {
    return errorResponse(request, "config", json);
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !data.user) {
    return errorResponse(request, "invalid", json);
  }

  const { data: adminProfile, error: adminError } = await supabase
    .from("admin_profiles")
    .select("id")
    .eq("id", data.user.id)
    .maybeSingle();

  if (adminError || !adminProfile) {
    await supabase.auth.signOut();
    return errorResponse(request, "unauthorized", json);
  }

  if (json) {
    return withAdminSessionCookie(
      NextResponse.json({ ok: true, redirectTo: adminSessionContract.adminHomePath })
    );
  }

  return withAdminSessionCookie(redirectTo(request, adminSessionContract.adminHomePath));
}
