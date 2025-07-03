import mongoose from "mongoose";

const MONGODB_URI = process.env.DB;

// Global cache for dev environments
let cached = (globalThis as any).mongoose;

if (!cached) {
  cached = (globalThis as any).mongoose = {
    conn: null as typeof mongoose | null,
    promise: null as Promise<typeof mongoose> | null,
  };
}

export async function connectDb(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!MONGODB_URI) {
    throw new Error("Please define the DB environment variable in .env");
  }

  if (!cached.promise) {
    console.log("🌐 Creating a new MongoDB connection...");
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "SMS_BOMBER",
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log("✅ MongoDB connected.");
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    throw error;
  }
}
