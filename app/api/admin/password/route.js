import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

import { supabaseConfig } from "@/src/utils/supabase/config";
import { createClient } from "@/src/utils/supabase/server";

function jsonError(error, status = 400) {
  return NextResponse.json({ error }, { status });
}

export async function POST(request) {
  const { currentPassword, newPassword, confirmPassword } = await request.json().catch(() => ({}));

  if (!currentPassword || !newPassword || !confirmPassword) {
    return jsonError("Tüm şifre alanları zorunlu.");
  }

  if (newPassword !== confirmPassword) {
    return jsonError("Yeni şifreler eşleşmiyor.");
  }

  if (String(newPassword).length < 8) {
    return jsonError("Yeni şifre en az 8 karakter olmalı.");
  }

  if (currentPassword === newPassword) {
    return jsonError("Yeni şifre eski şifreyle aynı olamaz.");
  }

  const supabase = await createClient();
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user?.email) {
    return jsonError("Oturum bulunamadı. Tekrar giriş yap.", 401);
  }

  const authVerifier = createSupabaseClient(supabaseConfig.url, supabaseConfig.publishableKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  const { error: verifyError } = await authVerifier.auth.signInWithPassword({
    email: user.email,
    password: currentPassword
  });

  if (verifyError) {
    return jsonError("Eski şifre hatalı. Admin panele giriş yaparken kullandığın güncel şifreyi yaz.");
  }

  const { error: updateError } = await authVerifier.auth.updateUser({
    password: newPassword
  });

  await authVerifier.auth.signOut();

  if (updateError) {
    return jsonError("Şifre güncellenemedi. Lütfen tekrar dene.");
  }

  return NextResponse.json({ ok: true });
}
