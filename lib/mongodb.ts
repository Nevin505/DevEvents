// lib/mongodb.ts

import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI: string = process.env.MONGODB_URI || "";

// Ensure the MongoDB URI exists
if (!MONGODB_URI) {
  throw new Error("❌ MONGODB_URI is not defined in environment variables.");
}

interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}


declare global {
  // eslint-disable-next-line no-var
  var _mongoose: MongooseCache | undefined;
}

// Initialize the global cache if it doesn't exist
const globalCache: MongooseCache = global._mongoose || {
  conn: null,
  promise: null,
};

global._mongoose = globalCache;

/**
 * Connect to MongoDB using Mongoose.
 * This function ensures a single DB connection instance during development.
 */
export async function connectDB(): Promise<Mongoose> {
  // Return existing cached connection
  if (globalCache.conn) {
    return globalCache.conn;
  }

  // Create a new connection promise if not available
  if (!globalCache.promise) {
    globalCache.promise = mongoose.connect(MONGODB_URI, {
      dbName: "your_database_name", // Change this to your DB name
    });
  }

  // Wait for the promise to resolve and store the connection
  globalCache.conn = await globalCache.promise;
  return globalCache.conn;
}
