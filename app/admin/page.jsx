import { AdminPanel } from "@/src/features/admin/AdminPanel";
import { getAdminDashboardData } from "@/src/features/admin/data/adminDashboard";

export const metadata = {
  title: "BestForm Gym Admin Paneli",
  description: "BestForm Gym üye, ödeme ve ciro yönetim paneli"
  
};

export default async function AdminPage() {
  const { members, planOptions } = await getAdminDashboardData();

  return <AdminPanel initialMembers={members} initialPlans={planOptions} />;
}
