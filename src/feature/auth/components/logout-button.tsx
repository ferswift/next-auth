"use client";

import { authClient } from "@/feature/lib/auth-client";
import { useRouter } from "next/navigation";

export const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("auth/login");
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="rounded-lg bg-purple-600 px-4 py-2 font-medium text-white transition hover:bg-purple-700 focus:bg-purple-300"
    >
      Sair da plataforma
    </button>
  );
};
