import { toNextJsHandler } from "better-auth/next-js";

import { checkMongoConnection } from "@/lib/mongodb";

function getMissingAuthEnv() {
  const mongoUri = process.env.MONGODB_URI?.trim();
  const authSecret = process.env.BETTER_AUTH_SECRET?.trim();
  const authBaseURL =
    process.env.BETTER_AUTH_URL?.trim() || process.env.NEXT_PUBLIC_BETTER_AUTH_URL?.trim();

  const missing: string[] = [];
  if (!mongoUri) missing.push("MONGODB_URI");
  if (!authSecret) missing.push("BETTER_AUTH_SECRET");
  if (!authBaseURL) missing.push("BETTER_AUTH_URL (or NEXT_PUBLIC_BETTER_AUTH_URL)");
  return missing;
}

async function handler(request: Request) {
  const missing = getMissingAuthEnv();
  if (missing.length > 0) {
    return new Response(
      JSON.stringify({
        error: "Auth is not configured on the server.",
        missing,
        hint: "Set these Environment Variables in Vercel/Netlify and redeploy.",
      }),
      {
        status: 500,
        headers: {
          "content-type": "application/json; charset=utf-8",
          "cache-control": "no-store",
        },
      },
    );
  }

  const mongo = await checkMongoConnection();
  if (!mongo.ok) {
    return new Response(
      JSON.stringify({
        error: "MongoDB is not reachable from the server.",
        hint: "Ensure MONGODB_URI points to MongoDB Atlas/hosted DB and Atlas Network Access allows your deployment (e.g. 0.0.0.0/0 for testing). Then redeploy.",
      }),
      {
        status: 500,
        headers: {
          "content-type": "application/json; charset=utf-8",
          "cache-control": "no-store",
        },
      },
    );
  }

  const { auth } = await import("@/lib/auth");
  const handlers = toNextJsHandler(auth);
  const method = request.method.toUpperCase();
  const fn =
    method === "GET"
      ? handlers.GET
      : method === "POST"
        ? handlers.POST
        : method === "PATCH"
          ? handlers.PATCH
          : method === "PUT"
            ? handlers.PUT
            : method === "DELETE"
              ? handlers.DELETE
              : null;

  if (!fn) {
    return new Response("Method Not Allowed", { status: 405 });
  }

  return fn(request);
}

export const GET = handler;
export const POST = handler;
export const PATCH = handler;
export const PUT = handler;
export const DELETE = handler;
