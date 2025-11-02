// src/lib/mongodb.ts
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/coffeeShop";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

export async function dbConnect() {
  try {
    // اگر connection قبلاً برقرار شده باشه
    if (mongoose.connection.readyState >= 1) {
      console.log("✅ MongoDB: already connected");
      return mongoose.connection;
    }

    // ایجاد connection جدید
    const conn = await mongoose.connect(MONGODB_URI);
    console.log("✅ MongoDB: connected successfully");
    return conn;
  } catch (error) {
    console.error("❌ MongoDB: connection failed", error);
    throw error;
  }
}
