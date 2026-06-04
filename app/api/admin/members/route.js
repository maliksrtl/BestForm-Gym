import { NextResponse } from "next/server";

import {
  getAdminMemberRequestPayload,
  toAdminMemberPayload
} from "@/src/features/admin/data/adminMemberPayload";
import { createClient } from "@/src/utils/supabase/server";

export async function POST(request) {
  const { isJson, value } = await getAdminMemberRequestPayload(request);
  const payload = toAdminMemberPayload(value);

  if (!payload.full_name || !payload.phone || !payload.price_amount) {
    if (isJson) {
      return NextResponse.json({ error: "member-missing" }, { status: 400 });
    }

    return NextResponse.redirect(new URL("/admin?error=member-missing#members", request.url));
  }

  const supabase = await createClient();
  const { data, error } = await supabase.from("members").insert(payload).select("*").single();

  if (error) {
    if (isJson) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.redirect(new URL(`/admin?error=${encodeURIComponent(error.message)}#members`, request.url));
  }

  if (isJson) {
    return NextResponse.json({ member: data });
  }

  return NextResponse.redirect(new URL("/admin?success=member-created#members", request.url));
}
