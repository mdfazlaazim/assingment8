"use client";

import { createAuthClient } from "better-auth/react";

const publicAuthUrl = process.env.NEXT_PUBLIC_BETTER_AUTH_URL?.trim();

export const authClient = createAuthClient({
  baseURL: publicAuthUrl || undefined,
  basePath: "/api/auth",
});
