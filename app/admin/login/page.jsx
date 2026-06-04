import { redirect } from "next/navigation";

export default async function AdminLoginPage({ searchParams }) {
  const params = await searchParams;
  const error = params?.error ? `&error=${encodeURIComponent(params.error)}` : "";

  redirect(`/?adminLogin=1${error}`);
}
