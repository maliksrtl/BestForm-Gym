export const adminSessionContract = Object.freeze({
  cookieName: "bestform_admin_login_at",
  maxAgeDays: 20,
  maxAgeSeconds: 60 * 60 * 24 * 20,
  loginModalPath: "/admin/login",
  adminHomePath: "/admin",
  loginRedirect: "/admin/login",
  logoutRedirect: "/admin/login",
  protectedRoutePrefix: "/admin"
});

export const adminSessionMaxAgeMs = adminSessionContract.maxAgeSeconds * 1000;

export function createAdminLoginPath(error) {
  if (!error) {
    return adminSessionContract.loginModalPath;
  }

  return `${adminSessionContract.loginModalPath}?error=${encodeURIComponent(error)}`;
}

export function getAdminSessionCookieOptions() {
  return {
    httpOnly: true,
    maxAge: adminSessionContract.maxAgeSeconds,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production"
  };
}
