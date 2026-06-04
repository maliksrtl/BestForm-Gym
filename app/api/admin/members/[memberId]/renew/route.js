import { NextResponse } from "next/server";

import { calculateEndDate } from "@/src/features/admin/data/adminDashboard";
import { createClient } from "@/src/utils/supabase/server";

export async function POST(request, { params }) {
  const { memberId } = await params;
  const formData = await request.formData();
  const membershipType = String(formData.get("membership_type") || "monthly");
  const startDate = new Date().toISOString().slice(0, 10);
  const durationMonths = membershipType === "yearly" ? 12 : 1;
  const priceAmount = Number(formData.get("price_amount") || 0);

  const supabase = await createClient();
  const { error } = await supabase
    .from("members")
    .update({
      membership_type: membershipType,
      membership_start_date: startDate,
      membership_duration_months: durationMonths,
      membership_end_date: calculateEndDate(startDate, durationMonths),
      price_amount: priceAmount,
      payment_status: "paid",
      status: "active"
    })
    .eq("id", memberId);

  if (error) {
    return NextResponse.redirect(new URL(`/admin?error=${encodeURIComponent(error.message)}#expired`, request.url));
  }

  return NextResponse.redirect(new URL("/admin?success=member-renewed#expired", request.url));
}
