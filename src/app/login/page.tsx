"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";

function getReadableError(message?: string) {
  const text = (message ?? "").toLowerCase();
  if (
    text.includes("econnrefused") ||
    text.includes("topology is closed") ||
    text.includes("failed to connect") ||
    text.includes("server selection") ||
    text.includes("mongo")
  ) {
    return "MongoDB connection problem: .env.local e MONGODB_URI set koro ar database run korteso kina check koro.";
  }
  return message ?? "Login failed";
}

export default function LoginPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (session?.user) {
      router.replace("/");
    }
  }, [router, session?.user]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim().toLowerCase();
    const password = String(formData.get("password") ?? "");

    try {
      const { error } = await authClient.signIn.email({ email, password });
      setLoading(false);

      if (error) {
        toast.error(getReadableError(error.message));
        return;
      }

      toast.success("Login successful");
      router.push("/");
      router.refresh();
    } catch {
      setLoading(false);
      toast.error("Server issue. MongoDB connection check kore abar try koro.");
    }
  };

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <section className="mx-auto max-w-md rounded-2xl bg-base-100 p-6 shadow-md">
      <h1 className="text-2xl font-bold">Login</h1>

      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <label className="form-control w-full">
          <span className="label-text mb-1">Email</span>
          <input name="email" type="email" required className="input input-bordered w-full" />
        </label>

        <label className="form-control w-full">
          <span className="label-text mb-1">Password</span>
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              minLength={8}
              required
              className="input input-bordered w-full pr-20"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="btn btn-ghost btn-xs absolute right-2 top-1/2 -translate-y-1/2"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </label>

        <button type="submit" disabled={loading} className="btn btn-primary w-full">
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <button type="button" onClick={handleGoogleLogin} className="btn btn-outline mt-3 w-full">
        Continue with Google
      </button>

      <Link href="/" className="btn btn-ghost mt-2 w-full">
        Go to Home
      </Link>

      <p className="mt-4 text-sm">
        New here?{" "}
        <Link href="/register" className="link link-primary">
          Register
        </Link>
      </p>

      {isPending ? <p className="mt-2 text-xs opacity-70">Checking login status...</p> : null}
    </section>
  );
}
