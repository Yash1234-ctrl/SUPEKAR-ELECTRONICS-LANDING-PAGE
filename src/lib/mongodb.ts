import mongoose from "mongoose";

// simple mongoose connection helper using global cache to avoid multiple instances
const uri = process.env.MONGODB_URI;

interface Cache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

const globalWithMongoose = global as any;

let cached: Cache = globalWithMongoose._mongoose || { conn: null, promise: null };

async function connect() {
  if (!uri) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts = { bufferCommands: false };
    cached.promise = mongoose.connect(uri, opts).then((m) => m);
    globalWithMongoose._mongoose = cached;
  }

  cached.conn = await cached.promise!;
  return cached.conn;
}

export default connect;
