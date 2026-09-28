import { auth } from "@/feature/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
    </div>
  );
};

export default DashboardPage;
