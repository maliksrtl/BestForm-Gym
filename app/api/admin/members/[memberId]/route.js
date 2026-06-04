import { NextResponse } from "next/server";

import {
  getAdminMemberRequestPayload,
  toAdminMemberPayload
} from "@/src/features/admin/data/adminMemberPayload";
import { createClient } from "@/src/utils/supabase/server";

export async function PATCH(request, { params }) {
  const { memberId } = await params;
  const { value } = await getAdminMemberRequestPayload(request);
  const payload = toAdminMemberPayload(value);

  const supabase = await createClient();
  const { data, error } = await supabase.from("members").update(payload).eq("id", memberId).select("*").single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ member: data });
}

export async function DELETE(_request, { params }) {
  const { memberId } = await params;
  const supabase = await createClient();
  const { error } = await supabase.from("members").delete().eq("id", memberId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
