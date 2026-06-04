import { NextResponse } from "next/server";

import { createClient } from "@/src/utils/supabase/server";

export async function POST(request) {
  const formData = await request.formData();
  const monthlyPrice = Number(formData.get("monthly_price") || 0);
  const yearlyPrice = Number(formData.get("yearly_price") || 0);

  if (!monthlyPrice || !yearlyPrice) {
    return NextResponse.redirect(new URL("/admin?error=pricing-missing#pricing", request.url));
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("pricing_settings")
    .upsert({ id: "default", monthly_price: monthlyPrice, yearly_price: yearlyPrice });

  if (error) {
    return NextResponse.redirect(new URL(`/admin?error=${encodeURIComponent(error.message)}#pricing`, request.url));
  }

  return NextResponse.redirect(new URL("/admin?success=pricing-updated#pricing", request.url));
}
