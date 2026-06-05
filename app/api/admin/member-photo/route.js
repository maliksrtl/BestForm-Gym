import { NextResponse } from "next/server";

import { createClient } from "@/src/utils/supabase/server";

const bucketName = "member-profile-images";
const acceptedImageTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
const maxImageSizeBytes = 2 * 1024 * 1024;

function getExtension(file) {
  const extensionFromName = file.name.split(".").pop()?.toLowerCase();

  if (["jpg", "jpeg", "png", "webp"].includes(extensionFromName)) {
    return extensionFromName === "jpeg" ? "jpg" : extensionFromName;
  }

  return file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
}

function getUploadErrorMessage(error) {
  const message = String(error?.message || "");
  const lowerMessage = message.toLocaleLowerCase("en-US");

  if (lowerMessage.includes("bucket") || lowerMessage.includes("not found")) {
    return "Profil resmi deposu bulunamadı. Supabase SQL Editor'da 003_member_profile_images.sql migration'ını çalıştır.";
  }

  if (lowerMessage.includes("row-level security") || lowerMessage.includes("policy")) {
    return "Profil resmi yükleme izni eksik. Supabase Storage policy'leri için 003_member_profile_images.sql migration'ını çalıştır.";
  }

  return message || "Profil resmi yüklenemedi.";
}

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get("profileImage");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Profil resmi seçilmedi." }, { status: 400 });
  }

  if (!acceptedImageTypes.has(file.type)) {
    return NextResponse.json({ error: "Sadece JPG, PNG veya WEBP görsel yüklenebilir." }, { status: 400 });
  }

  if (file.size > maxImageSizeBytes) {
    return NextResponse.json({ error: "Profil resmi en fazla 2 MB olabilir." }, { status: 400 });
  }

  const supabase = await createClient();
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Oturum bulunamadı. Tekrar giriş yap." }, { status: 401 });
  }

  const extension = getExtension(file);
  const path = `${user.id}/${crypto.randomUUID()}.${extension}`;
  const { error: uploadError } = await supabase.storage.from(bucketName).upload(path, file, {
    cacheControl: "31536000",
    contentType: file.type,
    upsert: false
  });

  if (uploadError) {
    return NextResponse.json({ error: getUploadErrorMessage(uploadError) }, { status: 400 });
  }

  const { data: publicData } = supabase.storage.from(bucketName).getPublicUrl(path);

  return NextResponse.json({
    path,
    url: publicData.publicUrl
  });
}
