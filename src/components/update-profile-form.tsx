"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";

type UpdateProfileFormProps = {
  initialName: string;
  initialImage: string;
};

export function UpdateProfileForm({
  initialName,
  initialImage,
}: UpdateProfileFormProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "");
    const image = String(formData.get("image") ?? "");

    const { error } = await authClient.updateUser({
      name,
      image,
    });
    setLoading(false);

    if (error) {
      toast.error(error.message ?? "Profile update failed");
      return;
    }

    toast.success("Profile updated");
    router.push("/profile");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="mt-5 space-y-4">
      <label className="form-control">
        <span className="label-text mb-1">Name</span>
        <input
          name="name"
          defaultValue={initialName}
          required
          className="input input-bordered"
        />
      </label>

      <label className="form-control">
        <span className="label-text mb-1">Image URL</span>
        <input
          name="image"
          defaultValue={initialImage}
          className="input input-bordered"
        />
      </label>

      <button type="submit" className="btn btn-primary w-full" disabled={loading}>
        {loading ? "Updating..." : "Update"}
      </button>
    </form>
  );
}
