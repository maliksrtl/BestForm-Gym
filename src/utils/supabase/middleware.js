import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

import {
  adminSessionContract,
  adminSessionMaxAgeMs,
  createAdminLoginPath
} from "@/src/features/admin/auth/adminSession.contract";

const publicAdminPaths = new Set(["/admin/login", "/api/admin/login", "/api/admin/auth"]);

function redirectToLogin(request, error) {
  return NextResponse.redirect(new URL(createAdminLoginPath(error), request.url));
}

function clearAdminLoginCookie(response) {
  response.cookies.set(adminSessionContract.cookieName, "", {
    maxAge: 0,
    path: "/"
  });

  return response;
}

function hasFreshAdminSession(request) {
  const loginAt = Number(request.cookies.get(adminSessionContract.cookieName)?.value || 0);

  return Number.isFinite(loginAt) && loginAt > 0 && Date.now() - loginAt <= adminSessionMaxAgeMs;
}

export async function updateSession(request) {
  const path = request.nextUrl.pathname;
  const isAdminPath = path.startsWith("/admin") || path.startsWith("/api/admin");

  if (!isAdminPath) {
    return NextResponse.next();
  }

  const isPublicAdminPath = publicAdminPaths.has(path);

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabasePublishableKey) {
    if (isPublicAdminPath) {
      return NextResponse.next();
    }

    return redirectToLogin(request, "config");
  }

  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers
    }
  });

  const supabase = createServerClient(
    supabaseUrl,
    supabasePublishableKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });

          supabaseResponse = NextResponse.next({
            request: {
              headers: request.headers
            }
          });

          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options);
          });
        }
      }
    }
  );

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!isPublicAdminPath) {
    if (!user) {
      return redirectToLogin(request, "login-required");
    }

    if (!hasFreshAdminSession(request)) {
      await supabase.auth.signOut();
      return clearAdminLoginCookie(redirectToLogin(request, "session-expired"));
    }

    const { data: adminProfile } = await supabase
      .from("admin_profiles")
      .select("id")
      .eq("id", user.id)
      .maybeSingle();

    if (!adminProfile) {
      await supabase.auth.signOut();
      return clearAdminLoginCookie(redirectToLogin(request, "unauthorized"));
    }
  }

  if (path === "/admin/login" && user) {
    const { data: adminProfile } = await supabase
      .from("admin_profiles")
      .select("id")
      .eq("id", user.id)
      .maybeSingle();

    if (adminProfile) {
      return NextResponse.redirect(new URL(adminSessionContract.adminHomePath, request.url));
    }
  }

  return supabaseResponse;
}
