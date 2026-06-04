import { createClient } from "@/src/utils/supabase/server";

export const defaultPricing = {
  monthly_price: 2500,
  yearly_price: 24000
};

export function formatCurrency(value) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0
  }).format(Number(value || 0));
}

export function formatDate(value) {
  if (!value) {
    return "-";
  }

  return new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(new Date(value));
}

export function getTodayInputValue() {
  return new Date().toISOString().slice(0, 10);
}

export function calculateEndDate(startDate, durationMonths) {
  const endDate = new Date(startDate);
  endDate.setMonth(endDate.getMonth() + Number(durationMonths));
  return endDate.toISOString().slice(0, 10);
}

export function getEffectiveStatus(member, now = new Date()) {
  if (member.status === "cancelled") {
    return "cancelled";
  }

  return new Date(member.membership_end_date).getTime() < now.getTime() ? "expired" : "active";
}

export function getExpiredDays(member, now = new Date()) {
  const diff = now.getTime() - new Date(member.membership_end_date).getTime();
  return Math.max(0, Math.floor(diff / 86400000));
}

export async function getAdminDashboardData() {
  const supabase = await createClient();
  const [{ data: members, error: membersError }, { data: pricing, error: pricingError }] = await Promise.all([
    supabase.from("members").select("*").order("created_at", { ascending: false }),
    supabase.from("pricing_settings").select("*").eq("id", "default").maybeSingle()
  ]);

  const safeMembers = members || [];
  const safePricing = pricing || defaultPricing;
  const activeMembers = safeMembers.filter((member) => getEffectiveStatus(member) === "active");
  const expiredMembers = safeMembers.filter((member) => getEffectiveStatus(member) === "expired");
  const paidMembers = safeMembers.filter((member) => member.payment_status === "paid");
  const unpaidMembers = safeMembers.filter((member) => member.payment_status === "unpaid");
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const totalRevenue = paidMembers.reduce((total, member) => total + Number(member.price_amount || 0), 0);
  const monthRevenue = paidMembers
    .filter((member) => {
      const createdAt = new Date(member.created_at);
      return createdAt.getMonth() === currentMonth && createdAt.getFullYear() === currentYear;
    })
    .reduce((total, member) => total + Number(member.price_amount || 0), 0);
  const yearRevenue = paidMembers
    .filter((member) => new Date(member.created_at).getFullYear() === currentYear)
    .reduce((total, member) => total + Number(member.price_amount || 0), 0);

  return {
    activeMembers,
    expiredMembers,
    members: safeMembers,
    monthRevenue,
    pricing: safePricing,
    schemaError: membersError?.message || pricingError?.message || "",
    totalRevenue,
    unpaidMembers,
    yearRevenue
  };
}
