import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";

import { getMongoClient, getMongoDb } from "@/lib/mongodb";

const db = getMongoDb();
const mongoClient = getMongoClient();
const authBaseURL = (() => {
  const explicit =
    process.env.BETTER_AUTH_URL?.trim() ||
    process.env.NEXT_PUBLIC_BETTER_AUTH_URL?.trim();
  if (explicit) return explicit;

  // Vercel provides VERCEL_URL without protocol, e.g. "my-app.vercel.app"
  const vercelUrl = process.env.VERCEL_URL?.trim();
  if (vercelUrl) return `https://${vercelUrl}`;

  return undefined;
})();

const authSecret = process.env.BETTER_AUTH_SECRET?.trim();
if (!authSecret) {
  const msg =
    "[better-auth] BETTER_AUTH_SECRET is not set. Set it in .env.local or your deployment environment.";
  console.warn(msg);
}

if (!authBaseURL) {
  const msg =
    "[better-auth] BETTER_AUTH_URL (or NEXT_PUBLIC_BETTER_AUTH_URL) is not set. " +
    "Set it to your site URL (e.g. https://your-app.vercel.app). " +
    "On Vercel, you can also rely on the automatic VERCEL_URL fallback.";
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
