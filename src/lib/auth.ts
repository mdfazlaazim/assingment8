import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";

import { getMongoClient, getMongoDb } from "@/lib/mongodb";

const db = getMongoDb();
const mongoClient = getMongoClient();
const authBaseURL =
  process.env.BETTER_AUTH_URL?.trim() ||
  process.env.NEXT_PUBLIC_BETTER_AUTH_URL?.trim();

const authSecret = process.env.BETTER_AUTH_SECRET?.trim();
if (!authSecret) {
  console.warn(
    "[better-auth] BETTER_AUTH_SECRET is not set. Set it in .env.local or your deployment environment."
  );
}

export const auth = betterAuth({
  secret: authSecret ?? "replace-with-env-secret",
  baseURL: authBaseURL,
  database: mongodbAdapter(db, {
    client: mongoClient,
    transaction: false,
  }),
  plugins: [nextCookies()],
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    },
  },
});
