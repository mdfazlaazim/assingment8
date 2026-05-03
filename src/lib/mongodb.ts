import { MongoClient } from "mongodb";

const envUri = process.env.MONGODB_URI?.trim();
const uri = envUri && envUri.length > 0 ? envUri : "mongodb://127.0.0.1:27017";

if (!envUri) {
  console.warn(
    "[mongodb] MONGODB_URI is not set. Falling back to mongodb://127.0.0.1:27017. " +
      "Please set MONGODB_URI in .env.local if your database is not running on the default local address."
  );
}

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient | null> | null = null;

export function getMongoClient() {
  if (client) {
    return client;
  }

  const options = {
    tls: uri.startsWith("mongodb+srv://"),
    serverApi: { version: "1" as const },
  };

  client = new MongoClient(uri, options);
  clientPromise = client.connect().catch((error) => {
    console.error("[mongodb] Failed to connect to MongoDB:", error.message);
    return null;
  });
  return client;
}

export function getMongoDb() {
  getMongoClient();
  clientPromise?.catch(() => undefined);
  return client!.db(process.env.MONGODB_DB ?? "assignment8");
}
