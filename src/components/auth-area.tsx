"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";

export function AuthArea() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      toast.error(error.message ?? "Logout failed");
      return;
    }

    toast.success("Logged out");
    router.refresh();
  };

  if (isPending) {
    return <span className="loading loading-spinner loading-sm" />;
  }

  if (!session?.user) {
    return (
      <Link href="/login" className="btn btn-primary btn-sm">
        Login
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <span className="hidden text-sm font-semibold md:inline">
        {session.user.name ?? session.user.email}
      </span>
      <button type="button" onClick={handleLogout} className="btn btn-outline btn-sm">
        Logout
      </button>
    </div>
  );
}
