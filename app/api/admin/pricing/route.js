import { NextResponse } from "next/server";

import { defaultPricing, membershipPlans } from "@/src/features/admin/data/adminDashboard";
import { createClient } from "@/src/utils/supabase/server";

export async function POST(request) {
  const contentType = request.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const input = isJson ? await request.json() : await request.formData();
  const payload = membershipPlans.reduce(
    (pricing, plan) => ({
      ...pricing,
      [plan.priceField]: Number(
        (isJson ? input[plan.priceField] : input.get(plan.priceField)) || defaultPricing[plan.priceField]
      )
    }),
    { id: "default" }
  );

  const hasInvalidPrice = membershipPlans.some((plan) => !payload[plan.priceField]);

  if (hasInvalidPrice) {
    if (isJson) {
      return NextResponse.json({ error: "pricing-missing" }, { status: 400 });
    }

    return NextResponse.redirect(new URL("/admin?error=pricing-missing#pricing", request.url));
  }

  const supabase = await createClient();
  const { data, error } = await supabase.from("pricing_settings").upsert(payload).select("*").single();

  if (error) {
    if (isJson) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.redirect(new URL(`/admin?error=${encodeURIComponent(error.message)}#pricing`, request.url));
  }

  if (isJson) {
    return NextResponse.json({ pricing: data });
  }

  return NextResponse.redirect(new URL("/admin?success=pricing-updated#pricing", request.url));
}
