"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";

function getReadableError(message?: string) {
  const text = (message ?? "").toLowerCase();
  if (text.includes("password is too short")) {
    return "Password minimum 8 characters dite hobe.";
  }
  if (
    text.includes("econnrefused") ||
    text.includes("topology is closed") ||
    text.includes("failed to connect") ||
    text.includes("server selection") ||
    text.includes("mongo")
  ) {
    return "MongoDB connection problem: Vercel e MONGODB_URI (Atlas) set koro + Atlas Network Access allow koro (0.0.0.0/0 for testing).";
  }
  return message ?? "Registration failed";
}

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim().toLowerCase();
    const password = String(formData.get("password") ?? "");

    try {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
        callbackURL: "/login",
      });
      setLoading(false);

      if (error) {
        toast.error(getReadableError(error.message));
        return;
      }

      toast.success("Account created, please login.");
      router.push("/login");
      router.refresh();
    } catch (err) {
      setLoading(false);
      const message = err instanceof Error ? err.message : String(err);
      toast.error(getReadableError(message));
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
      <h1 className="text-2xl font-bold">Register</h1>

      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <label className="form-control w-full">
          <span className="label-text mb-1">Name</span>
          <input name="name" required className="input input-bordered w-full" />
        </label>

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
        <p className="-mt-2 text-xs opacity-70">Password must be at least 8 characters.</p>

        <button type="submit" disabled={loading} className="btn btn-primary w-full">
          {loading ? "Creating account..." : "Register"}
        </button>
      </form>

      <button type="button" onClick={handleGoogleLogin} className="btn btn-outline mt-3 w-full">
        Continue with Google
      </button>

      <p className="mt-4 text-sm">
        Already have an account?{" "}
        <Link href="/login" className="link link-primary">
          Login
        </Link>
      </p>
    </section>
  );
}
