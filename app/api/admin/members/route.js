import { NextResponse } from "next/server";

import { calculateEndDate } from "@/src/features/admin/data/adminDashboard";
import { createClient } from "@/src/utils/supabase/server";

export async function POST(request) {
  const formData = await request.formData();
  const membershipType = String(formData.get("membership_type") || "monthly");
  const startDate = String(formData.get("membership_start_date") || new Date().toISOString().slice(0, 10));
  const durationMonths = membershipType === "yearly" ? 12 : 1;
  const priceAmount = Number(formData.get("price_amount") || 0);

  const payload = {
    full_name: String(formData.get("full_name") || "").trim(),
    phone: String(formData.get("phone") || "").trim(),
    email: String(formData.get("email") || "").trim() || null,
    membership_type: membershipType,
    membership_start_date: startDate,
    membership_duration_months: durationMonths,
    membership_end_date: calculateEndDate(startDate, durationMonths),
    price_amount: priceAmount,
    payment_status: String(formData.get("payment_status") || "paid"),
    status: "active",
    notes: String(formData.get("notes") || "").trim() || null
  };

  if (!payload.full_name || !payload.phone || !payload.price_amount) {
    return NextResponse.redirect(new URL("/admin?error=member-missing#members", request.url));
  }

  const supabase = await createClient();
  const { error } = await supabase.from("members").insert(payload);

  if (error) {
    return NextResponse.redirect(new URL(`/admin?error=${encodeURIComponent(error.message)}#members`, request.url));
  }

  return NextResponse.redirect(new URL("/admin?success=member-created#members", request.url));
}
