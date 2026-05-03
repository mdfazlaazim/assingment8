import { UpdateProfileForm } from "@/components/update-profile-form";
import { requireSession } from "@/lib/session";

export default async function UpdateProfilePage() {
  const session = await requireSession();

  return (
    <section className="mx-auto max-w-md rounded-2xl bg-base-100 p-6 shadow-md">
      <h1 className="text-2xl font-bold">Update Profile</h1>
      <UpdateProfileForm
        initialName={session.user.name ?? ""}
        initialImage={session.user.image ?? ""}
      />
    </section>
  );
}
