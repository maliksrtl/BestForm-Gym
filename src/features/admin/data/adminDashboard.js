import { createClient } from "@/src/utils/supabase/server";

export const membershipPlans = Object.freeze([
  { value: "monthly", label: "1 Ayl\u0131k", durationMonths: 1, priceField: "monthly_price", defaultPrice: 2500 },
  { value: "quarterly", label: "3 Ayl\u0131k", durationMonths: 3, priceField: "quarterly_price", defaultPrice: 7000 },
  { value: "semiannual", label: "6 Ayl\u0131k", durationMonths: 6, priceField: "semiannual_price", defaultPrice: 13500 },
  { value: "yearly", label: "1 Y\u0131ll\u0131k", durationMonths: 12, priceField: "yearly_price", defaultPrice: 24000 }
]);

export const defaultPricing = membershipPlans.reduce(
  (pricing, plan) => ({
    ...pricing,
    [plan.priceField]: plan.defaultPrice
  }),
  {}
);

export function findMembershipPlan(planValue) {
  return membershipPlans.find((plan) => plan.value === planValue) ?? membershipPlans[0];
}

export function getPlanOptions(pricing = defaultPricing) {
  return membershipPlans.map((plan) => ({
    value: plan.value,
    label: plan.label,
    durationMonths: plan.durationMonths,
    priceField: plan.priceField,
    price: Number(pricing?.[plan.priceField] ?? plan.defaultPrice)
  }));
}

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
    planOptions: getPlanOptions(safePricing),
    members: safeMembers,
    monthRevenue,
    pricing: safePricing,
    schemaError: membersError?.message || pricingError?.message || "",
    totalRevenue,
    unpaidMembers,
    yearRevenue
  };
}
