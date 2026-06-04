import { calculateEndDate, findMembershipPlan } from "@/src/features/admin/data/adminDashboard";

export async function getAdminMemberRequestPayload(request) {
  const contentType = request.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    const body = await request.json();
    return { isJson: true, value: body };
  }

  const formData = await request.formData();
  return {
    isJson: false,
    value: {
      fullName: formData.get("full_name"),
      full_name: formData.get("full_name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      plan: formData.get("membership_type"),
      membership_type: formData.get("membership_type"),
      membershipStartDate: formData.get("membership_start_date"),
      membership_start_date: formData.get("membership_start_date"),
      price: formData.get("price_amount"),
      price_amount: formData.get("price_amount"),
      paymentStatus: formData.get("payment_status"),
      payment_status: formData.get("payment_status"),
      notes: formData.get("notes")
    }
  };
}

export function toAdminMemberPayload(input) {
  const membershipType = String(input.plan ?? input.membership_type ?? "monthly");
  const startDate = String(
    input.membershipStartDate ?? input.membership_start_date ?? new Date().toISOString().slice(0, 10)
  );
  const durationMonths = findMembershipPlan(membershipType).durationMonths;

  return {
    full_name: String(input.fullName ?? input.full_name ?? "").trim(),
    phone: String(input.phone ?? "").trim(),
    email: String(input.email ?? "").trim() || null,
    membership_type: membershipType,
    membership_start_date: startDate,
    membership_duration_months: durationMonths,
    membership_end_date: calculateEndDate(startDate, durationMonths),
    price_amount: Number(input.price ?? input.price_amount ?? 0),
    payment_status: String(input.paymentStatus ?? input.payment_status ?? "paid"),
    status: String(input.status ?? "active"),
    notes: String(input.notes ?? "").trim() || null
  };
}
