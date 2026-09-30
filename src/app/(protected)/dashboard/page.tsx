import { LogoutButton } from "@/feature/auth/components/logout-button";
import { auth } from "@/feature/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("auth/login");
  }

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-100 space-y-10">
      <h1 className="text-2xl font-bold text-gray-900">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint tenetur
        nostrum facere qui ex dolor officia id earum! Officia quidem error
        soluta ut. Facilis, alias perspiciatis. Culpa incidunt consequatur
        quasi.
      </h1>
      <h1>Olá ! {session.user.email}</h1>

      <h1 className="">
        <LogoutButton />
      </h1>
    </div>
  );
};

export default DashboardPage;
