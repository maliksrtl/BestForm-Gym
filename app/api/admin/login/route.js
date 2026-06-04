import { authenticateAdminRequest } from "@/src/features/admin/auth/authenticateAdminRequest";

export async function POST(request) {
  return authenticateAdminRequest(request);
}
