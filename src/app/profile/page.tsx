import Link from "next/link";

import { requireSession } from "@/lib/session";

export default async function ProfilePage() {
  const session = await requireSession();

  return (
    <section className="mx-auto max-w-2xl rounded-2xl bg-base-100 p-6 shadow-md">
      <h1 className="text-2xl font-bold">My Profile</h1>

      <div className="mt-5 space-y-2 text-sm md:text-base">
        <p>
          <span className="font-semibold">Name:</span> {session.user.name ?? "N/A"}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {session.user.email}
        </p>
        <p>
          <span className="font-semibold">User ID:</span> {session.user.id}
        </p>
        <p>
          <span className="font-semibold">Image:</span>{" "}
          {session.user.image ?? "No profile image set"}
        </p>
      </div>

      <Link href="/profile/update" className="btn btn-primary mt-6">
        Update Profile
      </Link>
    </section>
  );
}
