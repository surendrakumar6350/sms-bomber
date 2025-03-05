import mongoose from "mongoose";

const MONGODB_URI = process.env.DB;

if (!MONGODB_URI) {
  throw new Error("DB environment variable is not set");
}

/**
 * Connect to the MongoDB database on every request
 */
export const connectDb = async (): Promise<void> => {
  try {
    console.log("Creating a new database connection");
    await mongoose.connect(MONGODB_URI, { dbName: "SMS_BOMBER" });
    console.log("Connected to the database");
  } catch (error) {
    console.error("Database connection failed:", error);
    throw error;
  }
};