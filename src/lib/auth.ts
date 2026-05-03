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
const isProduction =
  process.env.NODE_ENV === "production" || process.env.VERCEL === "1";

if (!authSecret) {
  const msg =
    "[better-auth] BETTER_AUTH_SECRET is not set. Set it in .env.local or your deployment environment.";
  if (isProduction) {
    throw new Error(msg);
  }
  console.warn(msg);
}

if (!authBaseURL) {
  const msg =
    "[better-auth] BETTER_AUTH_URL (or NEXT_PUBLIC_BETTER_AUTH_URL) is not set. Set it to your site URL (e.g. https://your-app.vercel.app).";
  if (isProduction) {
    throw new Error(msg);
  }
  console.warn(msg);
}

const googleClientId = process.env.GOOGLE_CLIENT_ID?.trim();
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET?.trim();
const socialProviders = googleClientId && googleClientSecret
  ? {
      google: {
        clientId: googleClientId,
        clientSecret: googleClientSecret,
      },
    }
  : {};

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
  socialProviders,
});
