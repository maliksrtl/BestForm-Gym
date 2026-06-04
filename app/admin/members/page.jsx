import { AdminPanel } from "@/src/features/admin/AdminPanel";
import { getAdminDashboardData } from "@/src/features/admin/data/adminDashboard";

export const metadata = {
  title: "Üye Yönetimi | BestForm Gym",
  description: "BestForm Gym üye yönetimi ve ödeme takibi"
};

export default async function AdminMembersPage() {
  const { members, planOptions } = await getAdminDashboardData();

  return <AdminPanel initialView="members" initialMembers={members} initialPlans={planOptions} />;
}
